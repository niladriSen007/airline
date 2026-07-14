package com.niladri.location_service.services.impl;

import com.niladri.dto.request.CityRequest;
import com.niladri.dto.request.UpdateCityRequest;
import com.niladri.dto.response.CityResponse;
import com.niladri.dto.response.CitySearchResponse;
import com.niladri.location_service.entity.City;
import com.niladri.location_service.exceptions.CityAlreadyExistsException;
import com.niladri.location_service.exceptions.CityNotFoundException;
import com.niladri.location_service.exceptions.CityWithCityCodeAlreadyExistsException;
import com.niladri.location_service.mapper.CityMapper;
import com.niladri.location_service.repository.CityRepository;
import com.niladri.location_service.services.ICityService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CityService implements ICityService {

    CityRepository cityRepository;

    @Override
    public CityResponse createCity(CityRequest request) {
        validateCityRequest(request);

        if (validateCityCode(request.getCityCode())) {
            throw new CityAlreadyExistsException("City with code " + request.getCityCode() + " already exists");
        }

        City city = CityMapper.toCity(request);
        City savedCity = cityRepository.save(city);

        log.info("City created: {} ({})", savedCity.getName(), savedCity.getCityCode());
        return CityMapper.toCityResponse(savedCity);
    }

    @Override
    public List<CityResponse> createBulkCities(List<CityRequest> requests) {
        List<String> skippedCodes = new ArrayList<>();

        List<City> cities = new ArrayList<>();

        for (CityRequest request : requests) {
            try {
                validateCityRequest(request);
            } catch (IllegalArgumentException e) {
                skippedCodes.add(request.getCityCode() + " (invalid: " + e.getMessage() + ")");
                continue;
            }

            if (validateCityCode(request.getCityCode())) {
                skippedCodes.add(request.getCityCode() + " (already exists)");
                continue;
            }

            City city = CityMapper.toCity(request);
            cities.add(city);
        }

        List<City> allCreatedCities = cityRepository.saveAll(cities);
        if (!skippedCodes.isEmpty()) {
            log.info("Bulk city creation - skipped: {}", skippedCodes);
        }
        log.info("Bulk city creation - created {} out of {} cities", allCreatedCities.size(), requests.size());

        return allCreatedCities.stream()
                .map(CityMapper::toCityResponse)
                .toList();
    }

    @Override
    public CityResponse getCityById(Long cityId) {
        City city = cityRepository.findById(cityId)
                .orElseThrow(() -> new CityNotFoundException("City not found with id: " + cityId));
        return CityMapper.toCityResponse(city);
    }

    @Override
    public CityResponse updateCity(Long cityId, UpdateCityRequest request) {
        City city = cityRepository.findById(cityId)
                .orElseThrow(() -> new CityNotFoundException("City not found with id: " + cityId));

        if (cityExistsByCityCode(request.getCityCode())) {
            throw new CityWithCityCodeAlreadyExistsException("City with code " + request.getCityCode() + " already exists");
        }

        City updatedCity = cityRepository.save(CityMapper.updateEntity(city, request));

        log.info("City updated: {} ({})", updatedCity.getName(), updatedCity.getCityCode());
        return CityMapper.toCityResponse(updatedCity);
    }

    @Override
    public void deleteCity(Long cityId) {
        if (!cityExistsById(cityId)) {
            throw new CityNotFoundException("City not found with id: " + cityId);
        }

        cityRepository.deleteById(cityId);
        log.info("City deleted with id: {}", cityId);
    }

    @Override
    public Page<CityResponse> getAllCities(Pageable pageable) {
        return cityRepository.findAll(pageable).map(CityMapper::toCityResponse);
    }

    @Override
    public Page<CitySearchResponse> searchCities(String keyword, Pageable pageable) {
        return cityRepository.findCountryByKeyword(keyword, pageable).map(CityMapper::toCitySearchResponse);
    }

    @Override
    public Page<CitySearchResponse> getCitiesByCountryCode(String countryCode, Pageable pageable) {
        return cityRepository.findByCountryCode(countryCode, pageable).map(CityMapper::toCitySearchResponse);
    }

    @Override
    public boolean cityExistsByCityCode(String cityCode) {
        return cityRepository.existsByCityCode(cityCode);
    }

    @Override
    public boolean validateCityCode(String cityCode) {
        return cityCode != null && cityCode.length() <= 10 && cityCode.matches("[A-Z0-9]{2,10}");
    }

    @Override
    public Optional<City> findByCityCode(String cityCode) {
        return cityRepository.findByCityCode(cityCode);
    }

    private boolean cityExistsById(Long cityId) {
        return cityRepository.existsById(cityId);
    }

    private void validateCityRequest(CityRequest request) {
        if (!validateCityCode(request.getCityCode())) {
            throw new IllegalArgumentException("Invalid city code format. Must be 2-10 alphanumeric characters.");
        }

        if (request.getCountryCode() == null || !request.getCountryCode().matches("[A-Z]{2,5}")) {
            throw new IllegalArgumentException("Country code must be 2-5 uppercase letters");
        }

        if (request.getTimeZoneOffset() != null && !request.getTimeZoneOffset().matches("[+-]\\d{2}:\\d{2}")) {
            throw new IllegalArgumentException("Time zone offset must be in format ±HH:MM");
        }
    }
}

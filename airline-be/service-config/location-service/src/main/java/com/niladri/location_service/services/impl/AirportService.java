package com.niladri.location_service.services.impl;

import com.niladri.dto.request.AirportRequest;
import com.niladri.dto.request.UpdateAirportRequest;
import com.niladri.dto.response.AirportResponse;
import com.niladri.location_service.entity.Airport;
import com.niladri.location_service.entity.City;
import com.niladri.location_service.exceptions.AirportAlreadyExistsException;
import com.niladri.location_service.exceptions.AirportNotFoundException;
import com.niladri.location_service.exceptions.CityNotFoundException;
import com.niladri.location_service.mapper.AirportMapper;
import com.niladri.location_service.repository.AirportRepository;
import com.niladri.location_service.services.IAirportService;
import com.niladri.location_service.services.ICityService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class AirportService implements IAirportService {

    AirportRepository airportRepository;
    ICityService cityService;

    @Override
    public AirportResponse createAirport(AirportRequest request) {
        boolean airportExists = isAirportExistsByIataCode(request.getIataCode());
        if (airportExists) {
            throw new AirportAlreadyExistsException("Airport with IATA code " + request.getIataCode() + " already exists");
        }
        Optional<City> cityExistsByCityId = cityService.findByCityId(request.getCityId());

        if (cityExistsByCityId.isEmpty()) {
            throw new CityNotFoundException("City with id " + request.getCityId() + " not found");
        }

        Airport airport = AirportMapper.toAirport(request, cityExistsByCityId.get());
        Airport savedAirport = airportRepository.save(airport);

        log.info("Airport created: {} ({})", savedAirport.getName(), savedAirport.getIataCode());

        return AirportMapper.toAirportResponse(savedAirport);
    }

    @Override
    public List<AirportResponse> createBulkAirports(List<AirportRequest> requests) {
        List<Airport> createdAirports = new ArrayList<>();
        List<String> skippedCodes = new ArrayList<>();

        for (AirportRequest request : requests) {
            if (airportRepository.findByName(request.getName()).isPresent()) {
                skippedCodes.add(request.getName() + " (already exists)");
                continue;
            }

            Optional<City> cityOpt = cityService.findByCityId(request.getCityId());
            if (cityOpt.isEmpty()) {
                skippedCodes.add(request.getName() + " (city not found with id: " + request.getCityId() + ")");
                continue;
            }

            Airport airport = AirportMapper.toAirport(request, cityOpt.get());

            createdAirports.add(airport);
        }
        List<Airport> savedAirports = airportRepository.saveAll(createdAirports);

        if (!skippedCodes.isEmpty()) {
            log.info("Bulk airport creation - skipped: {}", skippedCodes);
        }
        log.info("Bulk airport creation - created {} out of {} airports", createdAirports.size(), requests.size());

        return savedAirports.stream()
                .map(AirportMapper::toAirportResponse)
                .toList();
    }

    @Override
    public AirportResponse getAirportById(Long id) {
        return airportRepository.findById(id)
                .map(AirportMapper::toAirportResponse)
                .orElseThrow(() -> new AirportNotFoundException("Airport with id " + id + " not found"));
    }

    @Override
    public List<AirportResponse> getAllAirports() {
        return airportRepository.findAll().stream()
                .map(AirportMapper::toAirportResponse)
                .toList();
    }

    @Override
    public AirportResponse updateAirport(Long id, UpdateAirportRequest request) {
        Optional<Airport> airportOpt = airportRepository.findById(id);
        if (airportOpt.isEmpty()) {
            throw new AirportNotFoundException("Airport with id " + id + " not found");
        }

        if (isAirportExistsByIataCode(request.getIataCode())) {
            throw new AirportAlreadyExistsException("Airport with IATA code " + request.getIataCode() + " already exists");
        }

        Airport updatedAirport = airportRepository.save(AirportMapper.updateAirport(airportOpt.get(), request));
        return AirportMapper.toAirportResponse(updatedAirport);
    }

    @Override
    public void deleteAirport(Long id) {
        if (!airportRepository.existsById(id)) {
            throw new AirportNotFoundException("Airport with id " + id + " not found");
        }
        airportRepository.deleteById(id);
    }

    @Override
    public List<AirportResponse> getAirportsByCityId(Long cityId) {
        return airportRepository.findByCityId(cityId).stream()
                .map(AirportMapper::toAirportResponse)
                .toList();
    }

    private boolean isAirportExistsByIataCode(String iataCode) {
        return airportRepository.existsByIataCode(iataCode);
    }
}

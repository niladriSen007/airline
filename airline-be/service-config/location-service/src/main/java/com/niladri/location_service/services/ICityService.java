package com.niladri.location_service.services;

import com.niladri.dto.request.CityRequest;
import com.niladri.dto.request.UpdateCityRequest;
import com.niladri.dto.response.CityResponse;
import com.niladri.dto.response.CitySearchResponse;
import com.niladri.location_service.entity.City;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface ICityService {
    CityResponse createCity(CityRequest request);
    List<CityResponse> createBulkCities(List<CityRequest> requests);
    CityResponse getCityById(Long cityId);

    CityResponse updateCity(Long cityId, UpdateCityRequest request);
    void deleteCity(Long cityId);
    Page<CityResponse> getAllCities(Pageable pageable);

    // ---------- Search & Query ----------
    Page<CitySearchResponse> searchCities(String keyword, Pageable pageable);
    Page<CitySearchResponse> getCitiesByCountryCode(String countryCode, Pageable pageable);

    // ---------- Validation ----------
    boolean cityExistsByCityCode(String cityCode);
    boolean validateCityCode(String cityCode);

    Optional<City> findByCityCode(@NotBlank(message = "City code is mandatory") String cityCode);
}

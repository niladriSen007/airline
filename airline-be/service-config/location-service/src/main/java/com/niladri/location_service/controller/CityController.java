package com.niladri.location_service.controller;

import com.niladri.dto.request.CityRequest;
import com.niladri.dto.request.UpdateCityRequest;
import com.niladri.dto.response.CityResponse;
import com.niladri.dto.response.CitySearchResponse;
import com.niladri.location_service.services.ICityService;
import com.niladri.payload.ApiResponse;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/cities")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class CityController {

    ICityService cityService;

    // ---------- CREATE ----------

    @PostMapping
    public ResponseEntity<ApiResponse<CityResponse>> createCity(
            @Valid @RequestBody CityRequest request) {
        CityResponse response = cityService.createCity(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(response, HttpStatus.CREATED.value()));
    }

    @PostMapping("/bulk")
    public ResponseEntity<ApiResponse<List<CityResponse>>> createBulkCities(
            @Valid @RequestBody List<CityRequest> requests) {
        List<CityResponse> responses = cityService.createBulkCities(requests);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(responses, HttpStatus.CREATED.value()));
    }

    // ---------- READ ----------

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CityResponse>> getCityById(@PathVariable(name = "id") Long id) {
        CityResponse response = cityService.getCityById(id);
        return ResponseEntity.ok(ApiResponse.success(response, HttpStatus.OK.value()));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<CityResponse>>> getAllCities(
            @RequestParam(defaultValue = "0", name = "page") int page,
            @RequestParam(defaultValue = "20", name = "size") int size,
            @RequestParam(defaultValue = "name", name = "sortBy") String sortBy,
            @RequestParam(defaultValue = "asc", name = "sortDirection") String sortDirection) {

        Sort sort = Sort.by(Sort.Direction.fromString(sortDirection), sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);
        return ResponseEntity.ok(ApiResponse.success(cityService.getAllCities(pageable), HttpStatus.OK.value()));
    }

    // ---------- UPDATE ----------

    @PatchMapping("/{id}")
    public ResponseEntity<ApiResponse<CityResponse>> updateCity(
            @PathVariable(name="id") Long id,
            @Valid @RequestBody UpdateCityRequest request) {
        CityResponse response = cityService.updateCity(id, request);
        return ResponseEntity.ok(ApiResponse.success(response, HttpStatus.OK.value()));
    }

    // ---------- DELETE ----------

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCity(@PathVariable(name = "id") Long id) {
        cityService.deleteCity(id);
        return ResponseEntity.ok(ApiResponse.success(null, HttpStatus.OK.value()));
    }

    // ---------- SEARCH & QUERY ----------

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<Page<CitySearchResponse>>> searchCities(
            @RequestParam(name = "keyword") String keyword,
            @RequestParam(defaultValue = "0",name = "page") int page,
            @RequestParam(defaultValue = "20",name = "size") int size) {

        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(ApiResponse.success(cityService.searchCities(keyword, pageable), HttpStatus.OK.value()));
    }

    @GetMapping("/country/{countryCode}")
    public ResponseEntity<ApiResponse<Page<CitySearchResponse>>> getCitiesByCountryCode(
            @PathVariable(name="countryCode") String countryCode,
            @RequestParam(defaultValue = "0",name = "page") int page,
            @RequestParam(defaultValue = "20",name = "size") int size) {

        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(ApiResponse.success(cityService.getCitiesByCountryCode(countryCode.toUpperCase(), pageable), HttpStatus.OK.value()));
    }

    // ---------- VALIDATION ----------

    @GetMapping("/exists/{cityCode}")
    public ResponseEntity<ApiResponse<Boolean>> checkCityExists(@PathVariable(name = "cityCode") String cityCode) {
        return ResponseEntity.ok(ApiResponse.success(cityService.cityExistsByCityCode(cityCode.toUpperCase()), HttpStatus.OK.value()));
    }
}

package com.niladri.location_service.controller;

import com.niladri.dto.request.AirportRequest;
import com.niladri.dto.request.UpdateAirportRequest;
import com.niladri.dto.response.AirportResponse;
import com.niladri.location_service.services.IAirportService;
import com.niladri.payload.ApiResponse;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/airports")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class AirportController {

    IAirportService airportService;

    @PostMapping
    public ResponseEntity<ApiResponse<AirportResponse>> createAirport(@Valid @RequestBody AirportRequest request) {
        return ResponseEntity.ok(
                ApiResponse.success(
                        airportService.createAirport(request),
                        HttpStatus.CREATED.value()
                )
        );
    }

    @PostMapping("/bulk")
    public ResponseEntity<ApiResponse<List<AirportResponse>>> createBulkAirports(
            @Valid @RequestBody List<AirportRequest> requests) {
        return ResponseEntity.ok(
                ApiResponse.success(
                        airportService.createBulkAirports(requests),
                        HttpStatus.CREATED.value()
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<AirportResponse>> getAirportById(@PathVariable(name="id") Long id) {
        return ResponseEntity.ok(
                ApiResponse.success(
                        airportService.getAirportById(id),
                        HttpStatus.OK.value()
                )
        );
    }


    @GetMapping
    public ResponseEntity<ApiResponse<List<AirportResponse>>> getAllAirports() {
        return ResponseEntity.ok(
                ApiResponse.success(
                        airportService.getAllAirports(),
                        HttpStatus.OK.value()
                )
        );
    }

    @GetMapping("/city/{cityId}")
    public ResponseEntity<ApiResponse<List<AirportResponse>>> getAirportsByCityId(@PathVariable(name="cityId") Long cityId) {
        return ResponseEntity.ok(
                ApiResponse.success(
                        airportService.getAirportsByCityId(cityId),
                        HttpStatus.OK.value()
                )
        );
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ApiResponse<AirportResponse>> updateAirport(
            @PathVariable(name="id") Long id,
            @Valid @RequestBody UpdateAirportRequest request) {
        return ResponseEntity.ok(
                ApiResponse.success(
                        airportService.updateAirport(id, request),
                        HttpStatus.OK.value()
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteAirport(@PathVariable(name="id") Long id) {
        airportService.deleteAirport(id);
        return ResponseEntity.ok(
                ApiResponse.success(
                        "Airport deleted successfully",
                        HttpStatus.OK.value()
                )
        );
    }
}

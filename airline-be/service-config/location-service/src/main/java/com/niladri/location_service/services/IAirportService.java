package com.niladri.location_service.services;

import com.niladri.dto.request.AirportRequest;
import com.niladri.dto.request.UpdateAirportRequest;
import com.niladri.dto.response.AirportResponse;

import java.util.List;

public interface IAirportService {
    AirportResponse createAirport(AirportRequest request);
    List<AirportResponse> createBulkAirports(List<AirportRequest> requests);
    AirportResponse getAirportById(Long id);

    List<AirportResponse> getAllAirports();
    AirportResponse updateAirport(Long id, UpdateAirportRequest request);
    void deleteAirport(Long id);
    List<AirportResponse> getAirportsByCityId(Long cityId);
}

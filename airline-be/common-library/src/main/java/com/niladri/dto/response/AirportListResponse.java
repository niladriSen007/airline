package com.niladri.dto.response;

public record AirportListResponse(
        Long id,
        String iataCode,
        String name,
        String timeZone,
        String cityCode,
        String cityName
) {
}

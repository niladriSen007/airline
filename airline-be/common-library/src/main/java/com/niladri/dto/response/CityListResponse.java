package com.niladri.dto.response;

public record CityListResponse(
        Long id,
        String name,
        String cityCode,
        String countryCode,
        String countryName,
        String timeZoneOffset
) {
}

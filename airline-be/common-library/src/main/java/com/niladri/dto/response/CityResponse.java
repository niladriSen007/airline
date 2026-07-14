package com.niladri.dto.response;

public record CityResponse(
        Long id,
        String name,
        String cityCode,
        String countryCode,
        String countryName,
        String regionCode,
        String timeZoneOffset
) {
}

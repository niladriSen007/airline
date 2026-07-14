package com.niladri.dto.response;

import com.niladri.embeddable.Address;
import com.niladri.embeddable.Geocode;

import java.time.ZoneId;

public record AirportResponse(
        Long id,
        String iataCode,
        String name,
        ZoneId timeZone,
        Address address,
        CityResponse city,
        Geocode geoCode
//        private Analytics analytics
) {
}

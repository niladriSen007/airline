package com.niladri.location_service.mapper;

import com.niladri.dto.request.AirportRequest;
import com.niladri.dto.request.UpdateAirportRequest;
import com.niladri.dto.request.UpdateCityRequest;
import com.niladri.dto.response.AirportResponse;
import com.niladri.location_service.entity.Airport;
import com.niladri.location_service.entity.City;

import java.time.ZoneId;

public class AirportMapper {
    public static Airport toAirport(AirportRequest airport, City cityExistsByCityCode) {
        return Airport.builder()
                .name(airport.getName())
                .iataCode(airport.getIataCode())
                .address(airport.getAddress())
                .timeZoneId(airport.getTimeZone() != null ? airport.getTimeZone().getId() : null)
                .city(cityExistsByCityCode)
                .geoCode(airport.getGeoCode())
                .build();
    }

    public static AirportResponse toAirportResponse(Airport airport) {
        return new AirportResponse(
                airport.getId(),
                airport.getIataCode(),
                airport.getName(),
                ZoneId.of(airport.getTimeZoneId()),
                airport.getAddress(),
                CityMapper.toCityResponse(airport.getCity()),
                airport.getGeoCode()
        );
    }

    public static Airport updateAirport(Airport airport, UpdateAirportRequest request) {
        if(request.getName() != null) {
            airport.setName(request.getName().trim());
        }
        if(request.getTimeZone() != null) {
            airport.setTimeZoneId(request.getTimeZone().getId());
        }
        if(request.getAddress() != null) {
            airport.setAddress(request.getAddress());
        }
        if(request.getCityCode() != null) {
            City city = airport.getCity();
            if(city != null) {
                city.setCityCode(request.getCityCode().toUpperCase().trim());
            }
        }
        if(request.getGeoCode() != null) {
            airport.setGeoCode(request.getGeoCode());
        }
        return airport;
    }
}

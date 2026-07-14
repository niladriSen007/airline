package com.niladri.location_service.mapper;

import com.niladri.dto.request.CityRequest;
import com.niladri.dto.request.UpdateCityRequest;
import com.niladri.dto.response.CityResponse;
import com.niladri.dto.response.CitySearchResponse;
import com.niladri.location_service.entity.City;
import com.niladri.location_service.projection.CitySearchProjection;

public class CityMapper {
    public static City toCity(CityRequest request) {
        return City.builder()
                .name(request.getName())
                .cityCode(request.getCityCode())
                .countryCode(request.getCountryCode())
                .countryName(request.getCountryName())
                .regionCode(request.getRegionCode())
                .timeZoneId(request.getTimeZoneOffset())
                .build();
    }

    public static CityResponse toCityResponse(City response) {
        return new CityResponse(
                response.getId(),
                response.getName(),
                response.getCityCode(),
                response.getCountryCode(),
                response.getCountryName(),
                response.getRegionCode(),
                response.getTimeZoneId()
        );
    }

    public static City updateEntity(City city, UpdateCityRequest request) {
        if (request.getName() != null) {
            city.setName(request.getName().trim());
        }
        if (request.getCityCode() != null) {
            city.setCityCode(request.getCityCode().toUpperCase().trim());
        }
        if (request.getCountryCode() != null) {
            city.setCountryCode(request.getCountryCode().toUpperCase().trim());
        }
        if (request.getCountryName() != null) {
            city.setCountryName(request.getCountryName().trim());
        }
        if (request.getRegionCode() != null) {
            city.setRegionCode(request.getRegionCode().toUpperCase().trim());
        }
        return city;
    }

    public static CitySearchResponse toCitySearchResponse(CitySearchProjection response) {
        return new CitySearchResponse(
                response.getId(),
                response.getName(),
                response.getCityCode()
        );
    }
}

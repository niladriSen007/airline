package com.niladri.location_service.exceptions;

public class CityWithCityCodeAlreadyExistsException extends RuntimeException {
    public CityWithCityCodeAlreadyExistsException(String message) {
        super(message);
    }
}

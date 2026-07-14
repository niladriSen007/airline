package com.niladri.location_service.exceptions;

public class CityAlreadyExistsException extends RuntimeException {
    public CityAlreadyExistsException(String message) {
        super(message);
    }
}

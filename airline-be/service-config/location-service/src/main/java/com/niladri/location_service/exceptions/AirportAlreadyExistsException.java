package com.niladri.location_service.exceptions;

public class AirportAlreadyExistsException extends RuntimeException {
    public AirportAlreadyExistsException(String message) {
        super(message);
    }
}

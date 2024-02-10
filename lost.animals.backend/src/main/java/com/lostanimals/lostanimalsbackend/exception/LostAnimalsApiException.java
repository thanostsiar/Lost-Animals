package com.lostanimals.lostanimalsbackend.exception;

import org.springframework.http.HttpStatus;

public class LostAnimalsApiException extends RuntimeException {
    private HttpStatus status;
    private String message;

    public LostAnimalsApiException(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
    }

    public HttpStatus getStatus() {
        return status;
    }

    @Override
    public String getMessage() {
        return message;
    }
}

package org.judexmars.db2d.exception;

import org.springframework.http.HttpStatus;

public class InvalidJwtException extends BaseException {

    public InvalidJwtException(String reason) {
        super(HttpStatus.UNAUTHORIZED, "exception.invalid_jwt", reason);
    }
}

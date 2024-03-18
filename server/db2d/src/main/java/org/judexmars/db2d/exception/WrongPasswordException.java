package org.judexmars.db2d.exception;

import org.springframework.http.HttpStatus;

public class WrongPasswordException extends BaseException {
    public WrongPasswordException() {
        super(HttpStatus.UNAUTHORIZED, "exception.wrong_password");
    }
}

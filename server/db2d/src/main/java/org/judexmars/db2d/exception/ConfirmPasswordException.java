package org.judexmars.db2d.exception;

import org.springframework.http.HttpStatus;

public class ConfirmPasswordException extends BaseException {

    public ConfirmPasswordException() {
        super(HttpStatus.BAD_REQUEST, "exception.confirm_password");
    }
}

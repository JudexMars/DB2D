package org.judexmars.db2d.exception;

import org.springframework.http.HttpStatus;

public class EmailTakenException extends BaseException {

    public EmailTakenException(String email) {
        super(HttpStatus.CONFLICT, "exception.email_taken", email);
    }
}

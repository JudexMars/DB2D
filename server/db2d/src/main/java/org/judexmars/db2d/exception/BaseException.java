package org.judexmars.db2d.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@Getter
public class BaseException extends ResponseStatusException {

    private final String messageCode;

    private final Object[] args;

    public BaseException(HttpStatus status, String messageCode, Object... args) {
        super(status);
        this.messageCode = messageCode;
        this.args = args;
    }
}

package org.judexmars.db2d.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class BaseNotFoundException extends BaseException {

    public BaseNotFoundException(String messageCode, Object ... args) {
        super(HttpStatus.NOT_FOUND, messageCode, args);
    }

}

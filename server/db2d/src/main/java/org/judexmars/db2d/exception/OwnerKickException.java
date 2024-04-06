package org.judexmars.db2d.exception;

import org.springframework.http.HttpStatus;

public class OwnerKickException extends BaseException {
    public OwnerKickException() {
        super(HttpStatus.BAD_REQUEST, "exception.owner_kick");
    }
}

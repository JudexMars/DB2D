package org.judexmars.db2d.exception;

import org.springframework.http.HttpStatus;

public class AccountAlreadyExistsException extends BaseException {

    public AccountAlreadyExistsException(String accountName) {
        super(HttpStatus.CONFLICT, "exception.account_already_exists", accountName);
    }
}

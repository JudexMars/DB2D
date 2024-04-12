package org.judexmars.db2d.exception;

import org.springframework.http.HttpStatus;

public class AccountIsNotInGroup extends BaseException {
    public AccountIsNotInGroup(Long accountId, Long groupId) {
        super(HttpStatus.NOT_FOUND, "exception.account_is_not_in_group", accountId, groupId);
    }
}

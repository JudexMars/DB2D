package org.judexmars.db2d.exception;

public class NoSuchRoleException extends BaseNotFoundException {

    public NoSuchRoleException(Object... args) {
        super("exception.no_such_role", args);
    }
}

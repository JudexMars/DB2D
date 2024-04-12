package org.judexmars.db2d.exception;

public class PrivilegeNotFound extends BaseNotFoundException {
    public PrivilegeNotFound(String messageCode, Object... args) {
        super("exception.privilege_not_found", args);
    }
}

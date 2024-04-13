package org.judexmars.db2d.exception;

public class GroupNotFoundException extends BaseNotFoundException {
    public GroupNotFoundException(Object... args) {
        super("exception.group_not_found", args);
    }
}

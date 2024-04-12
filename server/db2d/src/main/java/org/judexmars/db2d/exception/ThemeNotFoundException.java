package org.judexmars.db2d.exception;

public class ThemeNotFoundException extends BaseNotFoundException {
    public ThemeNotFoundException(Object... args) {
        super("exception.theme_not_found", args);
    }
}

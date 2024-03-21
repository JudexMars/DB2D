package org.judexmars.db2d.exception;

public class LanguageNotFoundException extends BaseNotFoundException{
    public LanguageNotFoundException(Object... args) {
        super("exception.language_not_found", args);
    }
}

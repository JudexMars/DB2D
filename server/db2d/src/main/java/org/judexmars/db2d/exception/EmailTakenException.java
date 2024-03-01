package org.judexmars.db2d.exception;

public class EmailTakenException extends RuntimeException {

    public EmailTakenException(String email) {
        super("Почта " + email+ " уже занята");
    }
}

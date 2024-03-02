package org.judexmars.db2d.exception;

public class EmailTakenException extends RuntimeException {

    public EmailTakenException(String email) {
        super("Почта " + email+ " уже занята");
    }

    public EmailTakenException(String email, Throwable cause) {
        super("Почта " + email + " уже занята", cause);
    }
}

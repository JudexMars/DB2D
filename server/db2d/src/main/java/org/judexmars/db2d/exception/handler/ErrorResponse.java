package org.judexmars.db2d.exception.handler;

public record ErrorResponse(
        int status,
        String message
) {
}

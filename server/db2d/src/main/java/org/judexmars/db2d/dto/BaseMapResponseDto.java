package org.judexmars.db2d.dto;

import java.util.Map;

public record BaseMapResponseDto(
        int status,
        Map<String, String> message
) {
}

package org.judexmars.db2d.dto.auth.request;

import jakarta.validation.constraints.NotBlank;

public record JwtRefreshRequestDto(
        @NotBlank
        String token
) {
}

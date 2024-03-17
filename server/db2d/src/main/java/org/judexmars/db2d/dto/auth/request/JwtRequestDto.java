package org.judexmars.db2d.dto.auth.request;

import jakarta.validation.constraints.NotBlank;

public record JwtRequestDto(
        @NotBlank
        String email,
        @NotBlank
        String password
) {
}

package org.judexmars.db2d.dto.account;

import jakarta.validation.constraints.NotBlank;

public record AccountPasswordDto(
        @NotBlank
        String oldPassword,
        @NotBlank
        String newPassword
) {
}

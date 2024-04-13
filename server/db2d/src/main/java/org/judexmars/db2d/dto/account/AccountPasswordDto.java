package org.judexmars.db2d.dto.account;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

@Schema(name = "AccountPasswordRequest")
public record AccountPasswordDto(
        @NotBlank
        String oldPassword,
        @NotBlank
        String newPassword
) {
}

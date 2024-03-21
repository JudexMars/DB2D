package org.judexmars.db2d.dto.account;

import jakarta.validation.constraints.NotBlank;

public record AccountSettingsDto(
        Long accountId,
        @NotBlank
        String language
) {
}

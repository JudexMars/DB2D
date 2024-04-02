package org.judexmars.db2d.dto.account;

import jakarta.validation.constraints.NotNull;
import org.judexmars.db2d.annotation.NullOrNotBlank;

public record AccountSettingsDto(
        @NotNull
        Long accountId,
        @NullOrNotBlank
        String language
) {
}

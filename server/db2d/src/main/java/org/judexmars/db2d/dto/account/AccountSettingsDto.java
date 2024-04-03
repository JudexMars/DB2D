package org.judexmars.db2d.dto.account;

import org.judexmars.db2d.annotation.NullOrNotBlank;

public record AccountSettingsDto(
        @NullOrNotBlank
        String language
) {
}

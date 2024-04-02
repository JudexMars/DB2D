package org.judexmars.db2d.dto.account;

import org.judexmars.db2d.annotation.NullOrNotBlank;

public record UpdateAccountDto(
        @NullOrNotBlank
        String firstname,
        @NullOrNotBlank
        String lastname
) {
}

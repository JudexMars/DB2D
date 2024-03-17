package org.judexmars.db2d.dto.account;

import jakarta.validation.constraints.NotBlank;

public record UpdateAccountDto(
        @NotBlank
        String firstname,
        @NotBlank
        String lastname
) {
}

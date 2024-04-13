package org.judexmars.db2d.dto.group;

import jakarta.validation.constraints.NotNull;

public record KickAccountDto(
        @NotNull
        Long accountId
) {
}

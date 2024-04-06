package org.judexmars.db2d.dto.group;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ChangeRoleDto(
        @NotNull
        Long accountId,
        @NotBlank
        String newRole
) {
}

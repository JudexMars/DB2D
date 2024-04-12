package org.judexmars.db2d.dto.group;

import jakarta.validation.constraints.NotBlank;

public record CreateEditGroupDto(
        @NotBlank
        String name,
        String description
) {
}

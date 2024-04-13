package org.judexmars.db2d.dto.group;

import jakarta.validation.constraints.NotBlank;

public record InviteDto(
        @NotBlank
        String email
) {
}

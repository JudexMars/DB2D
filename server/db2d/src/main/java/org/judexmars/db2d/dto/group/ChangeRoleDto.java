package org.judexmars.db2d.dto.group;

public record ChangeRoleDto(
        Long accountId,
        String newRole
) {
}

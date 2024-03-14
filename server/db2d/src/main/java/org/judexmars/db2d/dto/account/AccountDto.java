package org.judexmars.db2d.dto.account;

public record AccountDto(
        Long id,
        String username,
        String email,
        String firstname,
        String lastname
) {
}

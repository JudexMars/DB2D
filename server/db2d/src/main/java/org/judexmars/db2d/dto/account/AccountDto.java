package org.judexmars.db2d.dto.account;

public record AccountDto(
        Long id,
        String email,
        String firstname,
        String lastname
) {
}

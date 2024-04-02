package org.judexmars.db2d.dto.account;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Schema(name = "AccountResponse")
public record AccountDto(
        Long id,
        String email,
        String firstname,
        String lastname,
        String role
) {
}

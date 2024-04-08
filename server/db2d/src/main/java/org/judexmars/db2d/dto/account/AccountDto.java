package org.judexmars.db2d.dto.account;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;
import org.judexmars.db2d.dto.group.GroupDto;

import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Schema(name = "AccountResponse")
public record AccountDto(
        Long id,
        String email,
        String firstName,
        String lastName,
        String role,
        List<GroupDto> groups
) {
}

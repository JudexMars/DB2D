package org.judexmars.db2d.dto.account;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;

public record AccountSettingsDto(
        @JsonProperty("account_id")
        Long accountId,
        @NotBlank
        String language
) {
}

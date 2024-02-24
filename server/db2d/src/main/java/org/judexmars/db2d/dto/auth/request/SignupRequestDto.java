package org.judexmars.db2d.dto.auth.request;


import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;

public record SignupRequestDto(
        @NotBlank
        String username,
        @NotBlank
        String email,
        @NotBlank
        String password,
        @NotBlank
        @JsonProperty("confirm_password")
        String confirmPassword
) {
}

package org.judexmars.db2d.dto.auth.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public record JwtResponseDto(
        @JsonProperty("account_id")
        Long accountId,
        String username,
        @JsonProperty("access_token")
        String accessToken,
        @JsonProperty("refresh_token")
        String refreshToken
) {
}

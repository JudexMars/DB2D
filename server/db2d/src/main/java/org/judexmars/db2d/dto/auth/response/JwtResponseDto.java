package org.judexmars.db2d.dto.auth.response;

public record JwtResponseDto(
        Long accountId,
        String email,
        String accessToken,
        String refreshToken
) {
}

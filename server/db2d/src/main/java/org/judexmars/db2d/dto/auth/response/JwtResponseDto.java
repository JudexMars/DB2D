package org.judexmars.db2d.dto.auth.response;

import com.fasterxml.jackson.annotation.JsonUnwrapped;
import org.judexmars.db2d.dto.account.AccountDto;
import org.judexmars.db2d.dto.account.AccountSettingsDto;

public record JwtResponseDto(
        @JsonUnwrapped
        AccountDto accountDto,
        @JsonUnwrapped
        AccountSettingsDto accountSettingsDto,
        String accessToken,
        String refreshToken
) {
}

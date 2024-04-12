package org.judexmars.db2d.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.judexmars.db2d.dto.BaseResponseDto;
import org.judexmars.db2d.dto.auth.request.JwtRefreshRequestDto;
import org.judexmars.db2d.dto.auth.request.JwtRequestDto;
import org.judexmars.db2d.dto.auth.request.SignupRequestDto;
import org.judexmars.db2d.dto.auth.response.JwtResponseDto;
import org.judexmars.db2d.exception.ConfirmPasswordException;
import org.judexmars.db2d.model.AccountEntity;
import org.judexmars.db2d.service.AccountService;
import org.judexmars.db2d.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@Tag(name = "auth", description = "Авторизация на сайте")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthService authService;
    private final AccountService accountService;

    @Operation(summary = "Вход в аккаунт")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Вход успешен", useReturnTypeSchema = true),
            @ApiResponse(responseCode = "400", description = "Некорректный формат данных", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = BaseResponseDto.class))
            }),
            @ApiResponse(responseCode = "401", description = "Некорректные реквизиты", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = BaseResponseDto.class))
            })
    })
    @PostMapping("/login")
    public ResponseEntity<JwtResponseDto> login(@RequestBody @Valid JwtRequestDto requestDto) {
        var userDetails = accountService.loadUserByUsername(requestDto.email());
        JwtResponseDto jwtResponseDto = getResponseDto((AccountEntity) userDetails,
                requestDto.email(), requestDto.password());
        return ResponseEntity.ok(jwtResponseDto);
    }

    @Operation(summary = "Регистрация аккаунта")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Регистрация успешна", useReturnTypeSchema = true),
            @ApiResponse(responseCode = "400", description = "Некорректный формат данных", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = BaseResponseDto.class))
            }),
            @ApiResponse(responseCode = "401", description = "Некорректные реквизиты", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = BaseResponseDto.class))
            })
    })
    @PostMapping("/signup")
    public ResponseEntity<JwtResponseDto> signUp(@RequestBody @Valid SignupRequestDto requestDto) {
        if (!requestDto.password().equals(requestDto.confirmPassword())) {
            throw new ConfirmPasswordException();
        }
        var createdAccount = accountService.createAccount(requestDto);
        var userDetails = accountService.loadUserByUsername(createdAccount.email());
        JwtResponseDto jwtResponseDto = getResponseDto((AccountEntity) userDetails, requestDto.email(), requestDto.password());
        return ResponseEntity.ok(jwtResponseDto);
    }

    @Operation(summary = "Обновление токена")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Создан новый токен", useReturnTypeSchema = true),
            @ApiResponse(responseCode = "400", description = "Некорректный формат данных", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = BaseResponseDto.class))
            }),
            @ApiResponse(responseCode = "401", description = "Некорректные реквизиты", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = BaseResponseDto.class))
            })
    })
    @PostMapping("/refresh")
    public ResponseEntity<JwtResponseDto> refresh(@RequestBody @Valid JwtRefreshRequestDto requestDto) {
        var newTokens = authService.refresh(requestDto.token());
        var accountDto = accountService.getById(Long.valueOf(newTokens[2]));
        var accountSettingsDto = accountService.getAccountSettingsById(Long.valueOf(newTokens[2]));
        return ResponseEntity.ok(new JwtResponseDto(
                accountDto,
                accountSettingsDto,
                newTokens[0],
                newTokens[1]
        ));
    }

    private JwtResponseDto getResponseDto(AccountEntity account, String name, String password) {
        var tokens = authService.createAuthTokens(account, name, password);
        var accountDto = accountService.getById(account.getId());
        var accountSettingsDto = accountService.getAccountSettingsById(accountDto.id());
        return new JwtResponseDto(
                accountDto,
                accountSettingsDto,
                tokens[0],
                tokens[1]
        );
    }
}

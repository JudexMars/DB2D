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
import org.judexmars.db2d.dto.auth.request.JwtRefreshRequestDto;
import org.judexmars.db2d.dto.auth.request.JwtRequestDto;
import org.judexmars.db2d.dto.auth.request.SignupRequestDto;
import org.judexmars.db2d.dto.auth.response.JwtResponseDto;
import org.judexmars.db2d.exception.AccessDeniedException;
import org.judexmars.db2d.exception.SignUpException;
import org.judexmars.db2d.mapper.AccountMapper;
import org.judexmars.db2d.model.AccountEntity;
import org.judexmars.db2d.service.AccountService;
import org.judexmars.db2d.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@Tag(name = "auth", description = "Авторизация на сайте")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthService authService;
    private final AccountService accountService;
    private final AccountMapper accountMapper;

    @Operation(description = "Вход в аккаунт")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Вход успешен", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = JwtResponseDto.class))
            }),
            @ApiResponse(responseCode = "400", description = "Некорректный формат данных", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ProblemDetail.class))
            }),
            @ApiResponse(responseCode = "403", description = "Некорректные реквизиты", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ProblemDetail.class))
            })
    })
    @PostMapping("/login")
    public ResponseEntity<JwtResponseDto> login(@RequestBody @Valid JwtRequestDto requestDto) {
        var userDetails = accountService.loadUserByUsername(requestDto.username());
        JwtResponseDto jwtResponseDto = getResponseDto((AccountEntity) userDetails, requestDto.username(), requestDto.password());
        return ResponseEntity.ok(jwtResponseDto);
    }

    @Operation(description = "Регистрация аккаунта")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Регистрация успешна", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = JwtResponseDto.class))
            }),
            @ApiResponse(responseCode = "400", description = "Некорректный формат данных", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ProblemDetail.class))
            }),
            @ApiResponse(responseCode = "403", description = "Некорректные реквизиты", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ProblemDetail.class))
            })
    })
    @PostMapping("/signup")
    public ResponseEntity<JwtResponseDto> signUp(@RequestBody @Valid SignupRequestDto requestDto) {
        if (!requestDto.password().equals(requestDto.confirmPassword())) {
            throw new SignUpException("Пароли не совпадают");
        }
        AccountEntity createdAccount = accountService.createAccount(accountMapper.toAccount(requestDto));
        JwtResponseDto jwtResponseDto = getResponseDto(createdAccount, requestDto.username(), requestDto.password());
        return ResponseEntity.ok(jwtResponseDto);
    }

    @Operation(description = "Обновление токена")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Создан новый токен", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = JwtResponseDto.class))
            }),
            @ApiResponse(responseCode = "400", description = "Некорректный формат данных", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ProblemDetail.class))
            }),
            @ApiResponse(responseCode = "403", description = "Некорректные реквизиты", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ProblemDetail.class))
            })
    })
    @PostMapping("/refresh")
    public ResponseEntity<JwtResponseDto> refresh(@RequestBody @Valid JwtRefreshRequestDto requestDto) {
        var newTokens = authService.refresh(requestDto.token());
        return ResponseEntity.ok(new JwtResponseDto(
                Long.valueOf(newTokens[2]),
                newTokens[3],
                newTokens[0],
                newTokens[1]
        ));
    }

    private JwtResponseDto getResponseDto(AccountEntity account, String name, String password) {
        var tokens = authService.createAuthTokens(account, name, password);
        return new JwtResponseDto(
                account.getId(),
                account.getUsername(),
                tokens[0],
                tokens[1]
        );
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ProblemDetail handleAccessDenied(AccessDeniedException accessDeniedException) {
        return ProblemDetail.forStatusAndDetail(HttpStatus.FORBIDDEN, accessDeniedException.getMessage());
    }

    @ExceptionHandler(SignUpException.class)
    public ProblemDetail handleSignUp(SignUpException signUpException) {
        return ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, signUpException.getMessage());
    }
}

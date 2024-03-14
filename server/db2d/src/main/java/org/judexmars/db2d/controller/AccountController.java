package org.judexmars.db2d.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.judexmars.db2d.dto.account.AccountDto;
import org.judexmars.db2d.dto.account.AccountSettingsDto;
import org.judexmars.db2d.exception.handler.ErrorResponse;
import org.judexmars.db2d.service.AccountService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/account")
@SecurityRequirement(name = "Auth")
@Tag(name = "account", description = "Работа с аккаунтами")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;

    @Operation(description = "Получить аккаунт")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Аккаунт найден", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = AccountDto.class))
            }),
            @ApiResponse(responseCode = "400", description = "Некорректный формат данных", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            }),
            @ApiResponse(responseCode = "404", description = "Аккаунт не найден", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            })
    })
    @GetMapping("/{id}")
    public ResponseEntity<AccountDto> getAccount(@PathVariable Long id) {
        var account = accountService.getById(id);
        return ResponseEntity.ok(account);
    }

    @Operation(description = "Получить настройки аккаунта")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Аккаунт найден", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = AccountDto.class))
            }),
            @ApiResponse(responseCode = "400", description = "Некорректный формат данных", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            }),
            @ApiResponse(responseCode = "404", description = "Аккаунт не найден", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            })
    })
    @GetMapping("/{id}/settings")
    public ResponseEntity<AccountSettingsDto> getAccountSettings(@PathVariable Long id) {
        if (accountService.checkFakeId(id)) throw new AccessDeniedException("Wrong ID");
        var accountSettings = accountService.getAccountSettingsById(id);
        return ResponseEntity.ok(accountSettings);
    }

    @Operation(description = "Обновить настройки аккаунта")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Аккаунт обновлен", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = AccountDto.class))
            }),
            @ApiResponse(responseCode = "400", description = "Некорректный формат данных", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            }),
            @ApiResponse(responseCode = "404", description = "Аккаунт не найден", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            })
    })
    @PutMapping("/{id}/settings")
    public ResponseEntity<AccountSettingsDto> putAccountSettings(@PathVariable Long id, AccountSettingsDto accountSettingsDto) {
        if (accountService.checkFakeId(id)) throw new AccessDeniedException("Wrong ID");
        var accountSettings = accountService.updateAccountSettingsById(id, accountSettingsDto);
        return ResponseEntity.ok(accountSettings);
    }
}

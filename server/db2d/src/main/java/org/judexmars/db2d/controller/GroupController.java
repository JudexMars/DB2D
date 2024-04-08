package org.judexmars.db2d.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.judexmars.db2d.dto.BaseResponseDto;
import org.judexmars.db2d.dto.account.AccountDto;
import org.judexmars.db2d.dto.group.*;
import org.judexmars.db2d.exception.NoSuchRoleException;
import org.judexmars.db2d.service.GroupService;
import org.judexmars.db2d.service.MessageRenderer;
import org.judexmars.db2d.utils.SecurityUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("/group")
@SecurityRequirement(name = "Auth")
@RequiredArgsConstructor
@Tag(name = "group", description = "Создание/просмотр/модификация групп")
public class GroupController {

    private final GroupService groupService;
    private final MessageRenderer messageRenderer;
    private final SecurityUtils securityUtils;

    @Operation(summary = "Создать новую группу")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Группа успешно создана", useReturnTypeSchema = true),
            @ApiResponse(responseCode = "400", description = "Неверный формат данных", content =
            @Content(mediaType = APPLICATION_JSON_VALUE, schema = @Schema(implementation = BaseResponseDto.class)))
    })
    @PostMapping
    public ResponseEntity<GroupDto> createGroup(@RequestBody @Valid CreateEditGroupDto createEditGroupDto) {
        var ownerEmail = securityUtils.getLoggedInEmail();
        var group = groupService.createGroup(createEditGroupDto);
        groupService.changeAccountGroupRoleByEmail(group.id(), ownerEmail, "Owner");
        return ResponseEntity.ok(group);
    }

    @Operation(summary = "Пригласить пользователя в группу")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Пользователь успешно приглашен", useReturnTypeSchema = true),
            @ApiResponse(responseCode = "400", description = "Неверный формат данных", useReturnTypeSchema = true),
            @ApiResponse(responseCode = "404", description = "Пользователь или группа не найдены", useReturnTypeSchema = true)
    })
    @PreAuthorize("hasAuthority(#id + 'MANAGE_ACCOUNTS')")
    @PostMapping("/{id}/invite")
    public ResponseEntity<BaseResponseDto> inviteByEmail(@PathVariable Long id, @RequestBody @Valid InviteDto inviteDto) {
        groupService.addAccountToGroup(id, inviteDto);
        return ResponseEntity.ok(new BaseResponseDto(200, messageRenderer
                .render("response.invite_successful", inviteDto.email(), id)));
    }

    @Operation(summary = "Изменить роль пользователя в группе")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Пользователь успешно поменял роль", useReturnTypeSchema = true),
            @ApiResponse(responseCode = "400", description = "Неверный формат данных", useReturnTypeSchema = true),
            @ApiResponse(responseCode = "404", description = "Пользователь, роль или группа не найдены", useReturnTypeSchema = true)
    })
    @PreAuthorize("hasAuthority(#id + 'MANAGE_ACCOUNTS')")
    @PutMapping("/{id}/role")
    public ResponseEntity<BaseResponseDto> changeAccountGroupRole(@PathVariable Long id,
                                                                  @RequestBody @Valid ChangeRoleDto changeRoleDto) {
        if (changeRoleDto.newRole().equals("Owner")) {
            throw new NoSuchRoleException("Owner");
        }
        groupService.changeAccountGroupRoleById(id, changeRoleDto);
        return ResponseEntity.ok(new BaseResponseDto(200, messageRenderer
                .render("response.change_role_successful",
                        changeRoleDto.accountId(), changeRoleDto.newRole(), id)));
    }

    @Operation(summary = "Получить всех пользователей, состоящих в группе")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Пользователи получены", content =
            @Content(mediaType = APPLICATION_JSON_VALUE, schema = @Schema(implementation = BaseResponseDto.class))),
            @ApiResponse(responseCode = "400", description = "Неверный формат данных", content =
            @Content(mediaType = APPLICATION_JSON_VALUE, schema = @Schema(implementation = BaseResponseDto.class))),
    })
    @PreAuthorize("hasAuthority(#id + 'READ_CONTENT')")
    @GetMapping("/{id}/members")
    public ResponseEntity<List<AccountDto>> getAccountsInGroup(@PathVariable Long id) {
        return ResponseEntity.ok(groupService.getAccountsInGroup(id));
    }

    @Operation(summary = "Получить основную информацию о группе")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Группа успешно отредактирована", useReturnTypeSchema = true),
            @ApiResponse(responseCode = "400", description = "Неверный формат данных", content =
            @Content(mediaType = APPLICATION_JSON_VALUE, schema = @Schema(implementation = BaseResponseDto.class))),
            @ApiResponse(responseCode = "404", description = "Группа не найдена", content =
            @Content(mediaType = APPLICATION_JSON_VALUE, schema = @Schema(implementation = BaseResponseDto.class)))
    })
    @PreAuthorize("hasAuthority(#id + 'READ_CONTENT')")
    @GetMapping("/{id}")
    public ResponseEntity<GroupDto> getGroup(@PathVariable Long id) {
        return ResponseEntity.ok(groupService.getGroupById(id));
    }

    @Operation(summary = "Редактировать основную информацию о группе")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Группа успешно отредактирована", useReturnTypeSchema = true),
            @ApiResponse(responseCode = "400", description = "Неверный формат данных", content =
            @Content(mediaType = APPLICATION_JSON_VALUE, schema = @Schema(implementation = BaseResponseDto.class))),
            @ApiResponse(responseCode = "404", description = "Группа не найдена", content =
            @Content(mediaType = APPLICATION_JSON_VALUE, schema = @Schema(implementation = BaseResponseDto.class)))
    })
    @PreAuthorize("hasAuthority(#id + 'EDIT_GROUP_INFO')")
    @PutMapping("/{id}")
    public ResponseEntity<GroupDto> editGroup(@PathVariable Long id, @RequestBody @Valid CreateEditGroupDto createEditGroupDto) {
        return ResponseEntity.ok(groupService.editGroupById(id, createEditGroupDto));
    }

    @Operation(summary = "Исключить пользователя из группы")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Пользователь успешно исключен из группы", useReturnTypeSchema = true),
            @ApiResponse(responseCode = "400", description = "Неверный формат данных", useReturnTypeSchema = true),
            @ApiResponse(responseCode = "404", description = "Группа не найдена", useReturnTypeSchema = true)
    })
    @PreAuthorize("hasAuthority(#id + 'MANAGE_ACCOUNTS')")
    @PutMapping("/{id}/kick")
    public ResponseEntity<BaseResponseDto> kickAccount(@PathVariable Long id, @Valid @RequestBody KickAccountDto kickAccountDto) {
        groupService.kickAccount(id, kickAccountDto);
        return ResponseEntity.ok(new BaseResponseDto(200, messageRenderer
                .render("response.account_kicked_successfully", kickAccountDto.accountId(), id)));
    }

    @Operation(summary = "Получить все группы для пользователя")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Список получен", useReturnTypeSchema = true),
            @ApiResponse(responseCode = "400", description = "Неверный формат данных", content = @Content(
                    schema = @Schema(implementation = BaseResponseDto.class), mediaType = APPLICATION_JSON_VALUE
            ))
    })
    @GetMapping
    public ResponseEntity<List<GroupDto>> getAllGroupsForAccount() {
        var loggedInEmail = securityUtils.getLoggedInEmail();
        var groupsForAccount = groupService.getGroupsForAccount(loggedInEmail);
        return ResponseEntity.ok(groupsForAccount);
    }
}

package org.judexmars.db2d.mapper;

import org.judexmars.db2d.dto.account.AccountDto;
import org.judexmars.db2d.dto.account.AccountSettingsDto;
import org.judexmars.db2d.dto.account.InterfaceLanguageDto;
import org.judexmars.db2d.dto.account.UpdateAccountDto;
import org.judexmars.db2d.dto.auth.request.SignupRequestDto;
import org.judexmars.db2d.dto.group.GroupDto;
import org.judexmars.db2d.model.*;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

import java.util.List;
import java.util.Set;

@Mapper(componentModel = "spring")
public interface AccountMapper {

    AccountEntity toAccount(SignupRequestDto requestDto);

    @Mapping(target = "groups", source = "roles", qualifiedByName = "mapGroups",
            nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    AccountDto toAccountDto(AccountEntity account);

    @Mapping(target = "id", ignore = true)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    AccountEntity toAccountWithNoNulls(UpdateAccountDto accountDto, @MappingTarget AccountEntity account);

    @Mapping(target = "role", defaultExpression = "java(role)")
    AccountDto toAccountDtoWithRole(AccountEntity account, String role);

    @Mapping(target = "language", source = "language.name")
    @Mapping(target = "theme", source = "theme.name")
    AccountSettingsDto toAccountSettingsDto(AccountSettingsEntity accountSettings);

    InterfaceLanguageDto toInterfaceLanguageDto(InterfaceLanguageEntity interfaceLanguage);

    @Mapping(target = "accountId", expression = "java(id)")
    AccountSettingsEntity toAccountSettings(AccountSettingsDto accountSettingsDto, Long id);

    default InterfaceLanguageEntity toInterfaceLanguage(String language) {
        System.out.println("Mapping happens: " + language);
        var il = new InterfaceLanguageEntity();
        System.out.println("Language entity: " + il);
        il.setName(language);
        return il;
    }

    default InterfaceThemeEntity toInterfaceTheme(String theme) {
        System.out.println("Mapping happens: " + theme);
        var il = new InterfaceThemeEntity();
        System.out.println("Theme entity: " + il);
        il.setName(theme);
        return il;
    }

    @Named("mapGroups")
    default List<GroupDto> mapGroups(Set<AccountRoleGroupEntity> roles) {
        var groupMapper = Mappers.getMapper(GroupMapper.class);
        return roles
                .stream()
                .map(AccountRoleGroupEntity::getAccGroup)
                .map(groupMapper::toGroupDto)
                .toList();
    }
}

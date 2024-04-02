package org.judexmars.db2d.mapper;

import org.judexmars.db2d.dto.account.AccountDto;
import org.judexmars.db2d.dto.account.AccountSettingsDto;
import org.judexmars.db2d.dto.account.InterfaceLanguageDto;
import org.judexmars.db2d.dto.account.UpdateAccountDto;
import org.judexmars.db2d.dto.auth.request.SignupRequestDto;
import org.judexmars.db2d.model.AccountEntity;
import org.judexmars.db2d.model.AccountSettingsEntity;
import org.judexmars.db2d.model.InterfaceLanguageEntity;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface AccountMapper {

    AccountEntity toAccount(SignupRequestDto requestDto);

    AccountDto toAccountDto(AccountEntity account);

    @Mapping(target = "id", ignore = true)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    AccountEntity toAccountWithNoNulls(UpdateAccountDto accountDto, @MappingTarget AccountEntity account);

    @Mapping(target = "role", defaultExpression = "java(role)")
    AccountDto toAccountDtoWithRole(AccountEntity account, String role);

    @Mapping(target = "language", source = "language.name")
    AccountSettingsDto toAccountSettingsDto(AccountSettingsEntity accountSettings);

    InterfaceLanguageDto toInterfaceLanguageDto(InterfaceLanguageEntity interfaceLanguage);

    @Mapping(target = "accountId", source = "accountSettingsDto.accountId", defaultExpression = "java(id)")
    AccountSettingsEntity toAccountSettings(AccountSettingsDto accountSettingsDto, Long id);

    default InterfaceLanguageEntity toInterfaceLanguage(String language) {
        System.out.println("Mapping happens: " + language);
        var il = new InterfaceLanguageEntity();
        System.out.println("Language entity: " + il);
        il.setName(language);
        return il;
    }
}

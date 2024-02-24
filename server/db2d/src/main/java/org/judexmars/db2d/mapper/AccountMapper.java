package org.judexmars.db2d.mapper;

import org.judexmars.db2d.dto.auth.request.SignupRequestDto;
import org.judexmars.db2d.model.AccountEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AccountMapper {

    AccountEntity toAccount(SignupRequestDto requestDto);
}

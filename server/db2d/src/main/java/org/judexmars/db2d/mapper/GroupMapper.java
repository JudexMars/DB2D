package org.judexmars.db2d.mapper;

import org.judexmars.db2d.dto.group.CreateEditGroupDto;
import org.judexmars.db2d.dto.group.GroupDto;
import org.judexmars.db2d.model.AccountGroupEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface GroupMapper {

    AccountGroupEntity toGroupEntity(CreateEditGroupDto createEditGroupDto);

    GroupDto toGroupDto(AccountGroupEntity group);
}

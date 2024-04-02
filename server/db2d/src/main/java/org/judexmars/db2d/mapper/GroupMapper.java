package org.judexmars.db2d.mapper;

import org.judexmars.db2d.dto.group.CreateEditGroupDto;
import org.judexmars.db2d.dto.group.GroupDto;
import org.judexmars.db2d.model.AccGroupEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface GroupMapper {

    AccGroupEntity toGroupEntity(CreateEditGroupDto createEditGroupDto);

    GroupDto toGroupDto(AccGroupEntity group);
}

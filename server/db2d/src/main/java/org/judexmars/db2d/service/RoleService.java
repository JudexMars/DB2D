package org.judexmars.db2d.service;

import lombok.RequiredArgsConstructor;
import org.judexmars.db2d.exception.NoSuchRoleException;
import org.judexmars.db2d.exception.PrivilegeNotFound;
import org.judexmars.db2d.model.PrivilegeEntity;
import org.judexmars.db2d.model.RoleEntity;
import org.judexmars.db2d.repository.PrivilegeRepository;
import org.judexmars.db2d.repository.RoleRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RoleService {

    private final RoleRepository roleRepository;
    private final PrivilegeRepository privilegeRepository;

    List<RoleEntity> getDefaultRolesForGroup() {
        var readContent = getPrivilegeEntityByName("READ_CONTENT");
        var writeContent = getPrivilegeEntityByName("WRITE_CONTENT");
        var editContent = getPrivilegeEntityByName("EDIT_CONTENT");
        var deleteContent = getPrivilegeEntityByName("DELETE_CONTENT");
        var manageAccounts = getPrivilegeEntityByName("MANAGE_ACCOUNTS");
        var editGroupInfo = getPrivilegeEntityByName("EDIT_GROUP_INFO");

        var ownerPrivileges = new ArrayList<>(List.of(
                readContent, writeContent, editContent, deleteContent, manageAccounts, editGroupInfo
        ));
        var adminPrivileges = new ArrayList<>(List.of(
                readContent, writeContent, editContent, deleteContent, manageAccounts, editGroupInfo
        ));
        var editorPrivileges = new ArrayList<>(List.of(
                readContent, writeContent, editContent, deleteContent
        ));
        var viewerPrivileges = new ArrayList<>(List.of(
                readContent
        ));

        var defaultRoles = new ArrayList<>(List.of(
                new RoleEntity().setName("ROLE_OWNER").setPrivileges(ownerPrivileges),
                new RoleEntity().setName("ROLE_ADMIN").setPrivileges(adminPrivileges),
                new RoleEntity().setName("ROLE_EDITOR").setPrivileges(editorPrivileges),
                new RoleEntity().setName("ROLE_VIEWER").setPrivileges(viewerPrivileges)
        ));
        return defaultRoles;
//        return roleRepository.saveAll(defaultRoles);
    }

    RoleEntity getRoleEntityByNameAndGroupId(String name, Long groupId) {
        return roleRepository.findByNameAndAccGroupId(name, groupId).orElseThrow(() -> new NoSuchRoleException(name));
    }

    List<RoleEntity> saveAll(List<RoleEntity> roles) {
        return roleRepository.saveAll(roles);
    }


    private PrivilegeEntity getPrivilegeEntityByName(String name) {
        return privilegeRepository.findByName(name).orElseThrow(() -> new PrivilegeNotFound(name));
    }
}

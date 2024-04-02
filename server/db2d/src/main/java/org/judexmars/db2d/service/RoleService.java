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

    /**
     * Get defaults roles which are automatically added to a new group
     *
     * @return {@link List} of roles
     */
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

        return new ArrayList<>(List.of(
                new RoleEntity().setName("Owner").setPrivileges(ownerPrivileges),
                new RoleEntity().setName("Admin").setPrivileges(adminPrivileges),
                new RoleEntity().setName("Editor").setPrivileges(editorPrivileges),
                new RoleEntity().setName("Viewer").setPrivileges(viewerPrivileges)
        ));
    }

    /**
     * Get role as entity by its name and group id
     *
     * @param name    name of the role
     * @param groupId id of the group
     * @return {@link RoleEntity}
     */
    RoleEntity getRoleEntityByNameAndGroupId(String name, Long groupId) {
        return roleRepository.findByNameAndAccGroupId(name, groupId).orElseThrow(() -> new NoSuchRoleException(name));
    }

    private PrivilegeEntity getPrivilegeEntityByName(String name) {
        return privilegeRepository.findByName(name).orElseThrow(() -> new PrivilegeNotFound(name));
    }
}

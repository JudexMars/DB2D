package org.judexmars.db2d.service;

import lombok.RequiredArgsConstructor;
import org.judexmars.db2d.exception.NoSuchRoleException;
import org.judexmars.db2d.exception.PrivilegeNotFound;
import org.judexmars.db2d.model.DefaultPrivileges;
import org.judexmars.db2d.model.DefaultRoles;
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
        var readContent = getPrivilegeEntityByName(DefaultPrivileges.READ_CONTENT.name());
        var editContent = getPrivilegeEntityByName(DefaultPrivileges.EDIT_CONTENT.name());
        var deleteContent = getPrivilegeEntityByName(DefaultPrivileges.DELETE_CONTENT.name());
        var manageAccounts = getPrivilegeEntityByName(DefaultPrivileges.MANAGE_ACCOUNTS.name());
        var editGroupInfo = getPrivilegeEntityByName(DefaultPrivileges.EDIT_GROUP_INFO.name());

        var ownerPrivileges = new ArrayList<>(List.of(
                readContent, editContent, deleteContent, manageAccounts, editGroupInfo
        ));
        var adminPrivileges = new ArrayList<>(List.of(
                readContent, editContent, deleteContent, manageAccounts, editGroupInfo
        ));
        var editorPrivileges = new ArrayList<>(List.of(
                readContent, editContent, deleteContent
        ));
        var viewerPrivileges = new ArrayList<>(List.of(
                readContent
        ));

        return new ArrayList<>(List.of(
                new RoleEntity().setName(DefaultRoles.Owner.name()).setPrivileges(ownerPrivileges),
                new RoleEntity().setName(DefaultRoles.Admin.name()).setPrivileges(adminPrivileges),
                new RoleEntity().setName(DefaultRoles.Editor.name()).setPrivileges(editorPrivileges),
                new RoleEntity().setName(DefaultRoles.Viewer.name()).setPrivileges(viewerPrivileges)
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

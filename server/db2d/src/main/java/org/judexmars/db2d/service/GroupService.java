package org.judexmars.db2d.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.judexmars.db2d.dto.account.AccountDto;
import org.judexmars.db2d.dto.group.*;
import org.judexmars.db2d.exception.AccountIsNotInGroup;
import org.judexmars.db2d.exception.GroupNotFoundException;
import org.judexmars.db2d.mapper.AccountMapper;
import org.judexmars.db2d.mapper.GroupMapper;
import org.judexmars.db2d.model.AccGroupEntity;
import org.judexmars.db2d.model.AccountEntity;
import org.judexmars.db2d.model.AccountRoleGroupEntity;
import org.judexmars.db2d.model.RoleEntity;
import org.judexmars.db2d.repository.AccountRoleGroupRepository;
import org.judexmars.db2d.repository.GroupRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class GroupService {

    private final GroupRepository groupRepository;
    private final AccountService accountService;
    private final AccountRoleGroupRepository accountRoleGroupRepository;
    private final RoleService roleService;
    private final GroupMapper groupMapper;
    private final AccountMapper accountMapper;

    /**
     * Create new group
     *
     * @param createEditGroupDto basic information about the group
     * @return {@link GroupDto}
     */
    @Transactional
    public GroupDto createGroup(CreateEditGroupDto createEditGroupDto) {
        var group = groupMapper.toGroupEntity(createEditGroupDto);
        group = groupRepository.saveAndFlush(group);

        var defaultRoles = roleService.getDefaultRolesForGroup();
        for (var role : defaultRoles) role.setAccGroup(group);
        group.setRoles(defaultRoles);

        group = groupRepository.saveAndFlush(group);

        return groupMapper.toGroupDto(group);
    }

    /**
     * Get group as entity by id
     *
     * @param groupId id of the group
     * @return {@link AccGroupEntity}
     */
    public AccGroupEntity getGroupEntityById(Long groupId) {
        return groupRepository.findById(groupId).orElseThrow(() -> new GroupNotFoundException(groupId));
    }

    @Transactional
    protected void setGroupRole(AccountEntity account, RoleEntity role, AccGroupEntity group) {
        var x = new AccountRoleGroupEntity().setAccount(account).setRole(role).setAccGroup(group);
        accountRoleGroupRepository.save(x);
    }

    public boolean isAccountInGroup(Long accountId, Long groupId) {
        return !accountRoleGroupRepository.findByAccountIdAndAccGroupId(accountId, groupId).isEmpty();
    }

    public boolean isAccountInGroup(String email, Long groupId) {
        return isAccountInGroup(accountService.getEntityByEmail(email).getId(), groupId);
    }

    /**
     * Add account to the group
     *
     * @param inviteDto object containing email and group id
     */
    public void addAccountToGroup(Long groupId, InviteDto inviteDto) {
        var account = accountService.getEntityByEmail(inviteDto.email());
        var group = getGroupEntityById(groupId);
        var role = roleService.getRoleEntityByNameAndGroupId("ROLE_VIEWER", group.getId());
        setGroupRole(account, role, group);
    }

    /**
     * Change account's role in the group
     *
     * @param changeRoleDto object containing account's id and new role's name
     */
    public void changeAccountGroupRoleById(Long groupId, ChangeRoleDto changeRoleDto) {
        var account = accountService.getEntityById(changeRoleDto.accountId());
        var role = roleService.getRoleEntityByNameAndGroupId(changeRoleDto.newRole(), groupId);
        var group = getGroupEntityById(groupId);

        setGroupRole(account, role, group);
    }

    public void changeAccountGroupRoleByEmail(Long groupId, String email, String roleName) {
        var account = accountService.getEntityByEmail(email);
        var role = roleService.getRoleEntityByNameAndGroupId(roleName, groupId);
        var group = getGroupEntityById(groupId);

        setGroupRole(account, role, group);
    }

    public List<AccountDto> getAccountsInGroup(Long id) {
        return accountRoleGroupRepository.findByAccGroupId(id).stream()
                .map(AccountRoleGroupEntity::getAccount)
                .map(accountMapper::toAccountDto)
                .toList();
    }

    public GroupDto editGroupById(Long id, CreateEditGroupDto createEditGroupDto) {
        return groupMapper.toGroupDto(groupRepository.save(groupMapper.toGroupEntity(createEditGroupDto).setId(id)));
    }

    @Transactional
    public void kickAccount(Long id, KickAccountDto kickAccountDto) {
        // These checks are essential so that the client understands the root of the possible error
        getGroupEntityById(id); // check that the group exists
        accountService.getById(kickAccountDto.accountId()); // check that the account exists
        if (isAccountInGroup(kickAccountDto.accountId(), id)) // check that the account is in the group
            accountRoleGroupRepository.deleteByAccountIdAndAccGroupId(kickAccountDto.accountId(), id);
        else throw new AccountIsNotInGroup(kickAccountDto.accountId(), id);
    }
}

package org.judexmars.db2d.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.judexmars.db2d.dto.account.AccountDto;
import org.judexmars.db2d.dto.group.*;
import org.judexmars.db2d.exception.AccountIsNotInGroup;
import org.judexmars.db2d.exception.GroupNotFoundException;
import org.judexmars.db2d.exception.OwnerKickException;
import org.judexmars.db2d.mapper.AccountMapper;
import org.judexmars.db2d.mapper.GroupMapper;
import org.judexmars.db2d.model.AccountEntity;
import org.judexmars.db2d.model.AccountGroupEntity;
import org.judexmars.db2d.model.AccountRoleGroupEntity;
import org.judexmars.db2d.model.RoleEntity;
import org.judexmars.db2d.repository.AccountRoleGroupRepository;
import org.judexmars.db2d.repository.GroupRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

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
     * @return {@link AccountGroupEntity}
     */
    public AccountGroupEntity getGroupEntityById(Long groupId) {
        return groupRepository.findById(groupId).orElseThrow(() -> new GroupNotFoundException(groupId));
    }

    /**
     * Get group by id
     *
     * @param groupId id of the group
     * @return {@link GroupDto}
     */
    public GroupDto getGroupById(Long groupId) {
        return groupMapper.toGroupDto(getGroupEntityById(groupId));
    }

    /**
     * Set role in the group for the account
     *
     * @param account account entity
     * @param role    role entity
     * @param group   group entity
     */
    protected void setGroupRole(AccountEntity account, RoleEntity role, AccountGroupEntity group) {
        var x = new AccountRoleGroupEntity().setAccount(account).setRole(role).setAccGroup(group);
        accountRoleGroupRepository.save(x);
    }

    /**
     * Find account affiliation with the group
     *
     * @param accountId id of the account
     * @param groupId   id of the group
     * @return {@link AccountRoleGroupEntity}
     */
    public AccountRoleGroupEntity getAccountInGroup(Long accountId, Long groupId) {
        return accountRoleGroupRepository.findByAccountIdAndAccGroupId(accountId, groupId).getFirst();
    }

    /**
     * Add account to the group
     *
     * @param inviteDto object containing email and group id
     */
    public void addAccountToGroup(Long groupId, InviteDto inviteDto) {
        var account = accountService.getEntityByEmail(inviteDto.email());
        var group = getGroupEntityById(groupId);
        var role = roleService.getRoleEntityByNameAndGroupId("Viewer", group.getId());
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

    /**
     * Change account's role in the group
     *
     * @param groupId  id of the group
     * @param email    email of the account
     * @param roleName name of the new role
     */
    public void changeAccountGroupRoleByEmail(Long groupId, String email, String roleName) {
        var account = accountService.getEntityByEmail(email);
        var role = roleService.getRoleEntityByNameAndGroupId(roleName, groupId);
        var group = getGroupEntityById(groupId);

        setGroupRole(account, role, group);
    }

    /**
     * Get all accounts in the group
     *
     * @param id id of the group
     * @return {@link List} of accounts
     */
    public List<AccountDto> getAccountsInGroup(Long id) {
        return accountRoleGroupRepository.findByAccGroupId(id).stream()
                .map(x -> accountMapper.toAccountDtoWithRole(x.getAccount(), x.getRole().getName()))
                .toList();
    }

    /**
     * Edit group info by id
     *
     * @param id                 id of the group
     * @param createEditGroupDto new group info
     * @return updated group as {@link GroupDto}
     */
    public GroupDto editGroupById(Long id, CreateEditGroupDto createEditGroupDto) {
        return groupMapper.toGroupDto(groupRepository.save(groupMapper.toGroupEntity(createEditGroupDto).setId(id)));
    }

    /**
     * Kick account from the group
     *
     * @param id             id of the group
     * @param kickAccountDto id of the account
     */
    @Transactional
    public void kickAccount(Long id, KickAccountDto kickAccountDto) {
        // These checks are essential so that the client understands the root of the possible error
        getGroupEntityById(id); // check that the group exists
        accountService.getEntityById(kickAccountDto.accountId()); // check that the account exists
        try {
            var accountInGroup = getAccountInGroup(kickAccountDto.accountId(), id);
            if (accountInGroup.getRole().getName().equals("Owner")) {
                throw new OwnerKickException();
            }
            accountRoleGroupRepository.deleteByAccountIdAndAccGroupId(kickAccountDto.accountId(), id);
        } catch (NoSuchElementException ex) {
            throw new AccountIsNotInGroup(kickAccountDto.accountId(), id);
        }
    }

    /**
     * Get groups for account with the specified email
     *
     * @param email email of the account
     * @return {@link List} of groups
     */
    public List<GroupDto> getGroupsForAccount(String email) {
        var account = accountService.getEntityByEmail(email);
        return account.getRoles()
                .stream()
                .map(AccountRoleGroupEntity::getAccGroup)
                .map(groupMapper::toGroupDto)
                .toList();
    }
}

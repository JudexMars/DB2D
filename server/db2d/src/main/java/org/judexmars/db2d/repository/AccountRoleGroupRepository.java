package org.judexmars.db2d.repository;

import org.judexmars.db2d.model.AccountRoleGroupEntity;
import org.judexmars.db2d.model.AccountRoleGroupId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountRoleGroupRepository extends JpaRepository<AccountRoleGroupEntity, AccountRoleGroupId> {
    List<AccountRoleGroupEntity> findByAccGroupId(Long id);

    void deleteByAccountIdAndAccGroupId(Long accountId, Long groupId);

    List<AccountRoleGroupEntity> findByAccountIdAndAccGroupId(Long accountId, Long groupId);
}

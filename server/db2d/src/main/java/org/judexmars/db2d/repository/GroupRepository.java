package org.judexmars.db2d.repository;

import org.judexmars.db2d.model.AccountGroupEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupRepository extends JpaRepository<AccountGroupEntity, Long> {
}

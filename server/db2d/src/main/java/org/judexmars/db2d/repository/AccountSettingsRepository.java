package org.judexmars.db2d.repository;

import org.judexmars.db2d.model.AccountSettingsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountSettingsRepository extends JpaRepository<AccountSettingsEntity, Long> {
}

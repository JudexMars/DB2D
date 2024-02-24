package org.judexmars.db2d.repository;

import org.judexmars.db2d.model.RefreshTokenEntity;
import org.judexmars.db2d.model.RefreshTokenId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshTokenEntity, RefreshTokenId> {
}

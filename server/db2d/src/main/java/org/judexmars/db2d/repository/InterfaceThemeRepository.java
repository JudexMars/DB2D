package org.judexmars.db2d.repository;

import org.judexmars.db2d.model.InterfaceThemeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InterfaceThemeRepository extends JpaRepository<InterfaceThemeEntity, Long> {
    Optional<InterfaceThemeEntity> findByName(String x);
}

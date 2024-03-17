package org.judexmars.db2d.repository;

import org.judexmars.db2d.model.InterfaceLanguageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InterfaceLanguageRepository extends JpaRepository<InterfaceLanguageEntity, Integer> {
    Optional<InterfaceLanguageEntity> findByName(String name);
}

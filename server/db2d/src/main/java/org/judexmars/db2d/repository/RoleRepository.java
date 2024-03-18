package org.judexmars.db2d.repository;

import org.judexmars.db2d.model.RoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<RoleEntity, Long> {


    Optional<RoleEntity> findByName(String name);
}

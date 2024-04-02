package org.judexmars.db2d.repository;

import org.judexmars.db2d.model.AccGroupEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupRepository extends JpaRepository<AccGroupEntity, Long> {
}

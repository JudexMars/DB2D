package org.judexmars.db2d.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@Table(name = "privilege")
public class PrivilegeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "privilege_gen")
    @SequenceGenerator(name = "privilege_gen", sequenceName = "privilege_seq")
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToMany(mappedBy = "privileges")
    private List<RoleEntity> roles;
}

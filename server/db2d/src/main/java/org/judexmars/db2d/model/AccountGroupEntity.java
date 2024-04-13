package org.judexmars.db2d.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.Accessors;

import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@Accessors(chain = true)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@Table(name = "acc_group")
public class AccountGroupEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "acc_group_gen")
    @SequenceGenerator(name = "acc_group_gen", sequenceName = "acc_group_seq", allocationSize = 1)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "accGroup", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private Set<AccountRoleGroupEntity> accounts;

    @OneToMany(mappedBy = "accGroup", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<RoleEntity> roles;
}

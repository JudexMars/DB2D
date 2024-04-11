package org.judexmars.db2d.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class AccountRoleGroupId implements Serializable {

    @Id
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "account_id")
    private AccountEntity account;

//    @Id
//    @ManyToOne(cascade = CascadeType.MERGE)
//    @JoinColumn(name = "role_id")
//    private RoleEntity role;

    @Id
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "acc_group_id")
    private AccountGroupEntity accGroup;
}

package org.judexmars.db2d.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@Table(name = "account_settings")
public class AccountSettingsEntity {

    @ManyToOne(fetch = FetchType.EAGER)
    public InterfaceLanguageEntity language;
    @OneToOne
    @JoinColumn(name = "account_id")
    @MapsId
    public AccountEntity account;
    @Id
    @Column(name = "account_id", nullable = false)
    private Long accountId;
}

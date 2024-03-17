package org.judexmars.db2d.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor(access = AccessLevel.PUBLIC)
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@IdClass(RefreshTokenId.class)
@Table(name = "refresh_token")
public class RefreshTokenEntity {

    @Id
    @Column(name = "email")
    private String email;


    @Id
    @Column(name = "token")
    private String token;
}

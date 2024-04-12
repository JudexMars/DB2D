package org.judexmars.db2d.model;

import lombok.*;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class RefreshTokenId implements Serializable {
    private String email;
    private String token;
}

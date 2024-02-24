package org.judexmars.db2d.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.time.Duration;

@Data
@ConfigurationProperties(prefix = "jwt")
public class JwtProperties {

    private String accessSecret;
    private Duration accessLifetime;
    private String refreshSecret;
    private Duration refreshLifetime;
}

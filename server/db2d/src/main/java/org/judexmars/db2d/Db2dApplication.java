package org.judexmars.db2d;

import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.judexmars.db2d.config.JwtProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({JwtProperties.class})
@SecurityScheme(name = "Auth",
        scheme = "bearer",
        type = SecuritySchemeType.HTTP,
        in = SecuritySchemeIn.HEADER,
        bearerFormat = "JWT")
public class Db2dApplication {

    public static void main(String[] args) {
        SpringApplication.run(Db2dApplication.class, args);
    }

}

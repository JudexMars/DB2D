package org.judexmars.db2d;

import org.judexmars.db2d.config.JwtProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({JwtProperties.class})
public class Db2dApplication {

    public static void main(String[] args) {
        SpringApplication.run(Db2dApplication.class, args);
    }

}

package org.judexmars.db2d.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;

@Configuration
public class MessageSourceConfig {

    @Value("${spring.messages.basename}")
    private String messageSourceBasename;

    @Bean
    public ReloadableResourceBundleMessageSource messageSource() {
        ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
        messageSource.setBasenames("classpath:i18n/ValidationMessages", "classpath:" + messageSourceBasename);
        messageSource.setDefaultEncoding("UTF-8");
        return messageSource;
    }
}

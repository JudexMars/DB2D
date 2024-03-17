package org.judexmars.db2d.config;

import lombok.RequiredArgsConstructor;
import org.judexmars.db2d.repository.AccountRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;

import java.util.Locale;

@Configuration
@ComponentScan(basePackages = {"org.judexmars"})
@RequiredArgsConstructor
public class WebMvcConfig implements WebMvcConfigurer {

    private final AccountRepository accountRepository;

    @Bean
    public LocaleResolver localeResolver() {
        SessionLocaleResolver slr = new SessionLocaleResolver();
        slr.setDefaultLocale(Locale.ENGLISH);
        return slr;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LocaleInterceptor(accountRepository, localeResolver()))
                .addPathPatterns("/**")
                .order(1);
        }
}


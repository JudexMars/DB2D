package org.judexmars.db2d.config;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.judexmars.db2d.repository.AccountRepository;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.LocaleResolver;

import java.util.Locale;

@RequiredArgsConstructor
@Slf4j
public class LocaleInterceptor implements HandlerInterceptor {

    private final AccountRepository accountRepository;

    private final LocaleResolver localeResolver;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        String username = extractUsernameFromAuthenticationContext();
        log.debug("Username: " + username);
        if (!username.equals("anonymous")) {
            var account = accountRepository.findByEmail(username);
            if (account.isPresent()) {
                String preferredLanguage = account.get().getAccountSettings().getLanguage().getName();
                log.debug("PreferredLanguage: " + preferredLanguage);
                if (preferredLanguage != null && !preferredLanguage.isEmpty()) {
                    localeResolver.setLocale(request, response, new Locale(preferredLanguage));
                    log.debug("Current language in locale context holder: " + LocaleContextHolder.getLocale().getLanguage());
                }
            }
        }
        return true;
    }

    private String extractUsernameFromAuthenticationContext() {
        var securityContext = SecurityContextHolder.getContext();
        return securityContext.getAuthentication().getName();
    }
}

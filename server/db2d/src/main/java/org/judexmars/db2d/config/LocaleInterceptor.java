package org.judexmars.db2d.config;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.judexmars.db2d.repository.AccountRepository;
import org.judexmars.db2d.utils.SecurityUtils;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.LocaleResolver;

import java.util.Locale;

@RequiredArgsConstructor
@Slf4j
public class LocaleInterceptor implements HandlerInterceptor {

    private final AccountRepository accountRepository;

    private final LocaleResolver localeResolver;

    private final SecurityUtils securityUtils;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        String username = securityUtils.getLoggedInEmail();
        log.info("Username: " + username);
        if (!username.equals("anonymous")) {
            var account = accountRepository.findByEmail(username);
            if (account.isPresent()) {
                String preferredLanguage = account.get().getAccountSettings().getLanguage().getName();
                log.info("PreferredLanguage: " + preferredLanguage);
                if (preferredLanguage != null && !preferredLanguage.isEmpty()) {
                    localeResolver.setLocale(request, response, Locale.of(preferredLanguage));
                    log.info("Current language in locale context holder: " + LocaleContextHolder.getLocale().getLanguage());
                }
            }
        }
        return true;
    }
}

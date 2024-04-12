package org.judexmars.db2d.utils;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class SecurityUtils {

    /**
     * Get email of the logged-in user
     *
     * @return email
     */
    public String getLoggedInEmail() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}

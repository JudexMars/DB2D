package org.judexmars.db2d.service;

import lombok.RequiredArgsConstructor;
import org.judexmars.db2d.exception.InvalidJwtException;
import org.judexmars.db2d.model.AccountEntity;
import org.judexmars.db2d.model.RefreshTokenEntity;
import org.judexmars.db2d.model.RefreshTokenId;
import org.judexmars.db2d.repository.RefreshTokenRepository;
import org.judexmars.db2d.utils.JwtTokenUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final JwtTokenUtils jwtTokenUtils;
    private final AuthenticationManager authenticationManager;
    private final RefreshTokenRepository refreshTokenRepository;
    private final AccountService accountService;

    /**
     * Generate JWT tokens (access and refresh) based on user information
     *
     * @param userDetails core info of user
     * @param username    entered name
     * @param password    entered password
     * @return {accessToken, refreshToken}
     */
    public String[] createAuthTokens(UserDetails userDetails, String username, String password) {
        authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(username, password));
        var accessToken = jwtTokenUtils.generateAccessToken(userDetails);
        var refreshToken = jwtTokenUtils.generateRefreshToken(userDetails);
        refreshTokenRepository.save(new RefreshTokenEntity(username, refreshToken));
        return new String[]{accessToken, refreshToken};
    }

    /**
     * Simply checks if the user can be authenticated with provided credentials
     *
     * @param username username
     * @param password password
     * @return {@code true} if the user is authenticated
     */
    public boolean authenticate(String username, String password) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    /**
     * Generate new JWT tokens (access and refresh) based on provided refresh token
     *
     * @param refreshToken provided refresh token
     * @return {accessToken, refreshToken, userId, username}
     */
    public String[] refresh(String refreshToken) {

        var username = jwtTokenUtils.getEmailFromRefreshToken(refreshToken);
        var id = new RefreshTokenId(username, refreshToken);
        var savedToken = refreshTokenRepository.findById(id);
        if (savedToken.isPresent() && savedToken.get().getToken().equals(refreshToken)) {
            var account = (AccountEntity) accountService.loadUserByUsername(username);
            var accessToken = jwtTokenUtils.generateAccessToken(account);
            refreshTokenRepository.deleteById(id);
            refreshToken = jwtTokenUtils.generateRefreshToken(account);
            refreshTokenRepository.save(new RefreshTokenEntity(username, refreshToken));
            return new String[]{accessToken, refreshToken, String.valueOf(account.getId()), account.getUsername()};
        }
        throw new InvalidJwtException("JWT is not valid");
    }
}

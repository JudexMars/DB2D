package org.judexmars.db2d.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.judexmars.db2d.config.JwtProperties;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.time.Duration;
import java.util.Date;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtTokenUtils {

    private final JwtProperties jwtProperties;

    private SecretKey getSecretKey(String secret) {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
    }

    private String generateToken(UserDetails userDetails, Duration lifetime, String secret) {
        Date issuedDate = new Date();
        Date expirationDate = new Date(issuedDate.getTime() + lifetime.toMillis());
        return Jwts.builder()
                .subject(userDetails.getUsername())
                .issuedAt(issuedDate)
                .expiration(expirationDate)
                .signWith(getSecretKey(secret), Jwts.SIG.HS256)
                .compact();
    }

    public String generateAccessToken(UserDetails userDetails) {
        return generateToken(userDetails, jwtProperties.getAccessLifetime(), jwtProperties.getAccessSecret());
    }

    public String generateRefreshToken(UserDetails userDetails) {
        return generateToken(userDetails, jwtProperties.getRefreshLifetime(), jwtProperties.getRefreshSecret());
    }

    private Claims getAllClaimsFromToken(String token, SecretKey secretKey) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public String getUsernameFromAccessToken(String token) {
        return getAllClaimsFromToken(token, getSecretKey(jwtProperties.getAccessSecret())).getSubject();
    }

    public String getUsernameFromRefreshToken(String token) {
        return getAllClaimsFromToken(token, getSecretKey(jwtProperties.getRefreshSecret())).getSubject();
    }
}

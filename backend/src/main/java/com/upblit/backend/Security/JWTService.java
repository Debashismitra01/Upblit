package com.upblit.backend.Security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Map;

@Service
public class JWTService {

    public JWTService(@Value("${app.jwt.secret}") String secret) {
        SECRET = secret;
    }

    private final String SECRET;

    public SecretKey getSigningKey(){
        return Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));
    }
    public String generateToken(String githubId, String avatarUrl, String username){
        return Jwts.builder()
                .subject(githubId)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis()+86400000))
                .claims(Map.of("avatarurl",avatarUrl,"username",username))
                .signWith(getSigningKey())
                .compact();
    }

    public boolean validateToken(String token){
        try{
            Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(token);
            return true;
        }catch (JwtException | IllegalArgumentException e){
            return false;
        }
    }

    public Claims getClaimsFromToken(String token){
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public String getSubjectFromToken(String token) {
        return getClaimsFromToken(token).getSubject();
    }

    public String getAccessTokenFromClaims(String token) {
        return getClaimsFromToken(token).get("accessToken", String.class);
    }

    public boolean isTokenExpired(String token) {
        Date expiration = getClaimsFromToken(token).getExpiration();
        return expiration.before(new Date());
    }

}

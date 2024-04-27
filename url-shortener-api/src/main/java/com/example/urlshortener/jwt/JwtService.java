package com.example.urlshortener.jwt;

import com.example.urlshortener.user.User;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class JwtService {
    @Value("${jwt.secret.seed}")
    private String SEED;
    private SecretKey secretKey() {
        return Keys.hmacShaKeyFor(SEED.getBytes());
    }

    public String getUserToken(User user) {
        return Jwts
                .builder()
                .claim("username", user.getUsername())
                .signWith(secretKey(), Jwts.SIG.HS256)
                .compact();
    }

    public String getUsernameFromToken(String token) throws JwtException, IllegalArgumentException, NoSuchElementException {
        return Optional.ofNullable(
                Jwts.parser()
                        .verifyWith(secretKey())
                        .build()
                        .parseSignedClaims(token)
                        .getPayload()
                        .get("username", String.class)
        ).orElseThrow();
    }
}

package com.example.studenterp.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    // A secure 256-bit secret key encoded in Base64 (Change this to a strong random key!)
    private static final String SECRET_KEY = "NDE0MzUxNDY0NTQyNDM0MTQyNDM0NDQ1NDY0NTQ2NDM0MzQyNDM0MzQ1NDY0NTQ2NDM0MzQyNDM=";

    public String generateToken(String sub, String Role) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("Role", Role); // Store user role inside the token payload
        
        return Jwts.builder()
                .claims(claims)
                .subject(sub)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) // 24 Hours validity
                .signWith(getSigningKey())
                .compact();
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }
    public String extractRole(String token) {
        return (String) extractClaim(token, claims -> claims.get("Role"));
    }

    public boolean isTokenValid(String token, String sub) {
        final String extractedUsername = extractUsername(token);
        return (extractedUsername.equals(sub) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractClaim(token, Claims::getExpiration).before(new Date());
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
        return claimsResolver.apply(claims);
    }

    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
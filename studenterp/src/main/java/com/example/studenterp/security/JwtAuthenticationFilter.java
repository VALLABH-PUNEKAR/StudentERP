package com.example.studenterp.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail; // Remember: this holds your roll_no string!

        // Check if Authorization header exists and starts with Bearer
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        jwt = authHeader.substring(7); // Extract token string after "Bearer "
        userEmail = jwtService.extractUsername(jwt);

        // If username exists and user isn't already authenticated in this request context
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            
            
            if (jwtService.isTokenValid(jwt, userEmail)) {
                String role=jwtService.extractRole(jwt);
                
                // 1. Create a proper list of authorities matching your config choice
                List<SimpleGrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority(role));
                
                // 2. FIX: Build a standard UserDetails object using Spring's built-in User utility
                // We pass "placeholder" for the password field because authentication is already verified by JWT
                UserDetails userDetails = new User(userEmail, "placeholder", authorities);
                
                // 3. Construct the authentication token with the complete UserDetails principal
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails, 
                        null,
                        userDetails.getAuthorities()
                );
                
                // 4. FIX: Attach the request details (WebAuthenticationDetails) so Spring trusts the token context source
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                
                // Save authentication context safely
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request, response);
    }
}
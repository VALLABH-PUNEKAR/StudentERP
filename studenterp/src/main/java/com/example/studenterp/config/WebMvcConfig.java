package com.example.studenterp.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.example.studenterp.security.JwtAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class WebMvcConfig {
     @Autowired
    private JwtAuthenticationFilter jwtAuthFilter;
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // 1. Disable CSRF (Crucial for testing REST APIs in Postman/Thunder Client)
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable()) 
            
            // 2. Configure URL routing permissions
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/login/**").permitAll()// Allow everyone to access login routes
                .requestMatchers("/api/student/profile**").hasAuthority("ROLE_Student")
                .requestMatchers("/api/student/profile/name**").hasAuthority("ROLE_Student") 
                .requestMatchers("/api/lms/**").hasAuthority("ROLE_Student")
                .requestMatchers("/api/course/name**").hasAuthority("ROLE_Student")
                .requestMatchers("/api/faculty/**").hasAnyAuthority("ROLE_Faculty","ROLE_Hod")
                
                .anyRequest().authenticated()                // Lock down all other endpoints
            )
             .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            // Execute our custom JWT Filter before the standard UsernamePasswordAuthenticationFilter
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173")); // Your React URL
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "Accept"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // Apply globally to all paths
        return source;
    }

    
}

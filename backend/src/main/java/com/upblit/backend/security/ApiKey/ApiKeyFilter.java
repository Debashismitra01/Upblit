package com.upblit.backend.security.ApiKey;

import com.upblit.backend.security.ApiClient;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class ApiKeyFilter extends OncePerRequestFilter {

    private static final String PREFIX = "upblit_";

    @Autowired
    private ApiClientRepository apiClientRepository;


    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        return !request.getServletPath().startsWith("/ingest/");
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String rawHeader = request.getHeader("X-API-KEY");

        if (isInvalidHeader(rawHeader)) {
            unauthorized(response, "Missing or invalid API Key");
            return;
        }

        String apiKey = extractApiKey(rawHeader);

        ApiClient client = apiClientRepository.findByApiKey(apiKey)
                .orElse(null);

        if (client == null) {
            unauthorized(response, "Invalid API Key");
            return;
        }

        setAuthentication(client);

        filterChain.doFilter(request, response);
    }

    private boolean isInvalidHeader(String header) {
        return header == null || header.isBlank() || !header.startsWith(PREFIX);
    }

    private String extractApiKey(String header) {
        return header.substring(PREFIX.length()).trim();
    }

    private void setAuthentication(ApiClient client) {
        var auth = new UsernamePasswordAuthenticationToken(
                client,
                null,
                List.of()
        );
        SecurityContextHolder.getContext().setAuthentication(auth);
    }

    private void unauthorized(HttpServletResponse response, String message) throws IOException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");
        response.getWriter().write("{\"error\": \"" + message + "\"}");
    }
}
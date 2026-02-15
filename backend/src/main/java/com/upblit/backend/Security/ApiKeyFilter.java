package com.upblit.backend.Security;

import com.upblit.backend.Models.ApiClient;
import com.upblit.backend.Repository.ApiClientRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class ApiKeyFilter extends OncePerRequestFilter {

    private final ApiClientRepository repository;

    public ApiKeyFilter(ApiClientRepository repository) {
        this.repository = repository;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        return !request.getServletPath()
                .startsWith("/api/v1/logscollector");
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String apiKey = request.getHeader("X-API-KEY");

        if (apiKey == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Missing API Key");
            return;
        }
        if (!apiKey.startsWith("upblit_")) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Invalid API Key");
        }
        apiKey = apiKey.replace("upblit_", "");
        var clientOpt = repository.findByApiKey(apiKey);

        if (clientOpt.isEmpty()) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Invalid API Key");
            return;
        }

        ApiClient client = clientOpt.get();

        var authentication = new UsernamePasswordAuthenticationToken(
                client,
                null,
                List.of()
        );

        SecurityContextHolder.getContext()
                .setAuthentication(authentication);

        filterChain.doFilter(request, response);
    }
}


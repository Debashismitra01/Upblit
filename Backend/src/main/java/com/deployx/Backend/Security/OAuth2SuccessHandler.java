package com.deployx.Backend.Security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import java.io.IOException;

public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {
    private final JWTService jwtService;

    public OAuth2SuccessHandler(JWTService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
            throws IOException, ServletException {

        OAuth2User principal = (OAuth2User) authentication.getPrincipal();

        if (!(principal instanceof CustomOAuth2User)) {
            throw new IllegalStateException("Expected CustomOAuth2User but got " + principal.getClass());
        }

        CustomOAuth2User customUser = (CustomOAuth2User) principal;

        // Safer GitHub ID extraction with type handling
        String githubId = extractGithubId(customUser);
        String avatarUrl = extractAvatarUrl(customUser);
        String username = extractUsername(customUser);

        String jwt = jwtService.generateToken(githubId, avatarUrl, username);

        response.sendRedirect("http://localhost:3000/oauth-success?token=" + jwt);
    }
    public static String extractUsername(CustomOAuth2User user) {
        Object login = user.getAttributes().get("login");
        return login != null ? login.toString() : null;
    }

    public static String extractAvatarUrl(CustomOAuth2User user) {
        Object avatar = user.getAttributes().get("avatar_url");
        return avatar != null ? avatar.toString() : null;
    }

    public static String extractEmail(CustomOAuth2User user) {
        Object email = user.getAttributes().get("email");
        return email != null ? email.toString() : null;
    }
    private String extractGithubId(CustomOAuth2User customUser) {
        Object idObj = customUser.getAttributes().get("id");  // Use getAttributes() instead of getAttribute()
      if (idObj instanceof String) {
            return (String) idObj;
        } else {
            // Fallback to login if id is not available or in unexpected format
            Object login = customUser.getAttributes().get("login");
            return login != null ? login.toString() : "unknown";
        }
    }
}
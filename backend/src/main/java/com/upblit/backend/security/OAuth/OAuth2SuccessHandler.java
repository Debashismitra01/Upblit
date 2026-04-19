package com.upblit.backend.security.OAuth;

import com.upblit.backend.core.User;
import com.upblit.backend.core.UserRepository;
import com.upblit.backend.core.user.UserService;
import com.upblit.backend.security.JWT.JWTService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import java.io.IOException;

public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {
    private final JWTService jwtService;

    @Value("${frontend.uri}")
    String frontendUrl;

    public OAuth2SuccessHandler(JWTService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication)
            throws IOException, ServletException {

        CustomOAuth2User customUser = (CustomOAuth2User) authentication.getPrincipal();

        assert customUser != null;
        User user = customUser.getUser();

        String jwt = jwtService.generateToken(
                String.valueOf(user.getId()),
                user.getAvatarUrl(),
                user.getUsername()
        );

        response.sendRedirect(frontendUrl + "/oauth-success?token=" + jwt);
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
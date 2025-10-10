package com.deployx.Backend.Security;

import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Map;

public class CustomOAuth2User implements OAuth2User {
    private final OAuth2User oauth2User;
    @Getter
    private final String accessToken;

    public CustomOAuth2User(OAuth2User oauth2User, String accessToken) {
        this.oauth2User = oauth2User;
        this.accessToken = accessToken;
    }

    public <T> T getAttribute(String name) {
        return oauth2User.getAttribute(name);
    }
    
    @Override
    public Map<String, Object> getAttributes() {
        return oauth2User.getAttributes();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return oauth2User.getAuthorities();
    }

    @Override
    public String getName() {
        return oauth2User.getName();
    }
}


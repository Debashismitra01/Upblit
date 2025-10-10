package com.deployx.Backend.Security;

import com.deployx.Backend.Model.User;
import com.deployx.Backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    @Autowired
    private UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User user = new DefaultOAuth2UserService().loadUser(userRequest);

        // Extract data
        String githubId = user.getAttribute("id").toString();
        String username = user.getAttribute("login");
        String email = user.getAttribute("email");
        String avatarUrl = user.getAttribute("avatar_url");
        String token = userRequest.getAccessToken().getTokenValue();

        // Check if user exists
        User existing = userRepository.findByGithubId(githubId).orElse(new User());
        existing.setGithubId(githubId);
        existing.setUsername(username);
        existing.setEmail(email);
        existing.setAvatarUrl(avatarUrl);
        existing.setAccessToken(token);
        existing.setLastLogin(Instant.now());

        userRepository.save(existing);

        return new CustomOAuth2User(user,token);
    }
}


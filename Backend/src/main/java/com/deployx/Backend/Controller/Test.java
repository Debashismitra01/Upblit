package com.deployx.Backend.Controller;


import com.deployx.Backend.Service.RepoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/")
public class Test {
    @Autowired
    private RepoService repoService;

    @GetMapping("/me")
    public ResponseEntity<?> me(@AuthenticationPrincipal OAuth2User principal) {
        return ResponseEntity.ok(principal.getAttributes());
    }

    @GetMapping("/token")
    public ResponseEntity<String> getAccessToken(
            @RegisteredOAuth2AuthorizedClient("github") OAuth2AuthorizedClient authorizedClient) {

        if (authorizedClient == null) {
            return ResponseEntity.status(401).body("Unauthorized or no client registered.");
        }

        return ResponseEntity.ok(authorizedClient.getAccessToken().getTokenValue());
    }
}

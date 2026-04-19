package com.upblit.backend.test;

import com.upblit.backend.ingestion.model.Telemetry;
import com.upblit.backend.ingestion.service.TelemetryServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@RestController
@RequestMapping("/")
public class Test {
    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private TelemetryServices telemetryServices;


    @PostMapping
    public String test2(@RequestBody String body){
        System.out.println(body);
        return body;
    }

    @GetMapping("/logs")
    public List<Telemetry> findByUser_id(@RequestParam("id") Long ApplicationId){
        System.out.println("user_id:"+ApplicationId);
        return telemetryServices.findByApplicationId(ApplicationId);
    }
    @GetMapping("/logs/project")
    public List<Telemetry> findByProject_id(@RequestParam("id") Long ProjectId){
        System.out.println("project_id:"+ProjectId);
        List<Telemetry> applicationLogs= telemetryServices.findByProjectId(ProjectId);
        return applicationLogs;
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


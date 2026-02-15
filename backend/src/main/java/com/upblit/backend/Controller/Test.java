package com.upblit.backend.Controller;

import com.upblit.backend.DTO.EmailDTO;
import com.upblit.backend.Models.ApplicationLogs;
import com.upblit.backend.Models.Telemetry;
import com.upblit.backend.Service.ApplicationLogsService;
import com.upblit.backend.Service.EmailService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
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
    private ApplicationLogsService applicationLogsService;


    @PostMapping
    public String test2(@RequestBody String body){
        System.out.println(body);
        return body;
    }

    @GetMapping("/logs")
    public List<ApplicationLogs> findByUser_id(@RequestParam("id") Long ApplicationId){
        System.out.println("user_id:"+ApplicationId);
        return applicationLogsService.findByApplicationId(ApplicationId);
    }
    @GetMapping("/logs/project")
    public List<ApplicationLogs> findByProject_id(@RequestParam("id") Long ProjectId){
        System.out.println("project_id:"+ProjectId);
        List<ApplicationLogs> applicationLogs= applicationLogsService.findByProjectId(ProjectId);
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


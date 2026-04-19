package com.upblit.backend.ingestion.controller;

import com.upblit.backend.ingestion.model.Logs;
import com.upblit.backend.ingestion.service.LogServices;
import com.upblit.backend.security.ApiClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.security.auth.kerberos.KerberosKey;
import java.time.Instant;

@RestController
@RequestMapping("/ingest/logs")
public class LogsController {

    @Autowired
    private LogServices logServices;
    @GetMapping
    public ResponseEntity<?> getLogs() {
        return new ResponseEntity<>("Logs Ingestion Services are Active", HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> postlogs(Authentication authentication, @RequestBody Logs logs){
        ApiClient apiClient = (ApiClient) authentication.getPrincipal();
        assert apiClient != null;
        logs.setApplicationId(apiClient.getApplicationId());
        logs.setProjectId(apiClient.getProjectId());
        if(logs.getTimestamp() == null) {logs.setTimestamp(Instant.now());}
        return logServices.saveLogs(logs);
    }

}

package com.upblit.backend.ingestion.controller;

import com.upblit.backend.security.ApiClient;
import com.upblit.backend.ingestion.model.Telemetry;
import com.upblit.backend.ingestion.service.TelemetryServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ingest/telemetry")
public class TelemetryController {

    @Autowired
    private TelemetryServices telemetryServices;

    @GetMapping
    public String getLogs(){
        return "hello";
    }

    @PostMapping
    public Telemetry Logs(Authentication authentication, @RequestBody Telemetry applicationLogs) {
        ApiClient apiClient = (ApiClient) authentication.getPrincipal();
        assert apiClient != null;
        applicationLogs.setApplicationId(apiClient.getApplicationId());
        applicationLogs.setProjectId(apiClient.getProjectId());
        return telemetryServices.save(applicationLogs);
    }
}

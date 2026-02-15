package com.upblit.backend.Controller;

import com.upblit.backend.Models.ApiClient;
import com.upblit.backend.Models.ApplicationLogs;
import com.upblit.backend.Service.ApplicationLogsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/logscollector")
public class LogsCollectorController {

    @Autowired
    private ApplicationLogsService applicationLogsService;

    @PostMapping
    public ApplicationLogs Logs(Authentication authentication, @RequestBody ApplicationLogs applicationLogs) {
        ApiClient apiClient = (ApiClient) authentication.getPrincipal();
        assert apiClient != null;
        applicationLogs.setApplicationId(apiClient.getApplicationId());
        applicationLogs.setProjectId(apiClient.getProjectId());
        return applicationLogsService.save(applicationLogs);
    }
}

package com.upblit.backend.core.application;

import com.upblit.backend.core.ApplicationDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/applications")
public class ApplicationController {
    @Autowired
    private ApplicationService applicationService;
    @PostMapping
    public ResponseEntity<?> save(@RequestBody ApplicationDTO applicationDTO) {
        return applicationService.createApplication(applicationDTO);
    }
    @GetMapping()
    public ResponseEntity<?> getApplications(@RequestParam Long projectId) {
        return applicationService.getApplication(projectId);
    }
}

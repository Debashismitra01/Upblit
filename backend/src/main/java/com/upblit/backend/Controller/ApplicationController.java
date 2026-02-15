package com.upblit.backend.Controller;

import com.upblit.backend.DTO.ApplicationDTO;
import com.upblit.backend.Models.Applications;
import com.upblit.backend.Repository.ApplicationsRepository;
import com.upblit.backend.Repository.ProjectRepository;
import com.upblit.backend.Repository.UserRepository;
import com.upblit.backend.Security.UserdataUtil;
import com.upblit.backend.Service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
}

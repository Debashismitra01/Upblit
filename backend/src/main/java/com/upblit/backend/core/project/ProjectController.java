package com.upblit.backend.core.project;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("project")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @PostMapping
    public ResponseEntity<?> createProject(@RequestBody String projectName, Long OrganizationId){
        return projectService.createProject(projectName, OrganizationId);
    }
    @GetMapping("/id")
    public ResponseEntity<?> getProject(@RequestBody Long ProjectId, Long OrganizationId){
        return projectService.getProject(ProjectId, OrganizationId);
    }
    @GetMapping
    public ResponseEntity<?> getAllProject(@RequestParam Long OrganizationId){
        return projectService.getAllProjects(OrganizationId);
    }
}


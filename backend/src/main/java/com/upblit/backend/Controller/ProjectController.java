package com.upblit.backend.Controller;

import com.upblit.backend.Models.Project;
import com.upblit.backend.Repository.ProjectRepository;
import com.upblit.backend.Repository.UserRepository;
import com.upblit.backend.Security.UserdataUtil;
import com.upblit.backend.Service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("project")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @PostMapping
    public ResponseEntity<?> createProject(@RequestBody String projectName){
        return projectService.createProject(projectName);
    }
    @GetMapping("/id")
    public ResponseEntity<?> getProject(@RequestParam Long ProjectId){
        return projectService.getProject(ProjectId);
    }
    @GetMapping
    public ResponseEntity<?> getAllProject(){
        return projectService.getAllProjects();
    }
}

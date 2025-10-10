package com.deployx.Backend.Controller;

import com.deployx.Backend.Model.Project;
import com.deployx.Backend.Service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {
    @Autowired
    private ProjectService projectService;

    @GetMapping
    public List<Project> getprojects(){
        return projectService.getProjectsByUsername();
    }
}

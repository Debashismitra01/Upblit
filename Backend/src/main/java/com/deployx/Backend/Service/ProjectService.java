package com.deployx.Backend.Service;

import com.deployx.Backend.Model.Project;
import com.deployx.Backend.Model.User;
import com.deployx.Backend.Repository.ProjectRepository;
import com.deployx.Backend.Repository.UserRepository;
import com.deployx.Backend.Security.UserdataUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    @Autowired
    public ProjectService(ProjectRepository projectRepository, UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }
    public Project createProject(String name, String url, Integer port, User user) {
        Project project = new Project();
        project.setName(name);
        project.setUrl(url);
        project.setPort(port);
        project.setOwner(user);
        project.setCreatedAt(LocalDateTime.now());
        project.setDeployed(false);
        return projectRepository.save(project);
    }


    public List<Project> getProjectsByUsername() {
        return userRepository.findByUsername(UserdataUtil.getCurrentUsername()).orElse(null).getProjects();
    }
    public  Project getProject(String name){
        Project project=projectRepository.findByNameAndOwnerId(name,userRepository.findByUsername(UserdataUtil.getCurrentUsername()).orElse(null).getId());
        return project;
    }

    public void delete(Project project){
        projectRepository.delete(project);
    }

    public Project markProjectAsDeployed(Project project, User user) {
        project.setDeployed(true);
        return projectRepository.save(project);
    }
}

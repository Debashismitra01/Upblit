package com.upblit.backend.Service;

import com.upblit.backend.Models.Project;
import com.upblit.backend.Repository.ProjectRepository;
import com.upblit.backend.Repository.UserRepository;
import com.upblit.backend.Security.UserdataUtil;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
@Transactional
public class ProjectService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectRepository projectRepository;

    public ResponseEntity<?> createProject(@RequestBody String projectName){
        System.out.println("projectName:"+projectName);
        Project project = new Project();
        project.setName(projectName);
        project.setOwner(userRepository.findByUsername(UserdataUtil.getCurrentUsername()).orElse(null));
        return ResponseEntity.ok(projectRepository.save(project));
    }
    public ResponseEntity<?> getProject(@RequestBody Long projectId){
        System.out.println("projectName:"+projectId);
        Project project = projectRepository.findByIdAndOwner(projectId,userRepository.findByUsername(UserdataUtil.getCurrentUsername()).orElse(null)).orElse(null);
        if(project != null){return ResponseEntity.ok(project);}
        return ResponseEntity.notFound().build();
    }
    public ResponseEntity<?> getAllProjects(){
        return ResponseEntity.ok(projectRepository.findByOwner(userRepository.findByUsername(UserdataUtil.getCurrentUsername()).orElse(null)));
    }
}

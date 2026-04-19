package com.upblit.backend.core.project;

import com.upblit.backend.core.*;
import com.upblit.backend.security.UserdataUtil;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
@Transactional
public class ProjectService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private OrganizationRepository organizationRepository;

    @Autowired
    private ProjectRepository projectRepository;

    public ResponseEntity<?> createProject(@RequestBody String projectName, Long OrganizationId){
        if(accessChecker(OrganizationId)) {
            System.out.println("projectName:" + projectName);
            Project project = new Project();
            project.setName(projectName);
            project.setOrganization(organizationRepository.findById(OrganizationId).orElse(null));
            return ResponseEntity.ok(projectRepository.save(project));
        }
        else return ResponseEntity.of(ProblemDetail.forStatus(HttpStatus.FORBIDDEN)).build();
    }
    public ResponseEntity<?> getProject(@RequestBody Long projectId, Long OrganizationId){
        if(accessChecker(OrganizationId)) {
            System.out.println("projectName:" + projectId);
            Project project = projectRepository.findByIdAndOrganizationId(projectId,OrganizationId).orElse(null);
            if (project != null) {
                return ResponseEntity.ok(project);
            }
            return ResponseEntity.notFound().build();
        }
        else  return ResponseEntity.of(ProblemDetail.forStatus(HttpStatus.FORBIDDEN)).build();
    }
    public ResponseEntity<?> getAllProjects(Long OrganizationId){
        if(accessChecker(OrganizationId)) return ResponseEntity.ok(projectRepository.findByOrganizationId(OrganizationId));
        else return ResponseEntity.of(ProblemDetail.forStatus(HttpStatus.FORBIDDEN)).build();
    }
    public boolean accessChecker(Long OrganizationId){
       return organizationRepository.findByIdAndUsersId(OrganizationId, UserdataUtil.getCurrentUserId()).isPresent();
    }
}

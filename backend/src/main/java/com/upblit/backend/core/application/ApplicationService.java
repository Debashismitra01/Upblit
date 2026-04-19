package com.upblit.backend.core.application;

import com.upblit.backend.core.*;
import com.upblit.backend.security.UserdataUtil;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class ApplicationService {
    @Autowired
    private ApplicationsRepository applicationsRepository;
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private OrganizationRepository organizationRepository;

    public ResponseEntity<?> createApplication(ApplicationDTO applicationDTO) {
        Project project = projectRepository.findByIdAndOrganizationId(applicationDTO.getProjectId(), applicationDTO.getOrganizationId()).orElse(null);
        if(project!=null){
            Application application = new Application();
            application.setName(applicationDTO.getName());
            application.setDescription(applicationDTO.getDescription());
            application.setEnvironment(applicationDTO.getEnvironment());
            application.setProject(projectRepository.findById(applicationDTO.getProjectId()).orElse(null));
            return ResponseEntity.ok().body(applicationsRepository.save(application));
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
    public ResponseEntity<?> getApplication(Long id) {
        return applicationsRepository
                .findByIdAndProjectOrganizationUsersId(id, UserdataUtil.getCurrentUserId())
                .map(app -> ResponseEntity.ok().body(app))
                .orElseGet(() -> ResponseEntity.of(ProblemDetail.forStatus(HttpStatus.FORBIDDEN)).build());
    }
}
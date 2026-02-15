package com.upblit.backend.Service;

import com.upblit.backend.DTO.ApplicationDTO;
import com.upblit.backend.Models.Applications;
import com.upblit.backend.Models.Project;
import com.upblit.backend.Repository.ApplicationsRepository;
import com.upblit.backend.Repository.ProjectRepository;
import com.upblit.backend.Repository.UserRepository;
import com.upblit.backend.Security.UserdataUtil;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Service
@Transactional
public class ApplicationService {
    @Autowired
    private ApplicationsRepository applicationsRepository;
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private UserRepository userRepository;

    public ResponseEntity<?> createApplication(@RequestBody ApplicationDTO applicationDTO) {
        Project project = projectRepository.findByIdAndOwner(applicationDTO.getProjectId(), userRepository.findByUsername(UserdataUtil.getCurrentUsername()).orElse(null)).orElse(null);
        if(project!=null){
            Applications applications = new Applications();
            applications.setName(applicationDTO.getName());
            applications.setDescription(applicationDTO.getDescription());
            applications.setEnvironment(applicationDTO.getEnvironment());
            applications.setProject(projectRepository.findById(applicationDTO.getProjectId()).orElse(null));
            return ResponseEntity.ok().body(applicationsRepository.save(applications));
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
}
package com.upblit.backend.Service;

import com.upblit.backend.Models.ApplicationLogs;
import com.upblit.backend.Repository.ApplicationLogsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor(onConstructor_ = @Autowired)
public class ApplicationLogsService {
    private final ApplicationLogsRepository applicationLogsRepository;
    public List<ApplicationLogs> findAll() {
        return applicationLogsRepository.findAll();
    }
    public ApplicationLogs save(ApplicationLogs applicationLogs) {
        return  applicationLogsRepository.save(applicationLogs);
    }
    public List<ApplicationLogs> findByProjectId(Long projectId) {
        return applicationLogsRepository.findByProjectId(projectId);
    }
    public List<ApplicationLogs> findByApplicationId(Long applicationId) {
        return applicationLogsRepository.findByApplicationId(applicationId);
    }
}

package com.upblit.backend.ingestion.service;

import com.upblit.backend.ingestion.model.Telemetry;
import com.upblit.backend.ingestion.repository.TelemetryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor(onConstructor_ = @Autowired)
public class TelemetryServices {
    private final TelemetryRepository telemetryRepository;
    public List<Telemetry> findAll() {
        return telemetryRepository.findAll();
    }
    public Telemetry save(Telemetry applicationLogs) {
        return  telemetryRepository.save(applicationLogs);
    }
    public List<Telemetry> findByProjectId(Long projectId) {
        return telemetryRepository.findByProjectId(projectId);
    }
    public List<Telemetry> findByApplicationId(Long applicationId) {
        return telemetryRepository.findByApplicationId(applicationId);
    }
}

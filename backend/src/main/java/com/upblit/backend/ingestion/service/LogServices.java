package com.upblit.backend.ingestion.service;

import com.upblit.backend.ingestion.model.Logs;
import com.upblit.backend.ingestion.repository.LogsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class LogServices {
    @Autowired
    private LogsRepository logsRepository;
    public ResponseEntity<?> saveLogs(Logs logs){
        return ResponseEntity.ok(logsRepository.save(logs));
    }
}

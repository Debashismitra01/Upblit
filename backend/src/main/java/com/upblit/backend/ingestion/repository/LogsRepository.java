package com.upblit.backend.ingestion.repository;

import com.upblit.backend.ingestion.model.Logs;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface LogsRepository extends MongoRepository<Logs, String> {
    List<Logs> findByApplicationId(Long id);
    List<Logs> findByProjectId(Long id);
    List<Logs> findByTraceId(String traceId);
    Optional<Logs> findById(String id);
}

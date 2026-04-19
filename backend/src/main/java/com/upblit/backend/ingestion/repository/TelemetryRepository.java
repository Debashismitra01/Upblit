package com.upblit.backend.ingestion.repository;

import com.upblit.backend.ingestion.model.Telemetry;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;

@Repository
public interface TelemetryRepository
        extends MongoRepository<Telemetry, String> {

    List<Telemetry> findByTimestamp(Instant timestamp);
    List<Telemetry> findByProjectId(Long projectId);
    List<Telemetry> findByApplicationId(Long applicationId);
    List<Telemetry> findByTimestampBefore(Instant start, Instant end);
}

package com.upblit.backend.Repository;

import com.upblit.backend.Models.ApplicationLogs;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;

@Repository
public interface ApplicationLogsRepository
        extends MongoRepository<ApplicationLogs, String> {

    List<ApplicationLogs> findByDate(Instant date);
    List<ApplicationLogs> findByProjectId(Long projectId);
    List<ApplicationLogs> findByApplicationId(Long applicationId);
    List<ApplicationLogs> findByDateBetween(Instant start, Instant end);
}

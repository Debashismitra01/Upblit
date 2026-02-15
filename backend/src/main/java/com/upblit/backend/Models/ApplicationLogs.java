package com.upblit.backend.Models;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.Instant;
import java.util.List;

@Document(collection = "applications_logs")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApplicationLogs {
    @Id
    private String id;
    @Field("project_id")
    private Long projectId;
    @Field("application_id")
    private Long applicationId;

    private Instant date;

    private List<Telemetry> telemetry;
}

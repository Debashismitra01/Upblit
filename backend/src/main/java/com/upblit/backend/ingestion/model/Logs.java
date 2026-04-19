package com.upblit.backend.ingestion.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.Instant;
import java.util.List;

@Document(collection = "logs")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Logs {
    @Id
    private String id;
    @Field("project_id")
    private Long projectId;
    @Field("application_id")
    private Long applicationId;
    private String traceId;
    private String level;
    private String message;
    private Instant timestamp;
}

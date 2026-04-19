package com.upblit.backend.ingestion.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.Instant;
import java.util.List;

@Document(collection = "telemetry")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Telemetry {
    @Id
    private String id;
    @Field("project_id")
    private Long projectId;
    @Field("application_id")
    private Long applicationId;
    @Field("trace_id")
    private String traceId;
    private Instant timestamp;

    private List<Event> telemetry;
}

/*
{
  "traceId": "string",
  "spanId": "string",
  "parentSpanId": "string",
  "timestamp": "2026-04-11T16:21:20.914Z",
  "method": "string",
  "url": "string",
  "status": 0,
  "durationMs": 0,
  "metadata": {
    "additionalProp1": {}
  }
}
 */

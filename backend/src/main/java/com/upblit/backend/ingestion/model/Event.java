package com.upblit.backend.ingestion.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.Instant;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Event {
    private Instant timestamp;
    private Long ApplicationId;
    private String requestMethod;
    private String requestURL;
    private String responseStatus;
    @Field("trace_id")
    private String traceId;
    private String spanId;
    private Instant duration;
    private String parentSpanId;
}

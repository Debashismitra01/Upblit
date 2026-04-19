package com.upblit.backend.core;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApplicationDTO {
    private String name;
    private String description;
    private String environment;
    private Long organizationId;
    private Long projectId;
}

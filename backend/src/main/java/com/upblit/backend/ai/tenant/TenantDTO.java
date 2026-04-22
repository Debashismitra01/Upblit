package com.upblit.backend.ai.tenant;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TenantDTO {
    private Long OrganizationId;
    private String name;
}

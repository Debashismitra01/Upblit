package com.upblit.backend.ai.tenant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ai/tenant")
public class TenantController {
    @Autowired
    private TenantService tenantService;
    @PostMapping
    public ResponseEntity<?> createTenant(@RequestBody TenantDTO tenantDTO) {
        return tenantService.createTenant(tenantDTO);
    }
}

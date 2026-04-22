package com.upblit.backend.ai.tenant;

import com.upblit.backend.ai.Tenant;
import com.upblit.backend.ai.TenantRepository;
import com.upblit.backend.core.Organization;
import com.upblit.backend.core.OrganizationRepository;
import com.upblit.backend.security.UserdataUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class TenantService {
    @Autowired
    private TenantRepository tenantRepository;

    @Autowired
    private OrganizationRepository organizationRepository;

    public ResponseEntity<?> createTenant(@RequestBody TenantDTO tenantDTO) {
        Organization organization = organizationRepository.findByIdAndUsersId(tenantDTO.getOrganizationId(), UserdataUtil.getCurrentUserId()).orElse(null);
        if (organization == null) {
            return ResponseEntity.of(ProblemDetail.forStatus(HttpStatus.FORBIDDEN)).build();
        }
        Tenant tenant = new Tenant();
        tenant.setOrganization(organization);
        tenant.setName(tenantDTO.getName());

        return ResponseEntity.ok(tenantRepository.save(tenant));
    }
}

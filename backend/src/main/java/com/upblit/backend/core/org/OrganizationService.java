package com.upblit.backend.core.org;

import com.upblit.backend.core.Organization;
import com.upblit.backend.core.OrganizationRepository;
import com.upblit.backend.core.User;
import com.upblit.backend.core.UserRepository;
import com.upblit.backend.security.UserdataUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
public class OrganizationService {
    @Autowired
    private OrganizationRepository organizationRepository;

    @Autowired
    private UserRepository userRepository;

    public Organization create(OrganizationDTO  orgDTO, String logoUrl) {
        Organization organization = new Organization();
        User user = userRepository.findById(UserdataUtil.getCurrentUserId()).orElse(null);
        organization.setName(orgDTO.getName());
        organization.setDescription(orgDTO.getDescription());
        organization.setLogoUrl(logoUrl);
        organization.setCreatedBy(user);
        organization.setUsers(List.of(user));
        organization.setCreatedDate(Instant.now());
        return organizationRepository.save(organization);
    }
    public Optional<Organization> findAll() {
        return organizationRepository.findByUsersId(UserdataUtil.getCurrentUserId());
    }

}

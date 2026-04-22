package com.upblit.backend.core;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrganizationRepository extends JpaRepository<Organization, Long> {
    @Override
    Optional<Organization> findById(Long id);

    Optional<Organization> findByIdAndUsersId(Long  id, Long userId);

    Optional<Organization> findByUsersId(Long userId);


}

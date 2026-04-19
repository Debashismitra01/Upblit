package com.upblit.backend.security.ApiKey;

import com.upblit.backend.security.ApiClient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ApiClientRepository extends JpaRepository<ApiClient, Long> {
    Optional<ApiClient> findByApiKey(String apiKey);
    Optional<ApiClient> findByApplicationId(Long ApplicationId);
    Optional<ApiClient> findByProjectId(Long ProjectId);
}

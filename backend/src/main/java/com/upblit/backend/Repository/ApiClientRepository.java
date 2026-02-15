package com.upblit.backend.Repository;

import com.upblit.backend.Models.ApiClient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ApiClientRepository extends JpaRepository<ApiClient, Long> {
    Optional<ApiClient> findByApiKey(String apiKey);
    Optional<ApiClient> findByApplicationId(Long ApplicationId);
    Optional<ApiClient> findByProjectId(Long ProjectId);
}

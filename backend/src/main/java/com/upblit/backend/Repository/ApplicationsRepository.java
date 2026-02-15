package com.upblit.backend.Repository;

import com.upblit.backend.Models.Applications;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ApplicationsRepository extends JpaRepository<Applications, Long> {
    Optional<Applications> findByProjectIdAndId(Long projectId, Long applicationId);
    Optional<Applications> findById(Long applicationId);
    Optional<Applications> findByProjectId(Long projectId);
}

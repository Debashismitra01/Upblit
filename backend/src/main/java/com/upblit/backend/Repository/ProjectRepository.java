package com.upblit.backend.Repository;

import com.upblit.backend.Models.Project;
import com.upblit.backend.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    Optional<Project> findById(Long id);
    Optional<List<Project>> findByOwner(User owner);
    Optional<Project> findByIdAndOwner(Long id, User owner);
}

package com.deployx.Backend.Repository;

import com.deployx.Backend.Model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    List<Project> findByOwner_GithubId(String githubId);

    List<Project> findByOwnerId(Long userId);

    Project findByNameAndOwnerId(String name, Long userId);
}

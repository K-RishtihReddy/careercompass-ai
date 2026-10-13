package com.careercompass.repository;

import com.careercompass.entity.Job;
import com.careercompass.entity.SavedJob;
import com.careercompass.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SavedJobRepository extends JpaRepository<SavedJob, Long> {
    List<SavedJob> findByUser(User user);
    Optional<SavedJob> findByUserAndJob(User user, Job job);
    Boolean existsByUserAndJob(User user, Job job);
    void deleteByUserAndJob(User user, Job job);
    long countByUser(User user);
}

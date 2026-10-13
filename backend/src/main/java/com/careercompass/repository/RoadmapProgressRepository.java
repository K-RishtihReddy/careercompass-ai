package com.careercompass.repository;

import com.careercompass.entity.CareerRoadmap;
import com.careercompass.entity.RoadmapProgress;
import com.careercompass.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoadmapProgressRepository extends JpaRepository<RoadmapProgress, Long> {
    List<RoadmapProgress> findByUser(User user);
    Optional<RoadmapProgress> findByUserAndRoadmap(User user, CareerRoadmap roadmap);
    long countByUserAndIsCompletedTrue(User user);
}

package com.careercompass.repository;

import com.careercompass.entity.CareerRoadmap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CareerRoadmapRepository extends JpaRepository<CareerRoadmap, Long> {
    List<CareerRoadmap> findByCareerRoleOrderByStepOrderAsc(String careerRole);

    @Query("SELECT DISTINCT r.careerRole FROM CareerRoadmap r")
    List<String> findDistinctCareerRoles();
}

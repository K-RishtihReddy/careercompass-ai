package com.careercompass.repository;

import com.careercompass.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {

    @Query("SELECT j FROM Job j WHERE " +
           "(:query IS NULL OR LOWER(j.title) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(j.company) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(j.description) LIKE LOWER(CONCAT('%', :query, '%'))) AND " +
           "(:location IS NULL OR LOWER(j.location) LIKE LOWER(CONCAT('%', :location, '%'))) AND " +
           "(:jobType IS NULL OR LOWER(j.jobType) = LOWER(:jobType)) AND " +
           "(:experienceLevel IS NULL OR LOWER(j.experienceLevel) = LOWER(:experienceLevel))")
    List<Job> searchJobs(@Param("query") String query,
                         @Param("location") String location,
                         @Param("jobType") String jobType,
                         @Param("experienceLevel") String experienceLevel);

    List<Job> findByTitleContainingIgnoreCase(String title);
}

package com.careercompass.controller;

import com.careercompass.dto.AdminStatsDto;
import com.careercompass.dto.ApiResponse;
import com.careercompass.dto.CreateJobRequest;
import com.careercompass.dto.JobDto;
import com.careercompass.dto.UserProfileDto;
import com.careercompass.entity.User;
import com.careercompass.repository.*;
import com.careercompass.service.JobService;
import com.careercompass.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final JobService jobService;
    private final UserService userService;
    private final UserRepository userRepository;
    private final JobRepository jobRepository;
    private final SkillRepository skillRepository;
    private final CareerRoadmapRepository roadmapRepository;

    public AdminController(JobService jobService,
                           UserService userService,
                           UserRepository userRepository,
                           JobRepository jobRepository,
                           SkillRepository skillRepository,
                           CareerRoadmapRepository roadmapRepository) {
        this.jobService = jobService;
        this.userService = userService;
        this.userRepository = userRepository;
        this.jobRepository = jobRepository;
        this.skillRepository = skillRepository;
        this.roadmapRepository = roadmapRepository;
    }

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<AdminStatsDto>> getAdminStats() {
        long totalUsers = userRepository.count();
        long totalJobs = jobRepository.count();
        long totalSkills = skillRepository.count();
        long totalMilestones = roadmapRepository.count();
        long completedProfiles = userRepository.findAll().stream()
                .filter(u -> Boolean.TRUE.equals(u.getProfileCompleted()))
                .count();

        AdminStatsDto stats = new AdminStatsDto(totalUsers, totalJobs, totalSkills, totalMilestones, completedProfiles);
        return ResponseEntity.ok(ApiResponse.success(stats));
    }

    @GetMapping("/users")
    public ResponseEntity<ApiResponse<List<UserProfileDto>>> getAllUsers() {
        List<User> users = userRepository.findAll();
        List<UserProfileDto> dtos = users.stream()
                .map(u -> userService.getCurrentUserProfile(u.getEmail()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.success(dtos));
    }

    @PostMapping("/jobs")
    public ResponseEntity<ApiResponse<JobDto>> createJob(@Valid @RequestBody CreateJobRequest request) {
        JobDto created = jobService.createJob(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Job listing created successfully", created));
    }

    @PutMapping("/jobs/{id}")
    public ResponseEntity<ApiResponse<JobDto>> updateJob(@PathVariable Long id, @Valid @RequestBody CreateJobRequest request) {
        JobDto updated = jobService.updateJob(id, request);
        return ResponseEntity.ok(ApiResponse.success("Job listing updated successfully", updated));
    }

    @DeleteMapping("/jobs/{id}")
    public ResponseEntity<ApiResponse<String>> deleteJob(@PathVariable Long id) {
        jobService.deleteJob(id);
        return ResponseEntity.ok(ApiResponse.success("Job listing deleted successfully", null));
    }
}

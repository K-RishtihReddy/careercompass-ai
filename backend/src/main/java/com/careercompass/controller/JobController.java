package com.careercompass.controller;

import com.careercompass.dto.ApiResponse;
import com.careercompass.dto.JobDto;
import com.careercompass.entity.User;
import com.careercompass.service.JobService;
import com.careercompass.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private final JobService jobService;
    private final UserService userService;

    public JobController(JobService jobService, UserService userService) {
        this.jobService = jobService;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<JobDto>>> getJobs(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String jobType,
            @RequestParam(required = false) String experienceLevel,
            @AuthenticationPrincipal UserDetails userDetails) {
        User currentUser = userDetails != null ? userService.getUserByEmail(userDetails.getUsername()) : null;
        List<JobDto> jobs = jobService.getAllJobs(query, location, jobType, experienceLevel, currentUser);
        return ResponseEntity.ok(ApiResponse.success(jobs));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<JobDto>>> searchJobs(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String jobType,
            @RequestParam(required = false) String experienceLevel,
            @AuthenticationPrincipal UserDetails userDetails) {
        User currentUser = userDetails != null ? userService.getUserByEmail(userDetails.getUsername()) : null;
        List<JobDto> jobs = jobService.getAllJobs(query, location, jobType, experienceLevel, currentUser);
        return ResponseEntity.ok(ApiResponse.success(jobs));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<JobDto>> getJobById(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        User currentUser = userDetails != null ? userService.getUserByEmail(userDetails.getUsername()) : null;
        JobDto job = jobService.getJobById(id, currentUser);
        return ResponseEntity.ok(ApiResponse.success(job));
    }

    @PostMapping("/{id}/save")
    public ResponseEntity<ApiResponse<String>> saveJob(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        User user = userService.getUserByEmail(userDetails.getUsername());
        boolean saved = jobService.saveJob(id, user);
        return ResponseEntity.ok(ApiResponse.success(saved ? "Job saved successfully" : "Job was already saved", null));
    }

    @DeleteMapping("/{id}/save")
    public ResponseEntity<ApiResponse<String>> unsaveJob(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        User user = userService.getUserByEmail(userDetails.getUsername());
        boolean removed = jobService.unsaveJob(id, user);
        return ResponseEntity.ok(ApiResponse.success(removed ? "Job removed from saved jobs" : "Job was not in saved list", null));
    }

    @GetMapping("/saved")
    public ResponseEntity<ApiResponse<List<JobDto>>> getSavedJobs(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userService.getUserByEmail(userDetails.getUsername());
        List<JobDto> savedJobs = jobService.getSavedJobs(user);
        return ResponseEntity.ok(ApiResponse.success(savedJobs));
    }
}

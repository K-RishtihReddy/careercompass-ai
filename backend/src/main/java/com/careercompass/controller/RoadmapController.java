package com.careercompass.controller;

import com.careercompass.dto.ApiResponse;
import com.careercompass.dto.RoadmapDto;
import com.careercompass.entity.User;
import com.careercompass.service.CareerRoadmapService;
import com.careercompass.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/career-roadmap")
public class RoadmapController {

    private final CareerRoadmapService roadmapService;
    private final UserService userService;

    public RoadmapController(CareerRoadmapService roadmapService, UserService userService) {
        this.roadmapService = roadmapService;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<RoadmapDto>>> getRoadmap(
            @RequestParam(required = false) String role,
            @AuthenticationPrincipal UserDetails userDetails) {
        User currentUser = userDetails != null ? userService.getUserByEmail(userDetails.getUsername()) : null;
        List<RoadmapDto> roadmap = roadmapService.getRoadmapForRole(role, currentUser);
        return ResponseEntity.ok(ApiResponse.success(roadmap));
    }

    @GetMapping("/roles")
    public ResponseEntity<ApiResponse<List<String>>> getAvailableRoles() {
        List<String> roles = roadmapService.getAvailableCareerRoles();
        return ResponseEntity.ok(ApiResponse.success(roles));
    }

    @PostMapping("/{id}/toggle")
    public ResponseEntity<ApiResponse<RoadmapDto>> toggleMilestone(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        User user = userService.getUserByEmail(userDetails.getUsername());
        RoadmapDto updated = roadmapService.toggleMilestoneProgress(id, user);
        return ResponseEntity.ok(ApiResponse.success("Milestone progress updated", updated));
    }

    @PutMapping("/progress")
    public ResponseEntity<ApiResponse<RoadmapDto>> updateProgress(
            @RequestParam Long milestoneId,
            @AuthenticationPrincipal UserDetails userDetails) {
        User user = userService.getUserByEmail(userDetails.getUsername());
        RoadmapDto updated = roadmapService.toggleMilestoneProgress(milestoneId, user);
        return ResponseEntity.ok(ApiResponse.success("Milestone progress updated", updated));
    }
}

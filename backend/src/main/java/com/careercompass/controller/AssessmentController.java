package com.careercompass.controller;

import com.careercompass.dto.ApiResponse;
import com.careercompass.dto.AssessmentRequest;
import com.careercompass.dto.JobRecommendationDto;
import com.careercompass.entity.User;
import com.careercompass.service.RecommendationService;
import com.careercompass.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assessment")
public class AssessmentController {

    private final RecommendationService recommendationService;
    private final UserService userService;

    public AssessmentController(RecommendationService recommendationService, UserService userService) {
        this.recommendationService = recommendationService;
        this.userService = userService;
    }

    @PostMapping("/submit")
    public ResponseEntity<ApiResponse<List<JobRecommendationDto>>> submitAssessment(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody AssessmentRequest request) {
        User user = userService.getUserByEmail(userDetails.getUsername());
        List<JobRecommendationDto> recommendations = recommendationService.analyzeAssessmentAndSave(user, request);
        return ResponseEntity.ok(ApiResponse.success("Assessment analyzed successfully", recommendations));
    }
}

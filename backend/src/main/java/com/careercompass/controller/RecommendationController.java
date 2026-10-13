package com.careercompass.controller;

import com.careercompass.dto.ApiResponse;
import com.careercompass.dto.AssessmentRequest;
import com.careercompass.dto.JobRecommendationDto;
import com.careercompass.dto.SkillGapDto;
import com.careercompass.entity.User;
import com.careercompass.service.RecommendationService;
import com.careercompass.service.SkillGapService;
import com.careercompass.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {

    private final RecommendationService recommendationService;
    private final SkillGapService skillGapService;
    private final UserService userService;

    public RecommendationController(RecommendationService recommendationService,
                                    SkillGapService skillGapService,
                                    UserService userService) {
        this.recommendationService = recommendationService;
        this.skillGapService = skillGapService;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<JobRecommendationDto>>> getRecommendations(
            @AuthenticationPrincipal UserDetails userDetails) {
        User user = userService.getUserByEmail(userDetails.getUsername());
        List<JobRecommendationDto> recs = recommendationService.generateRecommendationsForUser(user);
        return ResponseEntity.ok(ApiResponse.success(recs));
    }

    @PostMapping("/analyze")
    public ResponseEntity<ApiResponse<List<JobRecommendationDto>>> analyzeProfile(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody(required = false) AssessmentRequest request) {
        User user = userService.getUserByEmail(userDetails.getUsername());
        List<JobRecommendationDto> recs;
        if (request != null && ((request.getSkills() != null && !request.getSkills().isEmpty()) || request.getDesiredRole() != null)) {
            recs = recommendationService.analyzeAssessmentAndSave(user, request);
        } else {
            recs = recommendationService.generateRecommendationsForUser(user);
        }
        return ResponseEntity.ok(ApiResponse.success("Profile recommendations generated", recs));
    }

    @GetMapping("/skill-gap")
    public ResponseEntity<ApiResponse<SkillGapDto>> getSkillGap(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam(required = false) String targetRole) {
        User user = userService.getUserByEmail(userDetails.getUsername());
        SkillGapDto gapDto = skillGapService.analyzeSkillGap(user, targetRole);
        return ResponseEntity.ok(ApiResponse.success(gapDto));
    }
}

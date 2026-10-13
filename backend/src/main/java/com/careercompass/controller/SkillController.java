package com.careercompass.controller;

import com.careercompass.dto.ApiResponse;
import com.careercompass.entity.Skill;
import com.careercompass.service.SkillService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Skill>>> getSkills(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String category) {
        List<Skill> skills;
        if (category != null && !category.isBlank()) {
            skills = skillService.getSkillsByCategory(category);
        } else if (query != null && !query.isBlank()) {
            skills = skillService.searchSkills(query);
        } else {
            skills = skillService.getAllSkills();
        }
        return ResponseEntity.ok(ApiResponse.success(skills));
    }
}

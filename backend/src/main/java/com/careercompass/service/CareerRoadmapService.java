package com.careercompass.service;

import com.careercompass.dto.RoadmapDto;
import com.careercompass.entity.CareerRoadmap;
import com.careercompass.entity.RoadmapProgress;
import com.careercompass.entity.User;
import com.careercompass.exception.ResourceNotFoundException;
import com.careercompass.repository.CareerRoadmapRepository;
import com.careercompass.repository.RoadmapProgressRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class CareerRoadmapService {

    private final CareerRoadmapRepository roadmapRepository;
    private final RoadmapProgressRepository progressRepository;

    public CareerRoadmapService(CareerRoadmapRepository roadmapRepository,
                                RoadmapProgressRepository progressRepository) {
        this.roadmapRepository = roadmapRepository;
        this.progressRepository = progressRepository;
    }

    public List<String> getAvailableCareerRoles() {
        return roadmapRepository.findDistinctCareerRoles();
    }

    @Transactional(readOnly = true)
    public List<RoadmapDto> getRoadmapForRole(String role, User user) {
        String targetRole = (role != null && !role.isBlank()) ? role : "Java Full Stack Developer";
        List<CareerRoadmap> milestones = roadmapRepository.findByCareerRoleOrderByStepOrderAsc(targetRole);

        if (milestones.isEmpty()) {
            milestones = roadmapRepository.findByCareerRoleOrderByStepOrderAsc("Java Full Stack Developer");
        }

        Map<Long, RoadmapProgress> progressMap = new HashMap<>();
        if (user != null) {
            List<RoadmapProgress> progressList = progressRepository.findByUser(user);
            for (RoadmapProgress rp : progressList) {
                progressMap.put(rp.getRoadmap().getId(), rp);
            }
        }

        List<RoadmapDto> dtos = new ArrayList<>();
        for (CareerRoadmap cr : milestones) {
            RoadmapDto dto = new RoadmapDto();
            dto.setId(cr.getId());
            dto.setCareerRole(cr.getCareerRole());
            dto.setStepOrder(cr.getStepOrder());
            dto.setMilestoneTitle(cr.getMilestoneTitle());
            dto.setMilestoneDescription(cr.getMilestoneDescription());
            dto.setKeySkills(cr.getKeySkills());
            dto.setEstimatedDuration(cr.getEstimatedDuration());
            dto.setLearningResources(cr.getLearningResources());

            RoadmapProgress progress = progressMap.get(cr.getId());
            if (progress != null && Boolean.TRUE.equals(progress.getIsCompleted())) {
                dto.setIsCompleted(true);
                dto.setCompletedAt(progress.getCompletedAt());
            } else {
                dto.setIsCompleted(false);
            }

            dtos.add(dto);
        }

        return dtos;
    }

    @Transactional
    public RoadmapDto toggleMilestoneProgress(Long milestoneId, User user) {
        CareerRoadmap roadmap = roadmapRepository.findById(milestoneId)
                .orElseThrow(() -> new ResourceNotFoundException("Milestone not found with id: " + milestoneId));

        RoadmapProgress progress = progressRepository.findByUserAndRoadmap(user, roadmap)
                .orElseGet(() -> new RoadmapProgress(user, roadmap, false));

        boolean newState = !Boolean.TRUE.equals(progress.getIsCompleted());
        progress.setIsCompleted(newState);
        progress.setCompletedAt(newState ? LocalDateTime.now() : null);

        RoadmapProgress saved = progressRepository.save(progress);

        RoadmapDto dto = new RoadmapDto();
        dto.setId(roadmap.getId());
        dto.setCareerRole(roadmap.getCareerRole());
        dto.setStepOrder(roadmap.getStepOrder());
        dto.setMilestoneTitle(roadmap.getMilestoneTitle());
        dto.setMilestoneDescription(roadmap.getMilestoneDescription());
        dto.setKeySkills(roadmap.getKeySkills());
        dto.setEstimatedDuration(roadmap.getEstimatedDuration());
        dto.setLearningResources(roadmap.getLearningResources());
        dto.setIsCompleted(saved.getIsCompleted());
        dto.setCompletedAt(saved.getCompletedAt());

        return dto;
    }
}

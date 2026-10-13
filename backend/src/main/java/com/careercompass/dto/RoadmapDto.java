package com.careercompass.dto;

import java.time.LocalDateTime;

public class RoadmapDto {
    private Long id;
    private String careerRole;
    private Integer stepOrder;
    private String milestoneTitle;
    private String milestoneDescription;
    private String keySkills;
    private String estimatedDuration;
    private String learningResources;
    private Boolean isCompleted = false;
    private LocalDateTime completedAt;

    public RoadmapDto() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCareerRole() { return careerRole; }
    public void setCareerRole(String careerRole) { this.careerRole = careerRole; }

    public Integer getStepOrder() { return stepOrder; }
    public void setStepOrder(Integer stepOrder) { this.stepOrder = stepOrder; }

    public String getMilestoneTitle() { return milestoneTitle; }
    public void setMilestoneTitle(String milestoneTitle) { this.milestoneTitle = milestoneTitle; }

    public String getMilestoneDescription() { return milestoneDescription; }
    public void setMilestoneDescription(String milestoneDescription) { this.milestoneDescription = milestoneDescription; }

    public String getKeySkills() { return keySkills; }
    public void setKeySkills(String keySkills) { this.keySkills = keySkills; }

    public String getEstimatedDuration() { return estimatedDuration; }
    public void setEstimatedDuration(String estimatedDuration) { this.estimatedDuration = estimatedDuration; }

    public String getLearningResources() { return learningResources; }
    public void setLearningResources(String learningResources) { this.learningResources = learningResources; }

    public Boolean getIsCompleted() { return isCompleted; }
    public void setIsCompleted(Boolean isCompleted) { this.isCompleted = isCompleted; }

    public LocalDateTime getCompletedAt() { return completedAt; }
    public void setCompletedAt(LocalDateTime completedAt) { this.completedAt = completedAt; }
}

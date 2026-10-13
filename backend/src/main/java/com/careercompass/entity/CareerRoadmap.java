package com.careercompass.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "career_roadmaps")
public class CareerRoadmap {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 120)
    private String careerRole;

    @Column(nullable = false)
    private Integer stepOrder;

    @Column(nullable = false, length = 150)
    private String milestoneTitle;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String milestoneDescription;

    @Column(length = 255)
    private String keySkills;

    @Column(length = 60)
    private String estimatedDuration;

    @Column(columnDefinition = "TEXT")
    private String learningResources;

    public CareerRoadmap() {}

    public CareerRoadmap(String careerRole, Integer stepOrder, String milestoneTitle, String milestoneDescription, String keySkills, String estimatedDuration, String learningResources) {
        this.careerRole = careerRole;
        this.stepOrder = stepOrder;
        this.milestoneTitle = milestoneTitle;
        this.milestoneDescription = milestoneDescription;
        this.keySkills = keySkills;
        this.estimatedDuration = estimatedDuration;
        this.learningResources = learningResources;
    }

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
}

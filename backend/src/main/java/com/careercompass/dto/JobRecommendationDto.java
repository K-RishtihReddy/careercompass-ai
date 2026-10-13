package com.careercompass.dto;

import java.util.ArrayList;
import java.util.List;

public class JobRecommendationDto {
    private Long jobId;
    private String title;
    private String company;
    private String location;
    private String jobType;
    private String experienceLevel;
    private String salaryRange;
    private String description;
    private String applyUrl;
    private Boolean isSample;
    private Boolean isSaved = false;

    // Recommendation Engine Metrics
    private int matchPercentage; // 0 - 100
    private List<String> requiredSkills = new ArrayList<>();
    private List<String> matchingSkills = new ArrayList<>();
    private List<String> missingSkills = new ArrayList<>();
    private String matchExplanation; // Human readable explanation of why this job matches
    private double skillScore; // Score from skills
    private double experienceScore; // Score from experience alignment
    private double interestScore; // Score from career interests alignment

    public JobRecommendationDto() {}

    public Long getJobId() { return jobId; }
    public void setJobId(Long jobId) { this.jobId = jobId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getJobType() { return jobType; }
    public void setJobType(String jobType) { this.jobType = jobType; }

    public String getExperienceLevel() { return experienceLevel; }
    public void setExperienceLevel(String experienceLevel) { this.experienceLevel = experienceLevel; }

    public String getSalaryRange() { return salaryRange; }
    public void setSalaryRange(String salaryRange) { this.salaryRange = salaryRange; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getApplyUrl() { return applyUrl; }
    public void setApplyUrl(String applyUrl) { this.applyUrl = applyUrl; }

    public Boolean getIsSample() { return isSample; }
    public void setIsSample(Boolean isSample) { this.isSample = isSample; }

    public Boolean getIsSaved() { return isSaved; }
    public void setIsSaved(Boolean isSaved) { this.isSaved = isSaved; }

    public int getMatchPercentage() { return matchPercentage; }
    public void setMatchPercentage(int matchPercentage) { this.matchPercentage = matchPercentage; }

    public List<String> getRequiredSkills() { return requiredSkills; }
    public void setRequiredSkills(List<String> requiredSkills) { this.requiredSkills = requiredSkills; }

    public List<String> getMatchingSkills() { return matchingSkills; }
    public void setMatchingSkills(List<String> matchingSkills) { this.matchingSkills = matchingSkills; }

    public List<String> getMissingSkills() { return missingSkills; }
    public void setMissingSkills(List<String> missingSkills) { this.missingSkills = missingSkills; }

    public String getMatchExplanation() { return matchExplanation; }
    public void setMatchExplanation(String matchExplanation) { this.matchExplanation = matchExplanation; }

    public double getSkillScore() { return skillScore; }
    public void setSkillScore(double skillScore) { this.skillScore = skillScore; }

    public double getExperienceScore() { return experienceScore; }
    public void setExperienceScore(double experienceScore) { this.experienceScore = experienceScore; }

    public double getInterestScore() { return interestScore; }
    public void setInterestScore(double interestScore) { this.interestScore = interestScore; }
}

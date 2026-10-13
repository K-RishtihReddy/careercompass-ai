package com.careercompass.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class JobDto {
    private Long id;
    private String title;
    private String company;
    private String location;
    private String jobType;
    private String experienceLevel;
    private String salaryRange;
    private String description;
    private String applyUrl;
    private Boolean isSample;
    private LocalDateTime createdAt;
    private List<JobSkillDto> requiredSkills = new ArrayList<>();
    private List<JobSkillDto> optionalSkills = new ArrayList<>();
    private Boolean isSaved = false;

    public static class JobSkillDto {
        private Long skillId;
        private String skillName;
        private String category;
        private Boolean isRequired;
        private Integer importanceWeight;

        public JobSkillDto() {}

        public JobSkillDto(Long skillId, String skillName, String category, Boolean isRequired, Integer importanceWeight) {
            this.skillId = skillId;
            this.skillName = skillName;
            this.category = category;
            this.isRequired = isRequired;
            this.importanceWeight = importanceWeight;
        }

        public Long getSkillId() { return skillId; }
        public void setSkillId(Long skillId) { this.skillId = skillId; }

        public String getSkillName() { return skillName; }
        public void setSkillName(String skillName) { this.skillName = skillName; }

        public String getCategory() { return category; }
        public void setCategory(String category) { this.category = category; }

        public Boolean getIsRequired() { return isRequired; }
        public void setIsRequired(Boolean isRequired) { this.isRequired = isRequired; }

        public Integer getImportanceWeight() { return importanceWeight; }
        public void setImportanceWeight(Integer importanceWeight) { this.importanceWeight = importanceWeight; }
    }

    public JobDto() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

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

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public List<JobSkillDto> getRequiredSkills() { return requiredSkills; }
    public void setRequiredSkills(List<JobSkillDto> requiredSkills) { this.requiredSkills = requiredSkills; }

    public List<JobSkillDto> getOptionalSkills() { return optionalSkills; }
    public void setOptionalSkills(List<JobSkillDto> optionalSkills) { this.optionalSkills = optionalSkills; }

    public Boolean getIsSaved() { return isSaved; }
    public void setIsSaved(Boolean isSaved) { this.isSaved = isSaved; }
}

package com.careercompass.dto;

import jakarta.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

public class CreateJobRequest {

    @NotBlank(message = "Job title is required")
    private String title;

    @NotBlank(message = "Company name is required")
    private String company;

    @NotBlank(message = "Location is required")
    private String location;

    @NotBlank(message = "Job type is required")
    private String jobType = "Full-Time";

    @NotBlank(message = "Experience level is required")
    private String experienceLevel = "Fresher";

    private String salaryRange;

    @NotBlank(message = "Job description is required")
    private String description;

    private String applyUrl;
    private Boolean isSample = true;

    private List<String> requiredSkillNames = new ArrayList<>();
    private List<String> optionalSkillNames = new ArrayList<>();

    public CreateJobRequest() {}

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

    public List<String> getRequiredSkillNames() { return requiredSkillNames; }
    public void setRequiredSkillNames(List<String> requiredSkillNames) { this.requiredSkillNames = requiredSkillNames; }

    public List<String> getOptionalSkillNames() { return optionalSkillNames; }
    public void setOptionalSkillNames(List<String> optionalSkillNames) { this.optionalSkillNames = optionalSkillNames; }
}

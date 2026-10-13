package com.careercompass.dto;

import java.util.List;

public class UserProfileDto {
    private Long id;
    private String fullName;
    private String email;
    private String role;
    private String educationLevel;
    private String degree;
    private Integer graduationYear;
    private String experienceLevel;
    private String preferredLocation;
    private String desiredRole;
    private String careerGoals;
    private Boolean profileCompleted;
    private int completionPercentage;
    private List<UserSkillDto> skills;
    private List<String> interests;
    private long savedJobsCount;

    public UserProfileDto() {}

    public static class UserSkillDto {
        private Long skillId;
        private String skillName;
        private String category;
        private String proficiency;

        public UserSkillDto() {}

        public UserSkillDto(Long skillId, String skillName, String category, String proficiency) {
            this.skillId = skillId;
            this.skillName = skillName;
            this.category = category;
            this.proficiency = proficiency;
        }

        public Long getSkillId() { return skillId; }
        public void setSkillId(Long skillId) { this.skillId = skillId; }

        public String getSkillName() { return skillName; }
        public void setSkillName(String skillName) { this.skillName = skillName; }

        public String getCategory() { return category; }
        public void setCategory(String category) { this.category = category; }

        public String getProficiency() { return proficiency; }
        public void setProficiency(String proficiency) { this.proficiency = proficiency; }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getEducationLevel() { return educationLevel; }
    public void setEducationLevel(String educationLevel) { this.educationLevel = educationLevel; }

    public String getDegree() { return degree; }
    public void setDegree(String degree) { this.degree = degree; }

    public Integer getGraduationYear() { return graduationYear; }
    public void setGraduationYear(Integer graduationYear) { this.graduationYear = graduationYear; }

    public String getExperienceLevel() { return experienceLevel; }
    public void setExperienceLevel(String experienceLevel) { this.experienceLevel = experienceLevel; }

    public String getPreferredLocation() { return preferredLocation; }
    public void setPreferredLocation(String preferredLocation) { this.preferredLocation = preferredLocation; }

    public String getDesiredRole() { return desiredRole; }
    public void setDesiredRole(String desiredRole) { this.desiredRole = desiredRole; }

    public String getCareerGoals() { return careerGoals; }
    public void setCareerGoals(String careerGoals) { this.careerGoals = careerGoals; }

    public Boolean getProfileCompleted() { return profileCompleted; }
    public void setProfileCompleted(Boolean profileCompleted) { this.profileCompleted = profileCompleted; }

    public int getCompletionPercentage() { return completionPercentage; }
    public void setCompletionPercentage(int completionPercentage) { this.completionPercentage = completionPercentage; }

    public List<UserSkillDto> getSkills() { return skills; }
    public void setSkills(List<UserSkillDto> skills) { this.skills = skills; }

    public List<String> getInterests() { return interests; }
    public void setInterests(List<String> interests) { this.interests = interests; }

    public long getSavedJobsCount() { return savedJobsCount; }
    public void setSavedJobsCount(long savedJobsCount) { this.savedJobsCount = savedJobsCount; }
}

package com.careercompass.dto;

import java.util.ArrayList;
import java.util.List;

public class AssessmentRequest {

    public static class SkillInput {
        private String name;
        private String proficiency = "INTERMEDIATE"; // BEGINNER, INTERMEDIATE, ADVANCED, EXPERT

        public SkillInput() {}

        public SkillInput(String name, String proficiency) {
            this.name = name;
            this.proficiency = proficiency;
        }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public String getProficiency() { return proficiency; }
        public void setProficiency(String proficiency) { this.proficiency = proficiency; }
    }

    private List<SkillInput> skills = new ArrayList<>();
    private List<String> softSkills = new ArrayList<>();
    private List<String> interests = new ArrayList<>();
    private String educationLevel;
    private String degree;
    private String experienceLevel;
    private String preferredLocation;
    private String desiredRole;
    private String careerGoals;

    public AssessmentRequest() {}

    public List<SkillInput> getSkills() { return skills; }
    public void setSkills(List<SkillInput> skills) { this.skills = skills; }

    public List<String> getSoftSkills() { return softSkills; }
    public void setSoftSkills(List<String> softSkills) { this.softSkills = softSkills; }

    public List<String> getInterests() { return interests; }
    public void setInterests(List<String> interests) { this.interests = interests; }

    public String getEducationLevel() { return educationLevel; }
    public void setEducationLevel(String educationLevel) { this.educationLevel = educationLevel; }

    public String getDegree() { return degree; }
    public void setDegree(String degree) { this.degree = degree; }

    public String getExperienceLevel() { return experienceLevel; }
    public void setExperienceLevel(String experienceLevel) { this.experienceLevel = experienceLevel; }

    public String getPreferredLocation() { return preferredLocation; }
    public void setPreferredLocation(String preferredLocation) { this.preferredLocation = preferredLocation; }

    public String getDesiredRole() { return desiredRole; }
    public void setDesiredRole(String desiredRole) { this.desiredRole = desiredRole; }

    public String getCareerGoals() { return careerGoals; }
    public void setCareerGoals(String careerGoals) { this.careerGoals = careerGoals; }
}

package com.careercompass.dto;

import java.util.ArrayList;
import java.util.List;

public class SkillGapDto {
    private String targetRole;
    private int matchPercentage;
    private List<UserSkillSummary> alreadyHaveSkills = new ArrayList<>();
    private List<MissingSkillItem> skillsToImprove = new ArrayList<>();
    private List<LearningRecommendation> recommendedLearningTopics = new ArrayList<>();

    public static class UserSkillSummary {
        private String skillName;
        private String proficiency;
        private String category;

        public UserSkillSummary() {}

        public UserSkillSummary(String skillName, String proficiency, String category) {
            this.skillName = skillName;
            this.proficiency = proficiency;
            this.category = category;
        }

        public String getSkillName() { return skillName; }
        public void setSkillName(String skillName) { this.skillName = skillName; }

        public String getProficiency() { return proficiency; }
        public void setProficiency(String proficiency) { this.proficiency = proficiency; }

        public String getCategory() { return category; }
        public void setCategory(String category) { this.category = category; }
    }

    public static class MissingSkillItem {
        private String skillName;
        private String priority; // HIGH, MEDIUM, LOW
        private String category;
        private String importanceReason;
        private Boolean learned = false;

        public MissingSkillItem() {}

        public MissingSkillItem(String skillName, String priority, String category, String importanceReason) {
            this.skillName = skillName;
            this.priority = priority;
            this.category = category;
            this.importanceReason = importanceReason;
            this.learned = false;
        }

        public String getSkillName() { return skillName; }
        public void setSkillName(String skillName) { this.skillName = skillName; }

        public String getPriority() { return priority; }
        public void setPriority(String priority) { this.priority = priority; }

        public String getCategory() { return category; }
        public void setCategory(String category) { this.category = category; }

        public String getImportanceReason() { return importanceReason; }
        public void setImportanceReason(String importanceReason) { this.importanceReason = importanceReason; }

        public Boolean getLearned() { return learned; }
        public void setLearned(Boolean learned) { this.learned = learned; }
    }

    public static class LearningRecommendation {
        private String topic;
        private String resourceType; // Video, Documentation, Practice
        private String resourceTitle;
        private String resourceUrl;
        private String estimatedTime;

        public LearningRecommendation() {}

        public LearningRecommendation(String topic, String resourceType, String resourceTitle, String resourceUrl, String estimatedTime) {
            this.topic = topic;
            this.resourceType = resourceType;
            this.resourceTitle = resourceTitle;
            this.resourceUrl = resourceUrl;
            this.estimatedTime = estimatedTime;
        }

        public String getTopic() { return topic; }
        public void setTopic(String topic) { this.topic = topic; }

        public String getResourceType() { return resourceType; }
        public void setResourceType(String resourceType) { this.resourceType = resourceType; }

        public String getResourceTitle() { return resourceTitle; }
        public void setResourceTitle(String resourceTitle) { this.resourceTitle = resourceTitle; }

        public String getResourceUrl() { return resourceUrl; }
        public void setResourceUrl(String resourceUrl) { this.resourceUrl = resourceUrl; }

        public String getEstimatedTime() { return estimatedTime; }
        public void setEstimatedTime(String estimatedTime) { this.estimatedTime = estimatedTime; }
    }

    public SkillGapDto() {}

    public String getTargetRole() { return targetRole; }
    public void setTargetRole(String targetRole) { this.targetRole = targetRole; }

    public int getMatchPercentage() { return matchPercentage; }
    public void setMatchPercentage(int matchPercentage) { this.matchPercentage = matchPercentage; }

    public List<UserSkillSummary> getAlreadyHaveSkills() { return alreadyHaveSkills; }
    public void setAlreadyHaveSkills(List<UserSkillSummary> alreadyHaveSkills) { this.alreadyHaveSkills = alreadyHaveSkills; }

    public List<MissingSkillItem> getSkillsToImprove() { return skillsToImprove; }
    public void setSkillsToImprove(List<MissingSkillItem> skillsToImprove) { this.skillsToImprove = skillsToImprove; }

    public List<LearningRecommendation> getRecommendedLearningTopics() { return recommendedLearningTopics; }
    public void setRecommendedLearningTopics(List<LearningRecommendation> recommendedLearningTopics) { this.recommendedLearningTopics = recommendedLearningTopics; }
}

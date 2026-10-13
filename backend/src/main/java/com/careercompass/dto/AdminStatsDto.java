package com.careercompass.dto;

public class AdminStatsDto {
    private long totalUsers;
    private long totalJobs;
    private long totalSkills;
    private long totalRoadmapMilestones;
    private long completedAssessments;

    public AdminStatsDto() {}

    public AdminStatsDto(long totalUsers, long totalJobs, long totalSkills, long totalRoadmapMilestones, long completedAssessments) {
        this.totalUsers = totalUsers;
        this.totalJobs = totalJobs;
        this.totalSkills = totalSkills;
        this.totalRoadmapMilestones = totalRoadmapMilestones;
        this.completedAssessments = completedAssessments;
    }

    public long getTotalUsers() { return totalUsers; }
    public void setTotalUsers(long totalUsers) { this.totalUsers = totalUsers; }

    public long getTotalJobs() { return totalJobs; }
    public void setTotalJobs(long totalJobs) { this.totalJobs = totalJobs; }

    public long getTotalSkills() { return totalSkills; }
    public void setTotalSkills(long totalSkills) { this.totalSkills = totalSkills; }

    public long getTotalRoadmapMilestones() { return totalRoadmapMilestones; }
    public void setTotalRoadmapMilestones(long totalRoadmapMilestones) { this.totalRoadmapMilestones = totalRoadmapMilestones; }

    public long getCompletedAssessments() { return completedAssessments; }
    public void setCompletedAssessments(long completedAssessments) { this.completedAssessments = completedAssessments; }
}

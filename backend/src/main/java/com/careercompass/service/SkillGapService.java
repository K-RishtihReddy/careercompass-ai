package com.careercompass.service;

import com.careercompass.dto.SkillGapDto;
import com.careercompass.entity.*;
import com.careercompass.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class SkillGapService {

    private final JobRepository jobRepository;
    private final JobSkillRepository jobSkillRepository;
    private final UserSkillRepository userSkillRepository;
    private final SkillRepository skillRepository;

    public SkillGapService(JobRepository jobRepository,
                           JobSkillRepository jobSkillRepository,
                           UserSkillRepository userSkillRepository,
                           SkillRepository skillRepository) {
        this.jobRepository = jobRepository;
        this.jobSkillRepository = jobSkillRepository;
        this.userSkillRepository = userSkillRepository;
        this.skillRepository = skillRepository;
    }

    @Transactional(readOnly = true)
    public SkillGapDto analyzeSkillGap(User user, String targetRole) {
        String roleToAnalyze = (targetRole != null && !targetRole.isBlank())
                ? targetRole.trim()
                : (user.getDesiredRole() != null && !user.getDesiredRole().isBlank() ? user.getDesiredRole() : "Java Full Stack Developer");

        List<Job> matchedJobs = jobRepository.findByTitleContainingIgnoreCase(roleToAnalyze);
        if (matchedJobs.isEmpty()) {
            matchedJobs = jobRepository.findAll();
        }

        // Aggregate required skills across jobs representing the target role
        Map<Long, SkillRequirementAggregate> skillAggregates = new HashMap<>();

        for (Job job : matchedJobs) {
            List<JobSkill> jobSkills = jobSkillRepository.findByJob(job);
            for (JobSkill js : jobSkills) {
                Long skillId = js.getSkill().getId();
                SkillRequirementAggregate agg = skillAggregates.computeIfAbsent(
                        skillId,
                        k -> new SkillRequirementAggregate(js.getSkill())
                );
                agg.totalOccurrences++;
                if (Boolean.TRUE.equals(js.getIsRequired())) {
                    agg.requiredCount++;
                }
                agg.maxWeight = Math.max(agg.maxWeight, js.getImportanceWeight() != null ? js.getImportanceWeight() : 5);
            }
        }

        // User's acquired skills
        List<UserSkill> userSkills = userSkillRepository.findByUser(user);
        Map<Long, UserSkill> userSkillMap = userSkills.stream()
                .collect(Collectors.toMap(us -> us.getSkill().getId(), us -> us));

        List<SkillGapDto.UserSkillSummary> alreadyHave = new ArrayList<>();
        List<SkillGapDto.MissingSkillItem> toImprove = new ArrayList<>();

        for (SkillRequirementAggregate agg : skillAggregates.values()) {
            Skill skill = agg.skill;
            if (userSkillMap.containsKey(skill.getId())) {
                UserSkill us = userSkillMap.get(skill.getId());
                alreadyHave.add(new SkillGapDto.UserSkillSummary(
                        skill.getName(),
                        us.getProficiency(),
                        skill.getCategory()
                ));
            } else {
                // Determine priority
                String priority;
                String importanceReason;

                if (agg.requiredCount > 0 && agg.maxWeight >= 9) {
                    priority = "HIGH";
                    importanceReason = "Essential requirement for senior and junior engineering positions.";
                } else if (agg.requiredCount > 0) {
                    priority = "MEDIUM";
                    importanceReason = "Frequently expected core competency in modern enterprise job descriptions.";
                } else {
                    priority = "LOW";
                    importanceReason = "Valuable secondary skill that accelerates full-stack problem resolution.";
                }

                toImprove.add(new SkillGapDto.MissingSkillItem(
                        skill.getName(),
                        priority,
                        skill.getCategory(),
                        importanceReason
                ));
            }
        }

        // Sort toImprove by Priority: HIGH, MEDIUM, LOW
        toImprove.sort((a, b) -> {
            int pA = a.getPriority().equals("HIGH") ? 0 : a.getPriority().equals("MEDIUM") ? 1 : 2;
            int pB = b.getPriority().equals("HIGH") ? 0 : b.getPriority().equals("MEDIUM") ? 1 : 2;
            return Integer.compare(pA, pB);
        });

        // Curate learning recommendations
        List<SkillGapDto.LearningRecommendation> learningRecs = generateLearningRecommendations(toImprove);

        int totalSkillsInRole = alreadyHave.size() + toImprove.size();
        int matchPct = totalSkillsInRole > 0
                ? (int) Math.round(((double) alreadyHave.size() / totalSkillsInRole) * 100)
                : 0;

        SkillGapDto dto = new SkillGapDto();
        dto.setTargetRole(roleToAnalyze);
        dto.setMatchPercentage(matchPct);
        dto.setAlreadyHaveSkills(alreadyHave);
        dto.setSkillsToImprove(toImprove);
        dto.setRecommendedLearningTopics(learningRecs);

        return dto;
    }

    private List<SkillGapDto.LearningRecommendation> generateLearningRecommendations(List<SkillGapDto.MissingSkillItem> missing) {
        List<SkillGapDto.LearningRecommendation> recs = new ArrayList<>();

        for (SkillGapDto.MissingSkillItem item : missing) {
            String name = item.getSkillName().toLowerCase();

            if (name.contains("spring boot")) {
                recs.add(new SkillGapDto.LearningRecommendation(
                        "Spring Boot Microservices & Security",
                        "Tutorial & Docs",
                        "Building Enterprise REST APIs with Spring Boot 3",
                        "https://spring.io/guides",
                        "15 Hours"
                ));
            } else if (name.contains("rest api")) {
                recs.add(new SkillGapDto.LearningRecommendation(
                        "RESTful API Design & Best Practices",
                        "Interactive Guide",
                        "REST Architecture, HTTP Status Codes & Swagger/OpenAPI",
                        "https://restfulapi.net/",
                        "6 Hours"
                ));
            } else if (name.contains("git")) {
                recs.add(new SkillGapDto.LearningRecommendation(
                        "Version Control with Git & GitHub",
                        "Hands-on Lab",
                        "Branching, Merge Requests, Rebase & Collaboration",
                        "https://git-scm.com/book/en/v2",
                        "5 Hours"
                ));
            } else if (name.contains("docker")) {
                recs.add(new SkillGapDto.LearningRecommendation(
                        "Docker Containerization Fundamentals",
                        "Interactive Lab",
                        "Containerizing Java & React Applications with Multi-Stage Builds",
                        "https://docs.docker.com/get-started/",
                        "8 Hours"
                ));
            } else if (name.contains("react")) {
                recs.add(new SkillGapDto.LearningRecommendation(
                        "Modern React & Component Architecture",
                        "Official Docs",
                        "React Hooks, State Management & Axios Integrations",
                        "https://react.dev",
                        "12 Hours"
                ));
            } else if (name.contains("mysql") || name.contains("sql")) {
                recs.add(new SkillGapDto.LearningRecommendation(
                        "Relational Database Modeling & Indexing",
                        "Practice Problems",
                        "Advanced SQL Queries, Normalization & Query Tuning",
                        "https://www.mysqltutorial.org/",
                        "10 Hours"
                ));
            } else if (name.contains("python")) {
                recs.add(new SkillGapDto.LearningRecommendation(
                        "Python Data Engineering & Scripting",
                        "Documentation",
                        "Python 3 Core Language, Virtual Environments & Standard Lib",
                        "https://docs.python.org/3/tutorial/",
                        "10 Hours"
                ));
            }
        }

        // Fallback default recommendation if empty
        if (recs.isEmpty()) {
            recs.add(new SkillGapDto.LearningRecommendation(
                    "Algorithmic Problem Solving & System Architecture",
                    "Practice Track",
                    "Data Structures, Design Patterns & Clean Code",
                    "https://neetcode.io",
                    "20 Hours"
            ));
        }

        return recs;
    }

    private static class SkillRequirementAggregate {
        Skill skill;
        int totalOccurrences = 0;
        int requiredCount = 0;
        int maxWeight = 5;

        SkillRequirementAggregate(Skill skill) {
            this.skill = skill;
        }
    }
}

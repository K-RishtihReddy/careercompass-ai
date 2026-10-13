package com.careercompass.service;

import com.careercompass.dto.AssessmentRequest;
import com.careercompass.dto.JobRecommendationDto;
import com.careercompass.entity.*;
import com.careercompass.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class RecommendationService {

    private final JobRepository jobRepository;
    private final JobSkillRepository jobSkillRepository;
    private final UserSkillRepository userSkillRepository;
    private final CareerInterestRepository careerInterestRepository;
    private final SavedJobRepository savedJobRepository;
    private final UserRepository userRepository;
    private final SkillService skillService;

    public RecommendationService(JobRepository jobRepository,
                                 JobSkillRepository jobSkillRepository,
                                 UserSkillRepository userSkillRepository,
                                 CareerInterestRepository careerInterestRepository,
                                 SavedJobRepository savedJobRepository,
                                 UserRepository userRepository,
                                 SkillService skillService) {
        this.jobRepository = jobRepository;
        this.jobSkillRepository = jobSkillRepository;
        this.userSkillRepository = userSkillRepository;
        this.careerInterestRepository = careerInterestRepository;
        this.savedJobRepository = savedJobRepository;
        this.userRepository = userRepository;
        this.skillService = skillService;
    }

    @Transactional(readOnly = true)
    public List<JobRecommendationDto> generateRecommendationsForUser(User user) {
        List<UserSkill> userSkills = userSkillRepository.findByUser(user);
        List<CareerInterest> interests = careerInterestRepository.findByUser(user);
        Set<Long> savedJobIds = savedJobRepository.findByUser(user).stream()
                .map(sj -> sj.getJob().getId())
                .collect(Collectors.toSet());

        return calculateRecommendations(userSkills, interests, user.getExperienceLevel(), user.getDesiredRole(), savedJobIds);
    }

    @Transactional
    public List<JobRecommendationDto> analyzeAssessmentAndSave(User user, AssessmentRequest request) {
        // 1. Update user profile details
        if (request.getEducationLevel() != null) user.setEducationLevel(request.getEducationLevel());
        if (request.getDegree() != null) user.setDegree(request.getDegree());
        if (request.getExperienceLevel() != null) user.setExperienceLevel(request.getExperienceLevel());
        if (request.getPreferredLocation() != null) user.setPreferredLocation(request.getPreferredLocation());
        if (request.getDesiredRole() != null) user.setDesiredRole(request.getDesiredRole());
        if (request.getCareerGoals() != null) user.setCareerGoals(request.getCareerGoals());
        user.setProfileCompleted(true);
        userRepository.save(user);

        // 2. Clear old user skills and re-populate
        userSkillRepository.deleteByUser(user);
        List<UserSkill> newUserSkills = new ArrayList<>();

        // Add technical skills
        if (request.getSkills() != null) {
            for (AssessmentRequest.SkillInput input : request.getSkills()) {
                if (input.getName() != null && !input.getName().isBlank()) {
                    Skill skill = skillService.findOrCreateSkill(input.getName(), "TECHNICAL");
                    String prof = (input.getProficiency() != null && !input.getProficiency().isBlank())
                            ? input.getProficiency().toUpperCase() : "INTERMEDIATE";
                    newUserSkills.add(new UserSkill(user, skill, prof));
                }
            }
        }

        // Add soft skills
        if (request.getSoftSkills() != null) {
            for (String softSkillName : request.getSoftSkills()) {
                if (softSkillName != null && !softSkillName.isBlank()) {
                    Skill skill = skillService.findOrCreateSkill(softSkillName, "SOFT");
                    newUserSkills.add(new UserSkill(user, skill, "ADVANCED"));
                }
            }
        }

        userSkillRepository.saveAll(newUserSkills);

        // 3. Clear old interests and re-populate
        careerInterestRepository.deleteByUser(user);
        List<CareerInterest> newInterests = new ArrayList<>();
        if (request.getInterests() != null) {
            for (String interest : request.getInterests()) {
                if (interest != null && !interest.isBlank()) {
                    newInterests.add(new CareerInterest(user, interest.trim()));
                }
            }
        }
        careerInterestRepository.saveAll(newInterests);

        Set<Long> savedJobIds = savedJobRepository.findByUser(user).stream()
                .map(sj -> sj.getJob().getId())
                .collect(Collectors.toSet());

        return calculateRecommendations(newUserSkills, newInterests, user.getExperienceLevel(), user.getDesiredRole(), savedJobIds);
    }

    private List<JobRecommendationDto> calculateRecommendations(
            List<UserSkill> userSkills,
            List<CareerInterest> userInterests,
            String experienceLevel,
            String desiredRole,
            Set<Long> savedJobIds) {

        // Build User Skill Map (Skill Name lowercase -> Proficiency Level)
        Map<String, String> userSkillMap = new HashMap<>();
        for (UserSkill us : userSkills) {
            userSkillMap.put(us.getSkill().getName().trim().toLowerCase(), us.getProficiency());
        }

        Set<String> interestsLower = (userInterests != null)
                ? userInterests.stream().map(ci -> ci.getInterest().trim().toLowerCase()).collect(Collectors.toSet())
                : Collections.emptySet();

        String desiredRoleLower = (desiredRole != null) ? desiredRole.trim().toLowerCase() : "";
        String userExpLower = (experienceLevel != null) ? experienceLevel.trim().toLowerCase() : "fresher";

        List<Job> allJobs = jobRepository.findAll();
        List<JobRecommendationDto> recommendations = new ArrayList<>();

        for (Job job : allJobs) {
            List<JobSkill> jobSkills = jobSkillRepository.findByJob(job);
            if (jobSkills.isEmpty()) {
                continue;
            }

            List<String> matchingSkills = new ArrayList<>();
            List<String> missingSkills = new ArrayList<>();
            List<String> allRequiredSkillNames = new ArrayList<>();

            double totalRequiredWeight = 0;
            double matchedRequiredWeight = 0;
            double optionalBonus = 0;

            for (JobSkill js : jobSkills) {
                String skillName = js.getSkill().getName().trim();
                String skillNameLower = skillName.toLowerCase();
                boolean isReq = Boolean.TRUE.equals(js.getIsRequired());
                int weight = js.getImportanceWeight() != null ? js.getImportanceWeight() : 10;

                if (isReq) {
                    allRequiredSkillNames.add(skillName);
                    totalRequiredWeight += weight;
                }

                if (userSkillMap.containsKey(skillNameLower)) {
                    matchingSkills.add(skillName);
                    String prof = userSkillMap.get(skillNameLower);
                    double profMultiplier = getProficiencyMultiplier(prof);

                    if (isReq) {
                        matchedRequiredWeight += (weight * profMultiplier);
                    } else {
                        optionalBonus += 2.0; // Bonus points for optional skill
                    }
                } else {
                    if (isReq) {
                        missingSkills.add(skillName);
                    }
                }
            }

            // 1. Skill Score (Max 70 points)
            double skillScore = 0;
            if (totalRequiredWeight > 0) {
                double rawSkillRatio = matchedRequiredWeight / totalRequiredWeight;
                skillScore = Math.min(70.0, (rawSkillRatio * 65.0) + Math.min(5.0, optionalBonus));
            } else {
                skillScore = 35.0;
            }

            // 2. Experience Level Alignment (Max 15 points)
            double experienceScore = calculateExperienceScore(userExpLower, job.getExperienceLevel());

            // 3. Desired Role and Interests Alignment (Max 15 points)
            double interestScore = calculateInterestScore(job.getTitle(), job.getDescription(), desiredRoleLower, interestsLower);

            // Total Score (0 - 100)
            double totalScore = skillScore + experienceScore + interestScore;
            int finalPercentage = (int) Math.round(Math.min(100.0, Math.max(0.0, totalScore)));

            // Generate detailed explanation
            String explanation = buildExplanation(
                    job, matchingSkills, missingSkills, allRequiredSkillNames.size(),
                    experienceScore >= 10, interestScore >= 8);

            JobRecommendationDto dto = new JobRecommendationDto();
            dto.setJobId(job.getId());
            dto.setTitle(job.getTitle());
            dto.setCompany(job.getCompany());
            dto.setLocation(job.getLocation());
            dto.setJobType(job.getJobType());
            dto.setExperienceLevel(job.getExperienceLevel());
            dto.setSalaryRange(job.getSalaryRange());
            dto.setDescription(job.getDescription());
            dto.setApplyUrl(job.getApplyUrl());
            dto.setIsSample(job.getIsSample());
            dto.setIsSaved(savedJobIds.contains(job.getId()));
            dto.setMatchPercentage(finalPercentage);
            dto.setRequiredSkills(allRequiredSkillNames);
            dto.setMatchingSkills(matchingSkills);
            dto.setMissingSkills(missingSkills);
            dto.setMatchExplanation(explanation);
            dto.setSkillScore(Math.round(skillScore * 10.0) / 10.0);
            dto.setExperienceScore(experienceScore);
            dto.setInterestScore(interestScore);

            recommendations.add(dto);
        }

        // Sort by match percentage descending
        recommendations.sort(Comparator.comparingInt(JobRecommendationDto::getMatchPercentage).reversed());
        return recommendations;
    }

    private double getProficiencyMultiplier(String proficiency) {
        if (proficiency == null) return 1.0;
        return switch (proficiency.toUpperCase()) {
            case "EXPERT" -> 1.05;
            case "ADVANCED" -> 1.0;
            case "INTERMEDIATE" -> 0.90;
            case "BEGINNER" -> 0.75;
            default -> 0.85;
        };
    }

    private double calculateExperienceScore(String userExp, String jobExp) {
        if (jobExp == null) return 10.0;
        String jobExpLower = jobExp.toLowerCase();

        if (userExp.contains("fresher") && jobExpLower.contains("fresher")) return 15.0;
        if (userExp.contains("junior") && (jobExpLower.contains("junior") || jobExpLower.contains("fresher"))) return 14.0;
        if (userExp.contains("fresher") && jobExpLower.contains("junior")) return 10.0;
        if (userExp.contains("intermediate") && (jobExpLower.contains("mid") || jobExpLower.contains("junior"))) return 15.0;
        if (userExp.contains("experienced") && (jobExpLower.contains("senior") || jobExpLower.contains("mid"))) return 15.0;

        return 8.0;
    }

    private double calculateInterestScore(String jobTitle, String jobDescription, String desiredRole, Set<String> interests) {
        double score = 0;
        String titleLower = jobTitle.toLowerCase();
        String descLower = jobDescription.toLowerCase();

        // Check if desired role matches
        if (!desiredRole.isBlank()) {
            String[] keywords = desiredRole.split("\\s+");
            for (String kw : keywords) {
                if (kw.length() > 2 && (titleLower.contains(kw) || descLower.contains(kw))) {
                    score += 8.0;
                    break;
                }
            }
        }

        // Check career interests
        for (String interest : interests) {
            if (interest.contains("full stack") && (titleLower.contains("full stack") || titleLower.contains("fullstack"))) score += 7.0;
            else if (interest.contains("backend") && (titleLower.contains("backend") || titleLower.contains("api") || titleLower.contains("spring"))) score += 7.0;
            else if (interest.contains("frontend") && (titleLower.contains("frontend") || titleLower.contains("react") || titleLower.contains("web"))) score += 7.0;
            else if (interest.contains("data") && (titleLower.contains("data") || titleLower.contains("analyst") || titleLower.contains("scientist"))) score += 7.0;
            else if (interest.contains("machine learning") && (titleLower.contains("machine learning") || titleLower.contains("ml") || titleLower.contains("ai"))) score += 7.0;
            else if (interest.contains("cloud") && (titleLower.contains("cloud") || titleLower.contains("devops") || titleLower.contains("aws"))) score += 7.0;
            else if (interest.contains("cybersecurity") && (titleLower.contains("cyber") || titleLower.contains("security"))) score += 7.0;
        }

        return Math.min(15.0, score);
    }

    private String buildExplanation(Job job, List<String> matching, List<String> missing, int totalReq, boolean expAligned, boolean interestAligned) {
        StringBuilder sb = new StringBuilder();
        int matchCount = matching.size();

        if (totalReq > 0) {
            sb.append(String.format("Matches %d of %d required technical competencies", matchCount, totalReq));
            if (!matching.isEmpty()) {
                sb.append(" (").append(String.join(", ", matching.subList(0, Math.min(3, matching.size())))).append(")");
            }
            sb.append(". ");
        }

        if (expAligned) {
            sb.append("Directly suits your ").append(job.getExperienceLevel()).append(" experience profile. ");
        }

        if (interestAligned) {
            sb.append("Aligns with your declared career aspirations and industry interests.");
        } else if (!missing.isEmpty()) {
            sb.append("Acquiring ").append(missing.get(0)).append(" will bridge the remaining profile gap.");
        }

        return sb.toString().trim();
    }
}

package com.careercompass.service;

import com.careercompass.dto.UserProfileDto;
import com.careercompass.entity.CareerInterest;
import com.careercompass.entity.User;
import com.careercompass.entity.UserSkill;
import com.careercompass.exception.ResourceNotFoundException;
import com.careercompass.repository.CareerInterestRepository;
import com.careercompass.repository.SavedJobRepository;
import com.careercompass.repository.UserRepository;
import com.careercompass.repository.UserSkillRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserSkillRepository userSkillRepository;
    private final CareerInterestRepository careerInterestRepository;
    private final SavedJobRepository savedJobRepository;

    public UserService(UserRepository userRepository,
                       UserSkillRepository userSkillRepository,
                       CareerInterestRepository careerInterestRepository,
                       SavedJobRepository savedJobRepository) {
        this.userRepository = userRepository;
        this.userSkillRepository = userSkillRepository;
        this.careerInterestRepository = careerInterestRepository;
        this.savedJobRepository = savedJobRepository;
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
    }

    @Transactional(readOnly = true)
    public UserProfileDto getCurrentUserProfile(String email) {
        User user = getUserByEmail(email);

        List<UserSkill> userSkills = userSkillRepository.findByUser(user);
        List<CareerInterest> interests = careerInterestRepository.findByUser(user);
        long savedJobsCount = savedJobRepository.countByUser(user);

        UserProfileDto dto = new UserProfileDto();
        dto.setId(user.getId());
        dto.setFullName(user.getFullName());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        dto.setEducationLevel(user.getEducationLevel());
        dto.setDegree(user.getDegree());
        dto.setGraduationYear(user.getGraduationYear());
        dto.setExperienceLevel(user.getExperienceLevel());
        dto.setPreferredLocation(user.getPreferredLocation());
        dto.setDesiredRole(user.getDesiredRole());
        dto.setCareerGoals(user.getCareerGoals());
        dto.setProfileCompleted(user.getProfileCompleted());
        dto.setSavedJobsCount(savedJobsCount);

        dto.setSkills(userSkills.stream().map(us -> new UserProfileDto.UserSkillDto(
                us.getSkill().getId(),
                us.getSkill().getName(),
                us.getSkill().getCategory(),
                us.getProficiency()
        )).collect(Collectors.toList()));

        dto.setInterests(interests.stream().map(CareerInterest::getInterest).collect(Collectors.toList()));

        dto.setCompletionPercentage(calculateCompletionPercentage(user, userSkills, interests));

        return dto;
    }

    @Transactional
    public UserProfileDto updateUserProfile(String email, UserProfileDto dto) {
        User user = getUserByEmail(email);

        if (dto.getFullName() != null && !dto.getFullName().isBlank()) {
            user.setFullName(dto.getFullName().trim());
        }
        if (dto.getEducationLevel() != null) user.setEducationLevel(dto.getEducationLevel());
        if (dto.getDegree() != null) user.setDegree(dto.getDegree());
        if (dto.getGraduationYear() != null) user.setGraduationYear(dto.getGraduationYear());
        if (dto.getExperienceLevel() != null) user.setExperienceLevel(dto.getExperienceLevel());
        if (dto.getPreferredLocation() != null) user.setPreferredLocation(dto.getPreferredLocation());
        if (dto.getDesiredRole() != null) user.setDesiredRole(dto.getDesiredRole());
        if (dto.getCareerGoals() != null) user.setCareerGoals(dto.getCareerGoals());

        List<UserSkill> userSkills = userSkillRepository.findByUser(user);
        List<CareerInterest> interests = careerInterestRepository.findByUser(user);

        int completion = calculateCompletionPercentage(user, userSkills, interests);
        user.setProfileCompleted(completion >= 70);

        userRepository.save(user);

        return getCurrentUserProfile(email);
    }

    public int calculateCompletionPercentage(User user, List<UserSkill> skills, List<CareerInterest> interests) {
        int score = 0;
        if (user.getFullName() != null && !user.getFullName().isBlank()) score += 15;
        if (user.getEmail() != null && !user.getEmail().isBlank()) score += 10;
        if (user.getEducationLevel() != null && !user.getEducationLevel().isBlank()) score += 15;
        if (user.getDegree() != null && !user.getDegree().isBlank()) score += 10;
        if (user.getExperienceLevel() != null && !user.getExperienceLevel().isBlank()) score += 10;
        if (user.getDesiredRole() != null && !user.getDesiredRole().isBlank()) score += 15;
        if (skills != null && !skills.isEmpty()) {
            score += Math.min(20, skills.size() * 4); // up to 20 pts for skills
        }
        if (interests != null && !interests.isEmpty()) score += 5;

        return Math.min(100, score);
    }
}

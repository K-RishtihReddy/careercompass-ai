package com.careercompass.config;

import com.careercompass.entity.CareerInterest;
import com.careercompass.entity.Skill;
import com.careercompass.entity.User;
import com.careercompass.entity.UserSkill;
import com.careercompass.repository.CareerInterestRepository;
import com.careercompass.repository.SkillRepository;
import com.careercompass.repository.UserRepository;
import com.careercompass.repository.UserSkillRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    private final UserRepository userRepository;
    private final SkillRepository skillRepository;
    private final UserSkillRepository userSkillRepository;
    private final CareerInterestRepository careerInterestRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository,
                           SkillRepository skillRepository,
                           UserSkillRepository userSkillRepository,
                           CareerInterestRepository careerInterestRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.skillRepository = skillRepository;
        this.userSkillRepository = userSkillRepository;
        this.careerInterestRepository = careerInterestRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        initAdminUser();
        initDemoStudent();
    }

    private void initAdminUser() {
        String adminEmail = "admin@careercompass.ai";
        if (!userRepository.existsByEmail(adminEmail)) {
            User admin = new User();
            admin.setFullName("Platform Administrator");
            admin.setEmail(adminEmail);
            admin.setPassword(passwordEncoder.encode("Admin@123"));
            admin.setRole("ROLE_ADMIN");
            admin.setEducationLevel("Master's");
            admin.setDegree("Computer Science & Engineering");
            admin.setGraduationYear(2022);
            admin.setExperienceLevel("Experienced");
            admin.setProfileCompleted(true);
            userRepository.save(admin);
            logger.info("Created default Administrator account: {}", adminEmail);
        }
    }

    private void initDemoStudent() {
        String studentEmail = "student@careercompass.ai";
        if (!userRepository.existsByEmail(studentEmail)) {
            User student = new User();
            student.setFullName("Alex Rivera");
            student.setEmail(studentEmail);
            student.setPassword(passwordEncoder.encode("Student@123"));
            student.setRole("ROLE_USER");
            student.setEducationLevel("Bachelor's");
            student.setDegree("B.Tech in Computer Science");
            student.setGraduationYear(2025);
            student.setExperienceLevel("Fresher");
            student.setPreferredLocation("Bangalore, India");
            student.setDesiredRole("Java Full Stack Developer");
            student.setCareerGoals("Aspiring to engineer robust microservices and interactive web architectures in high-growth tech teams.");
            student.setProfileCompleted(true);
            userRepository.save(student);

            // Seed user skills for demo student: Java, React, MySQL, Git, Problem Solving
            List<String[]> demoSkills = List.of(
                    new String[]{"Java", "ADVANCED"},
                    new String[]{"React", "INTERMEDIATE"},
                    new String[]{"MySQL", "INTERMEDIATE"},
                    new String[]{"Git", "INTERMEDIATE"},
                    new String[]{"Problem Solving", "ADVANCED"},
                    new String[]{"HTML", "EXPERT"},
                    new String[]{"CSS", "ADVANCED"},
                    new String[]{"JavaScript", "ADVANCED"}
            );

            for (String[] skillPair : demoSkills) {
                Optional<Skill> skillOpt = skillRepository.findByNameIgnoreCase(skillPair[0]);
                if (skillOpt.isPresent()) {
                    UserSkill userSkill = new UserSkill(student, skillOpt.get(), skillPair[1]);
                    userSkillRepository.save(userSkill);
                }
            }

            // Seed interests
            CareerInterest int1 = new CareerInterest(student, "Full Stack Development");
            CareerInterest int2 = new CareerInterest(student, "Backend Engineering");
            careerInterestRepository.saveAll(List.of(int1, int2));

            logger.info("Created default Demo Student account: {}", studentEmail);
        }
    }
}

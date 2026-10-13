package com.careercompass.service;

import com.careercompass.entity.Skill;
import com.careercompass.repository.SkillRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SkillService {

    private final SkillRepository skillRepository;

    public SkillService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    public List<Skill> searchSkills(String query) {
        if (query == null || query.isBlank()) {
            return skillRepository.findAll();
        }
        return skillRepository.findByNameContainingIgnoreCase(query.trim());
    }

    public List<Skill> getSkillsByCategory(String category) {
        return skillRepository.findByCategoryIgnoreCase(category);
    }

    @Transactional
    public Skill findOrCreateSkill(String name, String category) {
        String cleanName = name.trim();
        return skillRepository.findByNameIgnoreCase(cleanName)
                .orElseGet(() -> skillRepository.save(new Skill(cleanName, category != null ? category : "TECHNICAL", "code")));
    }
}

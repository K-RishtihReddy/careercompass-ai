package com.careercompass.service;

import com.careercompass.dto.CreateJobRequest;
import com.careercompass.dto.JobDto;
import com.careercompass.entity.Job;
import com.careercompass.entity.JobSkill;
import com.careercompass.entity.SavedJob;
import com.careercompass.entity.Skill;
import com.careercompass.entity.User;
import com.careercompass.exception.ResourceNotFoundException;
import com.careercompass.repository.JobRepository;
import com.careercompass.repository.JobSkillRepository;
import com.careercompass.repository.SavedJobRepository;
import com.careercompass.repository.SkillRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class JobService {

    private final JobRepository jobRepository;
    private final JobSkillRepository jobSkillRepository;
    private final SavedJobRepository savedJobRepository;
    private final SkillRepository skillRepository;

    public JobService(JobRepository jobRepository,
                      JobSkillRepository jobSkillRepository,
                      SavedJobRepository savedJobRepository,
                      SkillRepository skillRepository) {
        this.jobRepository = jobRepository;
        this.jobSkillRepository = jobSkillRepository;
        this.savedJobRepository = savedJobRepository;
        this.skillRepository = skillRepository;
    }

    @Transactional(readOnly = true)
    public List<JobDto> getAllJobs(String query, String location, String jobType, String experienceLevel, User currentUser) {
        List<Job> jobs;
        if ((query != null && !query.isBlank()) ||
            (location != null && !location.isBlank()) ||
            (jobType != null && !jobType.isBlank()) ||
            (experienceLevel != null && !experienceLevel.isBlank())) {
            jobs = jobRepository.searchJobs(
                    query != null && !query.isBlank() ? query : null,
                    location != null && !location.isBlank() ? location : null,
                    jobType != null && !jobType.isBlank() ? jobType : null,
                    experienceLevel != null && !experienceLevel.isBlank() ? experienceLevel : null
            );
        } else {
            jobs = jobRepository.findAll();
        }

        Set<Long> savedJobIds = currentUser != null
                ? savedJobRepository.findByUser(currentUser).stream().map(sj -> sj.getJob().getId()).collect(Collectors.toSet())
                : Set.of();

        return jobs.stream().map(job -> toJobDto(job, savedJobIds.contains(job.getId()))).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public JobDto getJobById(Long id, User currentUser) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + id));

        boolean isSaved = currentUser != null && savedJobRepository.existsByUserAndJob(currentUser, job);
        return toJobDto(job, isSaved);
    }

    @Transactional
    public boolean saveJob(Long jobId, User user) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + jobId));

        if (!savedJobRepository.existsByUserAndJob(user, job)) {
            savedJobRepository.save(new SavedJob(user, job));
            return true;
        }
        return false;
    }

    @Transactional
    public boolean unsaveJob(Long jobId, User user) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + jobId));

        Optional<SavedJob> savedJob = savedJobRepository.findByUserAndJob(user, job);
        if (savedJob.isPresent()) {
            savedJobRepository.delete(savedJob.get());
            return true;
        }
        return false;
    }

    @Transactional(readOnly = true)
    public List<JobDto> getSavedJobs(User user) {
        List<SavedJob> savedJobs = savedJobRepository.findByUser(user);
        return savedJobs.stream()
                .map(sj -> toJobDto(sj.getJob(), true))
                .collect(Collectors.toList());
    }

    @Transactional
    public JobDto createJob(CreateJobRequest request) {
        Job job = new Job();
        job.setTitle(request.getTitle().trim());
        job.setCompany(request.getCompany().trim());
        job.setLocation(request.getLocation().trim());
        job.setJobType(request.getJobType());
        job.setExperienceLevel(request.getExperienceLevel());
        job.setSalaryRange(request.getSalaryRange());
        job.setDescription(request.getDescription());
        job.setApplyUrl(request.getApplyUrl());
        job.setIsSample(request.getIsSample() != null ? request.getIsSample() : true);

        // Map required skills
        if (request.getRequiredSkillNames() != null) {
            for (String skillName : request.getRequiredSkillNames()) {
                Skill skill = getOrCreateSkill(skillName);
                job.getJobSkills().add(new JobSkill(job, skill, true, 10));
            }
        }

        // Map optional skills
        if (request.getOptionalSkillNames() != null) {
            for (String skillName : request.getOptionalSkillNames()) {
                Skill skill = getOrCreateSkill(skillName);
                job.getJobSkills().add(new JobSkill(job, skill, false, 5));
            }
        }

        Job savedJob = jobRepository.save(job);
        return toJobDto(savedJob, false);
    }

    @Transactional
    public JobDto updateJob(Long id, CreateJobRequest request) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + id));

        job.setTitle(request.getTitle().trim());
        job.setCompany(request.getCompany().trim());
        job.setLocation(request.getLocation().trim());
        job.setJobType(request.getJobType());
        job.setExperienceLevel(request.getExperienceLevel());
        job.setSalaryRange(request.getSalaryRange());
        job.setDescription(request.getDescription());
        job.setApplyUrl(request.getApplyUrl());
        if (request.getIsSample() != null) {
            job.setIsSample(request.getIsSample());
        }

        job.getJobSkills().clear();
        jobRepository.saveAndFlush(job);

        if (request.getRequiredSkillNames() != null) {
            for (String skillName : request.getRequiredSkillNames()) {
                Skill skill = getOrCreateSkill(skillName);
                job.getJobSkills().add(new JobSkill(job, skill, true, 10));
            }
        }

        if (request.getOptionalSkillNames() != null) {
            for (String skillName : request.getOptionalSkillNames()) {
                Skill skill = getOrCreateSkill(skillName);
                job.getJobSkills().add(new JobSkill(job, skill, false, 5));
            }
        }

        Job updated = jobRepository.save(job);
        return toJobDto(updated, false);
    }

    @Transactional
    public void deleteJob(Long id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + id));
        jobRepository.delete(job);
    }

    private Skill getOrCreateSkill(String name) {
        String cleanName = name.trim();
        return skillRepository.findByNameIgnoreCase(cleanName)
                .orElseGet(() -> skillRepository.save(new Skill(cleanName, "TECHNICAL", "code")));
    }

    public JobDto toJobDto(Job job, boolean isSaved) {
        JobDto dto = new JobDto();
        dto.setId(job.getId());
        dto.setTitle(job.getTitle());
        dto.setCompany(job.getCompany());
        dto.setLocation(job.getLocation());
        dto.setJobType(job.getJobType());
        dto.setExperienceLevel(job.getExperienceLevel());
        dto.setSalaryRange(job.getSalaryRange());
        dto.setDescription(job.getDescription());
        dto.setApplyUrl(job.getApplyUrl());
        dto.setIsSample(job.getIsSample());
        dto.setCreatedAt(job.getCreatedAt());
        dto.setIsSaved(isSaved);

        List<JobSkill> jobSkills = jobSkillRepository.findByJob(job);
        List<JobDto.JobSkillDto> req = new ArrayList<>();
        List<JobDto.JobSkillDto> opt = new ArrayList<>();

        for (JobSkill js : jobSkills) {
            JobDto.JobSkillDto skillDto = new JobDto.JobSkillDto(
                    js.getSkill().getId(),
                    js.getSkill().getName(),
                    js.getSkill().getCategory(),
                    js.getIsRequired(),
                    js.getImportanceWeight()
            );
            if (Boolean.TRUE.equals(js.getIsRequired())) {
                req.add(skillDto);
            } else {
                opt.add(skillDto);
            }
        }

        dto.setRequiredSkills(req);
        dto.setOptionalSkills(opt);
        return dto;
    }
}

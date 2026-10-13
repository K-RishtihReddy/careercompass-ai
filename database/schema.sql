-- =======================================================
-- CareerCompass AI - Database Schema & Initial Data
-- Database: careercompass_db
-- =======================================================

CREATE DATABASE IF NOT EXISTS careercompass_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE careercompass_db;

-- Drop tables in reverse order of foreign keys
DROP TABLE IF EXISTS roadmap_progress;
DROP TABLE IF EXISTS career_roadmaps;
DROP TABLE IF EXISTS saved_jobs;
DROP TABLE IF EXISTS job_skills;
DROP TABLE IF EXISTS jobs;
DROP TABLE IF EXISTS career_interests;
DROP TABLE IF EXISTS user_skills;
DROP TABLE IF EXISTS skills;
DROP TABLE IF EXISTS users;

-- 1. Users table
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(30) NOT NULL DEFAULT 'ROLE_USER',
    education_level VARCHAR(60),
    degree VARCHAR(120),
    graduation_year INT,
    experience_level VARCHAR(50) DEFAULT 'Fresher',
    preferred_location VARCHAR(100),
    desired_role VARCHAR(120),
    career_goals TEXT,
    profile_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. Master Skills table
CREATE TABLE skills (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(60) NOT NULL UNIQUE,
    category VARCHAR(40) NOT NULL, -- TECHNICAL, SOFT, DOMAIN
    icon VARCHAR(60) DEFAULT 'code'
) ENGINE=InnoDB;

-- 3. User Skills (Many-to-Many with proficiency)
CREATE TABLE user_skills (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    skill_id BIGINT NOT NULL,
    proficiency VARCHAR(30) DEFAULT 'INTERMEDIATE', -- BEGINNER, INTERMEDIATE, ADVANCED, EXPERT
    CONSTRAINT fk_user_skills_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_user_skills_skill FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE,
    CONSTRAINT uk_user_skill UNIQUE (user_id, skill_id)
) ENGINE=InnoDB;

-- 4. User Career Interests
CREATE TABLE career_interests (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    interest VARCHAR(100) NOT NULL,
    CONSTRAINT fk_user_interests_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT uk_user_interest UNIQUE (user_id, interest)
) ENGINE=InnoDB;

-- 5. Jobs table
CREATE TABLE jobs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    company VARCHAR(120) NOT NULL,
    location VARCHAR(100) NOT NULL,
    job_type VARCHAR(50) NOT NULL, -- Full-Time, Internship, Remote, Hybrid
    experience_level VARCHAR(50) NOT NULL, -- Fresher, Junior, Mid-Level, Senior
    salary_range VARCHAR(80),
    description TEXT NOT NULL,
    apply_url VARCHAR(255),
    is_sample BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 6. Job Skills Mapping
CREATE TABLE job_skills (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    job_id BIGINT NOT NULL,
    skill_id BIGINT NOT NULL,
    is_required BOOLEAN DEFAULT TRUE,
    importance_weight INT DEFAULT 10,
    CONSTRAINT fk_job_skills_job FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
    CONSTRAINT fk_job_skills_skill FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE,
    CONSTRAINT uk_job_skill UNIQUE (job_id, skill_id)
) ENGINE=InnoDB;

-- 7. Saved Jobs
CREATE TABLE saved_jobs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    job_id BIGINT NOT NULL,
    saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_saved_jobs_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_saved_jobs_job FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
    CONSTRAINT uk_user_saved_job UNIQUE (user_id, job_id)
) ENGINE=InnoDB;

-- 8. Career Roadmaps (Milestones for target career roles)
CREATE TABLE career_roadmaps (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    career_role VARCHAR(120) NOT NULL,
    step_order INT NOT NULL,
    milestone_title VARCHAR(150) NOT NULL,
    milestone_description TEXT NOT NULL,
    key_skills VARCHAR(255),
    estimated_duration VARCHAR(60),
    learning_resources TEXT
) ENGINE=InnoDB;

-- 9. Roadmap Progress
CREATE TABLE roadmap_progress (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    roadmap_id BIGINT NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP NULL,
    CONSTRAINT fk_progress_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_progress_roadmap FOREIGN KEY (roadmap_id) REFERENCES career_roadmaps(id) ON DELETE CASCADE,
    CONSTRAINT uk_user_roadmap UNIQUE (user_id, roadmap_id)
) ENGINE=InnoDB;

-- Indexes for performance
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_jobs_title ON jobs(title);
CREATE INDEX idx_jobs_location ON jobs(location);
CREATE INDEX idx_skills_name ON skills(name);
CREATE INDEX idx_roadmaps_role ON career_roadmaps(career_role);

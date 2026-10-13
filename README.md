# 🧭 CareerCompass AI – Smart Career Guidance & Job Recommendation Platform

> **A modern, full-stack career guidance and job recommendation platform powered by Java Spring Boot 3.3, MySQL 8.0, and React with Vite.**

---

## 🌟 Executive Summary & Features

**CareerCompass AI** is designed to solve the career mismatch problem faced by students and fresh graduates. Instead of generic keyword searches or opaque "black box" claims, CareerCompass AI employs a **transparent, rule-based algorithmic recommendation engine** that matches candidate competencies, education, experience levels, and career interests with verified job specifications.

### 🎯 Key Capabilities

1. **🎨 Premium SaaS Interface**:
   - Modern blue, violet, and indigo color scheme with subtle glassmorphism and smooth micro-animations.
   - Dynamic **Dark / Light mode** toggle with persistent local storage.
   - Fully responsive across desktop, tablet, and mobile devices.

2. **🚀 Landing Page**:
   - Bold hero section with actionable CTAs (*"Find My Career"* & *"Explore Opportunities"*).
   - Real, database-backed platform metrics (12+ career roles, 40+ skills, deterministic matching).
   - Core feature cards and an intuitive 3-step workflow (*Enter Skills → Analyze Profile → Discover Opportunities*).

3. **🔐 Secure User Authentication & Registration**:
   - Email and password registration with client and server-side validation.
   - Passwords hashed securely using **BCrypt** (`$2a$10$...`).
   - Stateless **JWT (JSON Web Token)** session management with Spring Security.
   - Role-Based Access Control (**Candidate** vs. **Administrator**).

4. **🧠 Interactive Skills & Profile Assessment**:
   - Searchable skill tag selector with multi-select chips and proficiency adjustments (*Beginner*, *Intermediate*, *Advanced*, *Expert*).
   - Interpersonal soft skills and career domain interest selector.
   - Live profile readiness meter and prominent *"Analyze My Profile"* action.

5. **⚡ Smart Rule-Based Recommendation Engine**:
   - **Competency overlap scoring** (0–70 points) weighted by skill criticality and candidate proficiency.
   - **Experience level alignment** (0–15 points) matching entry-level / junior candidates with suitable vacancies.
   - **Domain & role alignment** (0–15 points) factoring in stated interests and targeted roles.
   - Normalizes scores from 0–100% and generates human-readable explanations explaining *why* the job matches.

6. **📊 Personalized Candidate Dashboard**:
   - Personalized welcome banner with the candidate's name.
   - Profile completion score meter.
   - Quick counters: Total Recommendations, Saved Jobs, and Peak Match Score.
   - Interactive skill proficiency breakdown chart.
   - Quick navigation shortcuts.

7. **🔍 Skill Gap Analysis**:
   - Target career role selector.
   - Side-by-side comparison: **Already Have** vs. **Skills to Improve**.
   - Prioritization flags: **HIGH Priority** (critical blocker), **MEDIUM Priority**, and **LOW Priority** (bonus).
   - Curated study resources and estimated completion times.
   - Interactive checkbox tracker to mark skills as learned with live readiness calculation.

8. **🗺️ Career Roadmaps**:
   - Sequential learning milestones (Core Programming → DSA → Backend APIs → Full Stack Projects → Interview Prep).
   - Customized tracks for *Java Full Stack*, *Frontend Engineer*, and *Data Scientist*.
   - Check off completed milestones with live synchronization to MySQL.

9. **💼 Explore Jobs & Bookmarks**:
   - Keyword search across job titles, companies, and descriptions.
   - Filter by skill, location, employment type (Full-Time, Internship, Remote, Hybrid), and experience.
   - Save/unsave bookmarks with instant status feedback.
   - Detailed modal popup with job description and direct apply links.

10. **🛡️ Administrator Control Console**:
    - Protected by server-side `@PreAuthorize("hasRole('ADMIN')")`.
    - Live platform metrics (total candidates, active listings, master skills).
    - Full **CRUD** on job listings (Create, Read, Update, Delete) with required and optional skill mappings.
    - Candidate directory displaying education, target role, and profile completion.

---

## 🏗️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite 8, Lucide React Icons, Native CSS3 Design System |
| **Backend** | Java 21 LTS, Spring Boot 3.3.4, Spring Web, Spring Data JPA, Spring Security |
| **Authentication** | BCrypt Password Hashing, JJWT (HMAC-SHA256) |
| **Database** | MySQL 8.0 Relational Database (`careercompass_db`) |
| **API Client** | Axios (with Bearer Token Interceptor & Error Handlers) |

---

## 🗄️ Database Architecture (`careercompass_db`)

The database is normalized into 9 relational tables:

```
 users (id, full_name, email, password, role, education_level, degree, graduation_year, experience_level, ...)
   ├── user_skills (user_id, skill_id, proficiency)
   ├── career_interests (user_id, interest)
   ├── saved_jobs (user_id, job_id, saved_at)
   └── roadmap_progress (user_id, roadmap_id, is_completed, completed_at)

 skills (id, name, category, icon)

 jobs (id, title, company, location, job_type, experience_level, salary_range, description, apply_url, is_sample)
   └── job_skills (job_id, skill_id, is_required, importance_weight)

 career_roadmaps (id, career_role, step_order, milestone_title, milestone_description, key_skills, ...)
```

---

## 🚀 Quick Start Guide (Local Setup)

### 1. Prerequisites
- **Java Development Kit (JDK 21+)**
- **Node.js (v18+)** and **npm**
- **MySQL Server 8.0** running locally on port `3306`

---

### 2. Database Setup

1. Open your terminal or MySQL command line / MySQL Workbench.
2. Log into MySQL:
   ```bash
   mysql -u root -p
   ```
3. Run the provided schema and seed files located in `database/`:
   ```sql
   source e:/Project-TT/careercompass-ai/database/schema.sql;
   source e:/Project-TT/careercompass-ai/database/seed_data.sql;
   ```
4. Verify table creation:
   ```sql
   USE careercompass_db;
   SHOW TABLES;
   ```

---

### 3. Backend Setup (Spring Boot)

1. Navigate to the backend directory:
   ```bash
   cd e:/Project-TT/careercompass-ai/backend
   ```
2. Verify database credentials in `src/main/resources/application.properties`:
   ```properties
   spring.datasource.username=root
   spring.datasource.password=12345
   ```
   *(Or specify via environment variable `DB_PASSWORD=your_password`)*
3. Run the backend:
   - **Using PowerShell**:
     ```powershell
     .\run_backend.ps1
     ```
   - **Using Command Prompt / Batch**:
     ```cmd
     run_backend.bat
     ```
   - **Using Maven Wrapper directly**:
     ```bash
     ./mvnw spring-boot:run
     ```
4. The backend will start on **`http://localhost:8080`**.
   Test health endpoint: [http://localhost:8080/api/health](http://localhost:8080/api/health)

---

### 4. Frontend Setup (React + Vite)

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd e:/Project-TT/careercompass-ai/frontend
   ```
2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and visit:
   👉 **`http://localhost:5173`**

---

## 🔑 Pre-Seeded Demo Accounts (One-Click Login)

The login screen provides one-click quick login buttons for testing:

| Role | Email | Password | Features Accessible |
|---|---|---|---|
| **Demo Student** | `student@careercompass.ai` | `Student@123` | Dashboard, Recommendations, Skill Gap Analysis, Bookmarks, Roadmap Progress |
| **Platform Administrator** | `admin@careercompass.ai` | `Admin@123` | Admin Dashboard, Add/Edit/Delete Jobs, Candidate Directory, Platform Statistics |

---

## 🧮 How the Rule-Based Matching Algorithm Works

The recommendation engine computes a deterministic score (0–100%) for each candidate-job pair using three weighted components:

$$\text{Final Score} = \text{Skill Score (0--70)} + \text{Experience Score (0--15)} + \text{Interest Score (0--15)}$$

### 1. Skill Overlap Score (0–70 Points)
- Every required skill is assigned an importance weight ($W_i \in [5, 10]$).
- If the candidate possesses skill $i$, the weight is multiplied by candidate proficiency:
  - **Expert**: $\times 1.05$
  - **Advanced**: $\times 1.00$
  - **Intermediate**: $\times 0.90$
  - **Beginner**: $\times 0.75$
- Base skill score is calculated as:
  $$\text{Ratio} = \frac{\sum (W_{\text{matched}} \times \text{Proficiency})}{\sum W_{\text{required}}}$$
  $$\text{Base Score} = \min(65, \text{Ratio} \times 65) + \text{Optional Skill Bonus (up to 5)}$$

### 2. Experience Alignment Score (0–15 Points)
- Evaluates candidate seniority against job requirements (e.g. *Fresher* candidate matching *Fresher* vacancy receives 15 points; *Junior* vacancy receives 10 points).

### 3. Career Interest & Role Alignment (0–15 Points)
- Evaluates title and description keywords against candidate's declared interests (*Full Stack*, *Backend*, *Cloud*, etc.) and desired role string.

### Transparency Output:
Along with the match percentage, the engine generates:
- **`matchingSkills`**: Exactly which candidate skills matched the requirements.
- **`missingSkills`**: Missing requirements with prioritized learning flags.
- **`matchExplanation`**: Textual justification explaining the calculated match.

---

## 📋 REST API Reference

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/health` | Public | Backend health and version status |
| `POST` | `/api/auth/register` | Public | Register new candidate with BCrypt |
| `POST` | `/api/auth/login` | Public | Authenticate and obtain JWT token |
| `GET` | `/api/auth/check` | Authenticated | Validate existing JWT token |
| `GET` | `/api/users/me` | Authenticated | Retrieve current user profile & skills |
| `PUT` | `/api/users/me` | Authenticated | Update user profile fields |
| `GET` | `/api/skills` | Public | List / search master skills |
| `POST` | `/api/assessment/submit` | Authenticated | Submit skill proficiencies & update profile |
| `GET` | `/api/recommendations` | Authenticated | Retrieve personalized job recommendations |
| `GET` | `/api/recommendations/skill-gap` | Authenticated | Analyze skill gaps for a target role |
| `GET` | `/api/jobs` | Public | Search and filter catalog jobs |
| `GET` | `/api/jobs/{id}` | Public | Get detailed job listing |
| `POST` | `/api/jobs/{id}/save` | Authenticated | Bookmark job listing |
| `DELETE` | `/api/jobs/{id}/save` | Authenticated | Remove job bookmark |
| `GET` | `/api/jobs/saved` | Authenticated | Retrieve candidate's saved jobs |
| `GET` | `/api/career-roadmap` | Public | Get career roadmap milestones |
| `POST` | `/api/career-roadmap/{id}/toggle`| Authenticated | Toggle milestone completion status |
| `GET` | `/api/admin/stats` | Admin Only | View system-wide platform statistics |
| `GET` | `/api/admin/users` | Admin Only | View registered candidates directory |
| `POST` | `/api/admin/jobs` | Admin Only | Create new job listing with skills |
| `PUT` | `/api/admin/jobs/{id}` | Admin Only | Update existing job listing |
| `DELETE` | `/api/admin/jobs/{id}` | Admin Only | Delete job listing |

---

## 🧪 Automated Testing

An automated end-to-end integration test suite is included in `test_e2e_journey.js`. It validates all 21 core functional requirements against the live backend and frontend:

```bash
node test_e2e_journey.js
```

---

## 🎓 Viva & Presentation Talking Points

1. **Architecture Separation**: Clean separation of concerns between presentation (React Vite), persistence (MySQL 8), and business logic (Spring Boot service layer).
2. **Security Best Practices**: Stateless authentication via JJWT with bearer token interceptors, BCrypt password hashing, and server-side role validation (`@PreAuthorize`).
3. **No "Black Box" Illusion**: Clearly demonstrates how algorithmic recommendation systems actually work using mathematical heuristics rather than fictitious unverified claims.
4. **Relational Integrity**: Complete entity mappings (`@OneToMany`, `@ManyToOne`, `@UniqueConstraint`) with cascade configurations and foreign keys.

---
*Created with ❤️ for college project presentation, portfolio showcase, and full-stack engineering demonstration.*

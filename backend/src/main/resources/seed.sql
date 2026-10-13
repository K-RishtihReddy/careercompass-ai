
-- --------------------------------------------------------
-- 1. Insert Master Skills
-- --------------------------------------------------------
INSERT INTO skills (id, name, category, icon) VALUES
-- Technical Skills
(1, 'Java', 'TECHNICAL', 'coffee'),
(2, 'Spring Boot', 'TECHNICAL', 'leaf'),
(3, 'React', 'TECHNICAL', 'atom'),
(4, 'JavaScript', 'TECHNICAL', 'file-code'),
(5, 'TypeScript', 'TECHNICAL', 'code'),
(6, 'Python', 'TECHNICAL', 'terminal'),
(7, 'C++', 'TECHNICAL', 'cpu'),
(8, 'HTML', 'TECHNICAL', 'layout'),
(9, 'CSS', 'TECHNICAL', 'palette'),
(10, 'SQL', 'TECHNICAL', 'database'),
(11, 'MySQL', 'TECHNICAL', 'server'),
(12, 'PostgreSQL', 'TECHNICAL', 'database'),
(13, 'MongoDB', 'TECHNICAL', 'database'),
(14, 'REST APIs', 'TECHNICAL', 'globe'),
(15, 'Git', 'TECHNICAL', 'git-branch'),
(16, 'Docker', 'TECHNICAL', 'box'),
(17, 'Kubernetes', 'TECHNICAL', 'layers'),
(18, 'AWS', 'TECHNICAL', 'cloud'),
(19, 'Microservices', 'TECHNICAL', 'network'),
(20, 'Linux', 'TECHNICAL', 'terminal'),
(21, 'Machine Learning', 'TECHNICAL', 'brain'),
(22, 'Deep Learning', 'TECHNICAL', 'cpu'),
(23, 'Pandas', 'TECHNICAL', 'table'),
(24, 'NumPy', 'TECHNICAL', 'binary'),
(25, 'TensorFlow', 'TECHNICAL', 'activity'),
(26, 'PyTorch', 'TECHNICAL', 'flame'),
(27, 'Node.js', 'TECHNICAL', 'hexagon'),
(28, 'Express', 'TECHNICAL', 'server'),
(29, 'Redux', 'TECHNICAL', 'workflow'),
(30, 'CI/CD', 'TECHNICAL', 'repeat'),
(31, 'Redis', 'TECHNICAL', 'zap'),
(32, 'Kafka', 'TECHNICAL', 'radio'),
(33, 'Cybersecurity', 'TECHNICAL', 'shield-check'),
(34, 'Tailwind CSS', 'TECHNICAL', 'wind'),
-- Soft Skills
(35, 'Problem Solving', 'SOFT', 'lightbulb'),
(36, 'Communication', 'SOFT', 'message-square'),
(37, 'Teamwork', 'SOFT', 'users'),
(38, 'Leadership', 'SOFT', 'compass'),
(39, 'Critical Thinking', 'SOFT', 'brain-circuit'),
(40, 'Time Management', 'SOFT', 'clock'),
(41, 'Adaptability', 'SOFT', 'refresh-cw');

-- --------------------------------------------------------
-- 2. Insert Sample Jobs (Clearly labeled sample college demo records)
-- --------------------------------------------------------
INSERT INTO jobs (id, title, company, location, job_type, experience_level, salary_range, description, apply_url, is_sample) VALUES
(1, 'Java Full Stack Developer', 'CloudNova Systems', 'Bangalore, India', 'Full-Time', 'Fresher', '₹6.5 - 9.0 LPA', 'Build resilient enterprise web platforms using Java 21, Spring Boot, and modern React user interfaces. Collaborate with product architects on high-volume scalable microservices.', 'https://careers.example.com/cloudnova/java-fullstack', TRUE),

(2, 'Spring Boot Backend Developer', 'FinTech Dynamics', 'Hyderabad, India', 'Full-Time', 'Fresher', '₹7.0 - 10.0 LPA', 'Engineer high-throughput transactional payment APIs and microservices using Spring Boot, JPA, MySQL, and Docker. Optimize query performance and enforce enterprise security.', 'https://careers.example.com/fintech/backend-dev', TRUE),

(3, 'React Frontend Developer', 'PixelCraft Digital', 'Remote', 'Full-Time', 'Junior', '₹5.5 - 8.0 LPA', 'Craft responsive, intuitive SaaS interfaces and dashboards with React, TypeScript, and modern CSS animations. Integrate seamless REST APIs with high performance.', 'https://careers.example.com/pixelcraft/react-dev', TRUE),

(4, 'Software Engineer Trainee', 'NexGen Innovations', 'Pune, India', 'Full-Time', 'Fresher', '₹4.5 - 6.5 LPA', 'Comprehensive rotational engineering program focusing on object-oriented programming (Java/C++), foundational SQL data modeling, algorithms, and clean code craftsmanship.', 'https://careers.example.com/nexgen/trainee', TRUE),

(5, 'Junior Web Developer', 'Horizon Media Tech', 'Mumbai, India', 'Hybrid', 'Fresher', '₹4.0 - 6.0 LPA', 'Deliver interactive web portals, landing pages, and responsive UI components using HTML5, CSS3, modern JavaScript, and React with cross-browser compatibility.', 'https://careers.example.com/horizon/jr-web', TRUE),

(6, 'Data Analyst / Scientist', 'QuantEdge Analytics', 'Bangalore, India', 'Full-Time', 'Fresher', '₹6.0 - 8.5 LPA', 'Analyze customer trends and build predictive machine learning models using Python, Pandas, SQL, and data visualization libraries. Translate insights into business strategies.', 'https://careers.example.com/quantedge/data-analyst', TRUE),

(7, 'Cloud & DevOps Trainee', 'InfraScale Cloud', 'Chennai, India', 'Full-Time', 'Fresher', '₹5.0 - 7.5 LPA', 'Automate containerized deployment pipelines with Docker, Linux shell scripts, Git, and AWS infrastructure. Monitor system metrics and ensure high availability.', 'https://careers.example.com/infrascale/devops-trainee', TRUE),

(8, 'Machine Learning Engineer', 'Cognitive AI Labs', 'Gurugram, India', 'Remote', 'Junior', '₹8.0 - 12.0 LPA', 'Train, validate, and deploy deep learning models using Python, PyTorch/TensorFlow, and feature engineering pipelines. Build inference REST APIs for production use.', 'https://careers.example.com/cognitiveai/ml-engineer', TRUE),

(9, 'Backend API Developer', 'HyperPay Global', 'Noida, India', 'Full-Time', 'Junior', '₹6.5 - 9.5 LPA', 'Develop resilient microservices and distributed transaction handlers with Java, Spring Boot, MySQL, and Redis caching. Ensure low-latency API response times.', 'https://careers.example.com/hyperpay/api-dev', TRUE),

(10, 'Full Stack JavaScript Engineer', 'AgileStack Labs', 'Remote', 'Full-Time', 'Fresher', '₹5.5 - 8.5 LPA', 'End-to-end web application development using React frontend, Node.js/Express backend, MongoDB, and RESTful architectures. Write clean, tested modular code.', 'https://careers.example.com/agilestack/fullstack-js', TRUE),

(11, 'Junior QA Automation Engineer', 'QualityFirst Solutions', 'Bangalore, India', 'Hybrid', 'Fresher', '₹4.5 - 6.0 LPA', 'Design automated test suites and validation scripts using Java or Python. Conduct end-to-end API testing, regression workflows, and CI integration.', 'https://careers.example.com/qualityfirst/qa-trainee', TRUE),

(12, 'Cybersecurity Analyst Trainee', 'SecureNet Defense', 'Hyderabad, India', 'Full-Time', 'Fresher', '₹5.5 - 7.5 LPA', 'Monitor security logs, evaluate vulnerability scans, enforce identity policies, and assess network protocols across Linux and enterprise environments.', 'https://careers.example.com/securenet/cyber-trainee', TRUE);

-- --------------------------------------------------------
-- 3. Insert Job Skills Mapping (With required flag & weights)
-- --------------------------------------------------------
-- Job 1: Java Full Stack Developer
INSERT INTO job_skills (job_id, skill_id, is_required, importance_weight) VALUES
(1, 1, TRUE, 10),   -- Java
(1, 2, TRUE, 10),   -- Spring Boot
(1, 3, TRUE, 9),    -- React
(1, 11, TRUE, 8),   -- MySQL
(1, 14, TRUE, 8),   -- REST APIs
(1, 15, TRUE, 7),   -- Git
(1, 8, FALSE, 5),   -- HTML
(1, 9, FALSE, 5),   -- CSS
(1, 35, FALSE, 6);  -- Problem Solving

-- Job 2: Spring Boot Backend Developer
INSERT INTO job_skills (job_id, skill_id, is_required, importance_weight) VALUES
(2, 1, TRUE, 10),   -- Java
(2, 2, TRUE, 10),   -- Spring Boot
(2, 11, TRUE, 9),   -- MySQL
(2, 14, TRUE, 9),   -- REST APIs
(2, 19, FALSE, 7),  -- Microservices
(2, 16, FALSE, 6),  -- Docker
(2, 15, TRUE, 7);   -- Git

-- Job 3: React Frontend Developer
INSERT INTO job_skills (job_id, skill_id, is_required, importance_weight) VALUES
(3, 3, TRUE, 10),   -- React
(3, 4, TRUE, 10),   -- JavaScript
(3, 5, TRUE, 8),    -- TypeScript
(3, 8, TRUE, 8),    -- HTML
(3, 9, TRUE, 8),    -- CSS
(3, 15, TRUE, 7),   -- Git
(3, 29, FALSE, 6);  -- Redux

-- Job 4: Software Engineer Trainee
INSERT INTO job_skills (job_id, skill_id, is_required, importance_weight) VALUES
(4, 1, TRUE, 9),    -- Java
(4, 10, TRUE, 8),   -- SQL
(4, 35, TRUE, 10),  -- Problem Solving
(4, 15, FALSE, 6),  -- Git
(4, 36, FALSE, 7),  -- Communication
(4, 37, FALSE, 7);  -- Teamwork

-- Job 5: Junior Web Developer
INSERT INTO job_skills (job_id, skill_id, is_required, importance_weight) VALUES
(5, 8, TRUE, 10),   -- HTML
(5, 9, TRUE, 10),   -- CSS
(5, 4, TRUE, 9),    -- JavaScript
(5, 3, FALSE, 7),   -- React
(5, 15, TRUE, 6),   -- Git
(5, 36, FALSE, 6);  -- Communication

-- Job 6: Data Analyst / Scientist
INSERT INTO job_skills (job_id, skill_id, is_required, importance_weight) VALUES
(6, 6, TRUE, 10),   -- Python
(6, 10, TRUE, 9),   -- SQL
(6, 23, TRUE, 9),   -- Pandas
(6, 24, TRUE, 8),   -- NumPy
(6, 21, FALSE, 7),  -- Machine Learning
(6, 35, TRUE, 8);   -- Problem Solving

-- Job 7: Cloud & DevOps Trainee
INSERT INTO job_skills (job_id, skill_id, is_required, importance_weight) VALUES
(7, 20, TRUE, 9),   -- Linux
(7, 16, TRUE, 9),   -- Docker
(7, 18, TRUE, 8),   -- AWS
(7, 15, TRUE, 8),   -- Git
(7, 30, FALSE, 7),  -- CI/CD
(7, 35, FALSE, 6);  -- Problem Solving

-- Job 8: Machine Learning Engineer
INSERT INTO job_skills (job_id, skill_id, is_required, importance_weight) VALUES
(8, 6, TRUE, 10),   -- Python
(8, 21, TRUE, 10),  -- Machine Learning
(8, 22, TRUE, 9),   -- Deep Learning
(8, 25, FALSE, 8),  -- TensorFlow
(8, 26, FALSE, 8),  -- PyTorch
(8, 10, FALSE, 6);  -- SQL

-- Job 9: Backend API Developer
INSERT INTO job_skills (job_id, skill_id, is_required, importance_weight) VALUES
(9, 1, TRUE, 10),   -- Java
(9, 2, TRUE, 10),   -- Spring Boot
(9, 11, TRUE, 8),   -- MySQL
(9, 14, TRUE, 9),   -- REST APIs
(9, 31, FALSE, 7),  -- Redis
(9, 19, FALSE, 7);  -- Microservices

-- Job 10: Full Stack JavaScript Engineer
INSERT INTO job_skills (job_id, skill_id, is_required, importance_weight) VALUES
(10, 4, TRUE, 10),  -- JavaScript
(10, 3, TRUE, 10),  -- React
(10, 27, TRUE, 9),  -- Node.js
(10, 28, TRUE, 8),  -- Express
(10, 13, TRUE, 8),  -- MongoDB
(10, 15, TRUE, 7);  -- Git

-- Job 11: Junior QA Automation Engineer
INSERT INTO job_skills (job_id, skill_id, is_required, importance_weight) VALUES
(11, 1, TRUE, 8),   -- Java
(11, 6, FALSE, 7),  -- Python
(11, 15, TRUE, 7),  -- Git
(11, 35, TRUE, 9),  -- Problem Solving
(11, 20, FALSE, 6); -- Linux

-- Job 12: Cybersecurity Analyst Trainee
INSERT INTO job_skills (job_id, skill_id, is_required, importance_weight) VALUES
(12, 33, TRUE, 10), -- Cybersecurity
(12, 20, TRUE, 9),  -- Linux
(12, 6, FALSE, 7),  -- Python
(12, 35, TRUE, 8),  -- Problem Solving
(12, 36, FALSE, 7); -- Communication

-- --------------------------------------------------------
-- 4. Insert Career Roadmaps (Actionable learning milestones)
-- --------------------------------------------------------
INSERT INTO career_roadmaps (id, career_role, step_order, milestone_title, milestone_description, key_skills, estimated_duration, learning_resources) VALUES
-- Java Full Stack Developer Roadmap
(1, 'Java Full Stack Developer', 1, 'Core Programming & OOP Mastery', 'Master Java fundamentals, OOP concepts (Inheritance, Polymorphism, Encapsulation, Abstraction), Exception Handling, and the Collections Framework.', 'Java, OOP, Collections', '3-4 Weeks', 'Oracle Java Docs, MOOC Java Course, LeetCode Easy Java Problems'),
(2, 'Java Full Stack Developer', 2, 'Data Structures & Algorithmic Problem Solving', 'Implement Arrays, Strings, HashMaps, Trees, Sorting, and Searching to solve algorithmic coding challenges.', 'DSA, Problem Solving', '4-5 Weeks', 'NeetCode 150, HackerRank Problem Solving, GeeksforGeeks DSA'),
(3, 'Java Full Stack Developer', 3, 'Relational Databases & SQL Modeling', 'Master SQL queries, joins, indexes, normalization, schema design, and JDBC/Hibernate ORM fundamentals.', 'SQL, MySQL, Database Design', '2-3 Weeks', 'MySQL Documentation, Mode SQL Tutorial, PostgreSQL Exercises'),
(4, 'Java Full Stack Developer', 4, 'Backend API Engineering with Spring Boot', 'Build enterprise RESTful web services with Spring Web, Spring Data JPA, Spring Security (JWT), and exception handling.', 'Spring Boot, REST APIs, Security', '4-5 Weeks', 'Spring.io Guides, Baeldung Tutorials, Amigoscode Spring Boot'),
(5, 'Java Full Stack Developer', 5, 'Modern Frontend with React & State Management', 'Master JSX, components, React hooks (useState, useEffect, useContext), Axios API integration, and responsive layouts.', 'React, JavaScript, HTML, CSS', '4 Weeks', 'React.dev Official Documentation, Scrimba React, FreeCodeCamp'),
(6, 'Java Full Stack Developer', 6, 'Full-Stack Project Integration & Deployment', 'Integrate frontend and backend, containerize with Docker, push to GitHub, write README documentation, and practice technical interview questions.', 'Git, Docker, CI/CD, Deployment', '3 Weeks', 'GitHub Guides, Docker 101, Tech Interview Handbook'),

-- Frontend Engineer Roadmap
(7, 'Frontend Engineer', 1, 'Web Foundations: HTML5, CSS3 & Responsive Design', 'Deep dive into semantic HTML, CSS Flexbox, Grid, CSS animations, media queries, and mobile-first responsive architecture.', 'HTML, CSS, Responsive Design', '2-3 Weeks', 'MDN Web Docs, Kevin Powell CSS YouTube, Frontend Mentor'),
(8, 'Frontend Engineer', 2, 'Modern JavaScript & TypeScript Mastery', 'Master ES6+ syntax, asynchronous programming (Promises, async/await), DOM manipulation, and strong typing with TypeScript.', 'JavaScript, TypeScript', '4 Weeks', 'JavaScript.info, TypeScript Handbook, You Don\'t Know JS'),
(9, 'Frontend Engineer', 3, 'React Core & Modern Component Patterns', 'Build modular reusable UI components, custom hooks, context API, form handling, and API communication with Axios.', 'React, React Hooks, Axios', '4 Weeks', 'React.dev, React Beta Tutorial, Kent C. Dodds Blog'),
(10, 'Frontend Engineer', 4, 'State Management & UI Performance', 'Implement predictable state architectures, caching, code splitting, lazy loading, and accessible UI components.', 'Redux, Performance, Accessibility', '3 Weeks', 'Redux Toolkit Docs, Web.dev Core Web Vitals, A11y Project'),
(11, 'Frontend Engineer', 5, 'Portfolio Projects & Interview Readiness', 'Build 2-3 production-grade React web applications with real APIs, automated testing, and prepare for system design and coding rounds.', 'Git, Portfolio, Testing', '3 Weeks', 'Frontend Interview Handbook, GreatFrontEnd, GitHub Pages/Vercel'),

-- Data Scientist Roadmap
(12, 'Data Scientist', 1, 'Python Programming & Scientific Computing', 'Master Python programming, data structures, and scientific computing foundations using NumPy and Pandas.', 'Python, NumPy, Pandas', '3-4 Weeks', 'Python.org Official Tutorial, Kaggle Python Course, Corey Schafer YouTube'),
(13, 'Data Scientist', 2, 'Exploratory Data Analysis & Advanced SQL', 'Clean noisy data, perform aggregation queries, statistical hypothesis testing, and create insightful visualizations.', 'SQL, Data Visualization, EDA', '3 Weeks', 'Kaggle Datasets, SQLBolt, Seaborn & Matplotlib Documentation'),
(14, 'Data Scientist', 3, 'Foundations of Machine Learning', 'Understand supervised and unsupervised algorithms: Regression, Classification, Random Forests, and Clustering with Scikit-Learn.', 'Machine Learning, Scikit-Learn', '5 Weeks', 'Andrew Ng Machine Learning Specialization, Hands-On ML (O\'Reilly)'),
(15, 'Data Scientist', 4, 'Deep Learning & Neural Networks', 'Build neural networks for computer vision and NLP using TensorFlow or PyTorch, tuning hyperparameters and evaluating metrics.', 'Deep Learning, TensorFlow, PyTorch', '5 Weeks', 'Fast.ai Practical Deep Learning, DeepLearning.AI Specialization'),
(16, 'Data Scientist', 5, 'Model Deployment & Portfolio Showcase', 'Wrap machine learning models into REST APIs, host on cloud services, track experiments, and create compelling case studies.', 'REST APIs, Docker, Cloud', '3 Weeks', 'FastAPI Documentation, Streamlit Gallery, Kaggle Competitions');

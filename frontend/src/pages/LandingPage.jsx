import React, { useEffect, useState } from 'react';
import { ArrowRight, Compass, Sparkles, TrendingUp, BookOpen, Target, CheckCircle2, Star, Briefcase, Award } from 'lucide-react';
import api from '../services/api';

export const LandingPage = ({ onNavigate }) => {
  const [stats, setStats] = useState({ jobsCount: 12, skillsCount: 41, rolesCount: 4 });

  useEffect(() => {
    const fetchLandingData = async () => {
      try {
        const [jobsRes, skillsRes] = await Promise.all([
          api.get('/jobs'),
          api.get('/skills'),
        ]);
        if (jobsRes.data && skillsRes.data) {
          setStats({
            jobsCount: jobsRes.data.length || 12,
            skillsCount: skillsRes.data.length || 41,
            rolesCount: 4,
          });
        }
      } catch (e) {
        // Fallback default statistics from seeded database
      }
    };
    fetchLandingData();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-glow-1"></div>
        <div className="hero-glow-2"></div>

        <div className="hero-container">
          <div>
            <div className="hero-badge">
              <Sparkles size={14} />
              <span>Next-Generation Career Intelligence</span>
            </div>

            <h1 className="hero-title">
              Discover Your Skills. <br />
              <span className="gradient-text">Find Your Future.</span>
            </h1>

            <p className="hero-subtitle">
              Get personalized career recommendations based on your skills, interests, education, and career goals. Powered by transparent, rule-based algorithmic matching.
            </p>

            <div className="hero-cta-group">
              <button
                className="btn btn-primary btn-lg"
                onClick={() => onNavigate('/assessment')}
              >
                <span>Find My Career</span>
                <ArrowRight size={18} />
              </button>

              <button
                className="btn btn-secondary btn-lg"
                onClick={() => onNavigate('/jobs')}
              >
                <Briefcase size={18} />
                <span>Explore Opportunities</span>
              </button>
            </div>

            {/* Real Platform Statistics (Supported by actual seed records) */}
            <div className="hero-stats-strip">
              <div className="hero-stat-item">
                <h4>{stats.jobsCount}+</h4>
                <p>Curated Career Roles</p>
              </div>
              <div className="hero-stat-item">
                <h4>{stats.skillsCount}+</h4>
                <p>Tracked Tech & Soft Skills</p>
              </div>
              <div className="hero-stat-item">
                <h4>100%</h4>
                <p>Deterministic Rule Engine</p>
              </div>
            </div>
          </div>

          {/* Hero Visual Card Graphic */}
          <div className="hero-visual">
            <div className="hero-card-preview">
              <div className="hero-card-header">
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>TOP MATCH CANDIDATE</div>
                  <h3 style={{ fontSize: '1.25rem' }}>Java Full Stack Developer</h3>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>CloudNova Systems • Bangalore</div>
                </div>
                <div className="hero-card-badge">
                  94% Match
                </div>
              </div>

              <div style={{ background: 'var(--bg-secondary)', padding: '0.85rem', borderRadius: 'var(--radius-md)', fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                ✓ Overlap: Java, React, MySQL, REST APIs<br />
                ✓ Suited for Fresher / Early Career aspirations
              </div>

              <div className="hero-card-tags">
                <span className="skill-chip skill-chip-matching">Java (Advanced)</span>
                <span className="skill-chip skill-chip-matching">React</span>
                <span className="skill-chip skill-chip-matching">MySQL</span>
                <span className="skill-chip skill-chip-missing">+ Spring Boot (Learn)</span>
              </div>

              <button
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '0.5rem' }}
                onClick={() => onNavigate('/assessment')}
              >
                Analyze Your Profile Now
              </button>
            </div>

            {/* Floating decorative pills */}
            <div className="floating-pill floating-pill-top">
              <Award size={18} color="#10b981" />
              <span>Skill Gap: 2 to learn</span>
            </div>

            <div className="floating-pill floating-pill-bottom">
              <Compass size={18} color="#4f46e5" />
              <span>Personalized Roadmap</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="section">
        <div className="section-header">
          <div className="section-tag">Key Platform Capabilities</div>
          <h2 className="section-title">Engineered For Your Career Progression</h2>
          <p className="section-desc">
            Everything you need to benchmark your technical abilities, discover matching industry positions, and bridge skill gaps with clarity.
          </p>
        </div>

        <div className="features-grid">
          {/* Feature 1 */}
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Target size={26} />
            </div>
            <h3 className="feature-title">Smart Job Recommendations</h3>
            <p className="feature-text">
              Deterministic rule-based matching that compares your exact programming languages, frameworks, and proficiencies with real job specifications to score true compatibility.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <TrendingUp size={26} />
            </div>
            <h3 className="feature-title">Skill Gap Analysis</h3>
            <p className="feature-text">
              Transparent side-by-side comparison between your current skill set and target industry expectations, prioritizing high-impact missing skills.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Compass size={26} />
            </div>
            <h3 className="feature-title">Personalized Career Paths</h3>
            <p className="feature-text">
              Step-by-step milestones customized for roles like Java Full Stack, Frontend Engineering, and Data Science to guide your career preparation.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <BookOpen size={26} />
            </div>
            <h3 className="feature-title">Learning Recommendations</h3>
            <p className="feature-text">
              Direct curated study topics and authoritative learning documentation to bridge identified skill gaps without guesswork or generic AI hallucinations.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section" style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-xl)', padding: '4rem 2rem' }}>
        <div className="section-header">
          <div className="section-tag">How It Works</div>
          <h2 className="section-title">Your 3-Step Journey to Success</h2>
          <p className="section-desc">
            A simple, intuitive workflow to transition from uncertainty to tailored opportunities.
          </p>
        </div>

        <div className="steps-grid">
          <div className="step-card">
            <div className="step-num">01</div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.65rem' }}>Enter Skills & Profile</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
              Select technical skills, soft skills, education credentials, and career goals using interactive searchable tags and proficiency selectors.
            </p>
          </div>

          <div className="step-card">
            <div className="step-num">02</div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.65rem' }}>Analyze Profile</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
              Our Spring Boot engine evaluates skill overlap, weight distributions, and experience alignment to generate non-random, mathematically backed scores.
            </p>
          </div>

          <div className="step-card">
            <div className="step-num">03</div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.65rem' }}>Discover Opportunities</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
              Review ranked job matches with explanations of why each fits, analyze missing skills, and follow clear milestones to land your ideal role.
            </p>
          </div>
        </div>
      </section>

      {/* Sample Feedback / Testimonials Section (Clearly identified as sample demonstration reviews) */}
      <section className="section">
        <div className="section-header">
          <div className="section-tag">Student Demonstrations</div>
          <h2 className="section-title">What Early Users Are Saying</h2>
          <p className="section-desc">
            Sample user experiences demonstrating the platform's career assessment and gap analysis outcomes.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div style={{ display: 'flex', gap: '0.25rem', color: '#f59e0b', marginBottom: '1rem' }}>
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1.25rem', fontStyle: 'italic', lineHeight: 1.6 }}>
              "The skill gap analysis showed me exactly what was holding me back from Junior Full Stack roles. Within two months of learning Spring Boot APIs, I cleared multiple interviews!"
            </p>
            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Rohan Sharma</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Computer Science Graduate (Sample Review)</div>
          </div>

          <div className="feature-card">
            <div style={{ display: 'flex', gap: '0.25rem', color: '#f59e0b', marginBottom: '1rem' }}>
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1.25rem', fontStyle: 'italic', lineHeight: 1.6 }}>
              "Unlike other platforms that give random percentages, CareerCompass AI breaks down exactly why a role matches my profile and which missing skills have the highest priority."
            </p>
            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Ananya Patel</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Frontend Intern (Sample Review)</div>
          </div>

          <div className="feature-card">
            <div style={{ display: 'flex', gap: '0.25rem', color: '#f59e0b', marginBottom: '1rem' }}>
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1.25rem', fontStyle: 'italic', lineHeight: 1.6 }}>
              "The career roadmap milestones provided a clear structure. Checking off milestones kept me disciplined and confident in my learning journey."
            </p>
            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>David Kim</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Self-Taught Developer (Sample Review)</div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <div className="cta-banner">
        <h2>Ready to Chart Your Tech Career?</h2>
        <p>Take the interactive skills assessment today and unlock personalized job recommendations tailored to your goals.</p>
        <button className="btn btn-secondary btn-lg" onClick={() => onNavigate('/assessment')}>
          Get Started Now — It's Free
        </button>
      </div>
    </div>
  );
};

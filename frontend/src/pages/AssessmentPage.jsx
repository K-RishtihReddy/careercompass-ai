import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, MapPin, Target, Briefcase, Award, GraduationCap, ArrowRight, BrainCircuit } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { SkillTagSelector } from '../components/SkillTagSelector';
import api from '../services/api';

const AVAILABLE_SOFT_SKILLS = [
  'Problem Solving', 'Communication', 'Teamwork', 'Leadership',
  'Critical Thinking', 'Time Management', 'Adaptability'
];

const AVAILABLE_INTERESTS = [
  'Full Stack Development', 'Backend Engineering', 'Frontend Engineering',
  'AI & Machine Learning', 'Data Analytics & Science', 'Cloud Computing & DevOps',
  'Cybersecurity', 'Mobile App Development', 'Software Testing & QA'
];

export const AssessmentPage = ({ onNavigate }) => {
  const { user, isAuthenticated, refreshUser } = useAuth();

  const [skills, setSkills] = useState([]);
  const [softSkills, setSoftSkills] = useState(['Problem Solving', 'Communication']);
  const [interests, setInterests] = useState(['Full Stack Development']);
  const [educationLevel, setEducationLevel] = useState("Bachelor's");
  const [degree, setDegree] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('Fresher');
  const [preferredLocation, setPreferredLocation] = useState('Bangalore, India');
  const [desiredRole, setDesiredRole] = useState('Java Full Stack Developer');
  const [careerGoals, setCareerGoals] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Prefill if user is already logged in with existing profile
  useEffect(() => {
    if (user) {
      if (user.educationLevel) setEducationLevel(user.educationLevel);
      if (user.degree) setDegree(user.degree);
      if (user.experienceLevel) setExperienceLevel(user.experienceLevel);
      if (user.preferredLocation) setPreferredLocation(user.preferredLocation);
      if (user.desiredRole) setDesiredRole(user.desiredRole);
      if (user.careerGoals) setCareerGoals(user.careerGoals);
      if (user.skills && user.skills.length > 0) {
        setSkills(user.skills.map((s) => ({ name: s.skillName, proficiency: s.proficiency || 'INTERMEDIATE' })));
      } else {
        // Sample default starter skills
        setSkills([
          { name: 'Java', proficiency: 'ADVANCED' },
          { name: 'React', proficiency: 'INTERMEDIATE' },
          { name: 'MySQL', proficiency: 'INTERMEDIATE' },
          { name: 'Git', proficiency: 'INTERMEDIATE' },
        ]);
      }
      if (user.interests && user.interests.length > 0) {
        setInterests(user.interests);
      }
    } else {
      // Default initial starter skills for guest preview
      setSkills([
        { name: 'Java', proficiency: 'ADVANCED' },
        { name: 'React', proficiency: 'INTERMEDIATE' },
        { name: 'MySQL', proficiency: 'INTERMEDIATE' },
        { name: 'Git', proficiency: 'INTERMEDIATE' },
      ]);
    }
  }, [user]);

  // Dynamic Profile Completion Indicator (0 to 100)
  const calculateCompletion = () => {
    let score = 0;
    if (skills.length > 0) score += Math.min(30, skills.length * 6);
    if (softSkills.length > 0) score += 15;
    if (interests.length > 0) score += 15;
    if (educationLevel) score += 10;
    if (degree.trim()) score += 10;
    if (desiredRole.trim()) score += 10;
    if (preferredLocation.trim()) score += 10;
    return Math.min(100, score);
  };

  const completionPct = calculateCompletion();

  const toggleSoftSkill = (name) => {
    setSoftSkills((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );
  };

  const toggleInterest = (name) => {
    setInterests((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name]
    );
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setError('');

    if (!isAuthenticated) {
      // Prompt user to sign in or register to persist analysis
      onNavigate('/login');
      return;
    }

    if (skills.length === 0) {
      setError('Please add at least 1 technical skill to run recommendation analysis.');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        skills,
        softSkills,
        interests,
        educationLevel,
        degree,
        experienceLevel,
        preferredLocation,
        desiredRole,
        careerGoals,
      };

      await api.post('/assessment/submit', payload);
      await refreshUser();
      onNavigate('/recommendations');
    } catch (err) {
      setError(err.message || 'Failed to submit assessment.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ padding: '3rem 1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div className="hero-badge">
          <BrainCircuit size={14} />
          <span>Intelligent Profile Assessment</span>
        </div>
        <h1 style={{ fontSize: '2.4rem', marginBottom: '0.75rem' }}>Skills & Career Assessment</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '680px', margin: '0 auto' }}>
          Tell us about your technical capabilities, soft skills, and career objectives. Our algorithm compares your profile against our jobs database to recommend optimal career roles.
        </p>
      </div>

      {/* Profile Completion Indicator */}
      <div className="dashboard-card" style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem', background: 'var(--bg-glass)' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontWeight: 600, fontSize: '0.92rem' }}>
            <span>Profile Readiness Score</span>
            <span style={{ color: completionPct >= 80 ? 'var(--success)' : 'var(--primary-600)' }}>
              {completionPct}% Complete
            </span>
          </div>
          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: `${completionPct}%` }}></div>
          </div>
        </div>
        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', maxWidth: '200px' }}>
          {completionPct >= 80 ? '✓ Ready for high-confidence matching' : 'Add skills & aspirations to optimize match scores'}
        </div>
      </div>

      {error && (
        <div style={{ background: 'var(--danger-bg)', border: '1px solid var(--danger-border)', color: 'var(--danger)', padding: '0.85rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.88rem' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleAnalyze}>
        {/* Section 1: Technical Skills */}
        <div className="dashboard-card" style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
            <Award size={20} color="var(--primary-600)" />
            <h3 style={{ fontSize: '1.25rem' }}>1. Technical Competencies</h3>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
            Select programming languages, databases, and frameworks you know. Adjust proficiency to fine-tune matching accuracy.
          </p>
          <SkillTagSelector selectedSkills={skills} onChange={setSkills} />
        </div>

        {/* Section 2: Soft Skills */}
        <div className="dashboard-card" style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
            <Sparkles size={20} color="var(--violet-500)" />
            <h3 style={{ fontSize: '1.25rem' }}>2. Interpersonal & Soft Skills</h3>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
            Select soft skills that describe your work style and collaboration capabilities:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem' }}>
            {AVAILABLE_SOFT_SKILLS.map((softSkill, idx) => {
              const active = softSkills.includes(softSkill);
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => toggleSoftSkill(softSkill)}
                  className={`skill-chip ${active ? 'skill-chip-matching' : ''}`}
                  style={{ cursor: 'pointer', padding: '0.45rem 0.95rem' }}
                >
                  {active ? <CheckCircle2 size={14} /> : '+'} {softSkill}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 3: Career Interests */}
        <div className="dashboard-card" style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
            <Target size={20} color="#10b981" />
            <h3 style={{ fontSize: '1.25rem' }}>3. Career Interests & Domains</h3>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
            Which technology fields excite you the most?
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem' }}>
            {AVAILABLE_INTERESTS.map((interest, idx) => {
              const active = interests.includes(interest);
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`skill-chip ${active ? 'skill-chip-matching' : ''}`}
                  style={{ cursor: 'pointer', padding: '0.45rem 0.95rem' }}
                >
                  {active ? <CheckCircle2 size={14} /> : '+'} {interest}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 4: Academic & Career Profile */}
        <div className="dashboard-card" style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
            <GraduationCap size={20} color="#3b82f6" />
            <h3 style={{ fontSize: '1.25rem' }}>4. Education & Career Expectations</h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
            <div className="form-group">
              <label className="form-label">Education Level</label>
              <select
                className="form-select"
                value={educationLevel}
                onChange={(e) => setEducationLevel(e.target.value)}
              >
                <option value="Bachelor's">Bachelor's Degree</option>
                <option value="Master's">Master's Degree</option>
                <option value="Diploma">Diploma / Associate</option>
                <option value="PhD">Doctorate / PhD</option>
                <option value="High School">High School</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Degree or Major</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. B.Tech Computer Science"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
            <div className="form-group">
              <label className="form-label">Experience Level</label>
              <select
                className="form-select"
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
              >
                <option value="Fresher">Fresher (0 years)</option>
                <option value="Junior">Junior (1 - 2 years)</option>
                <option value="Intermediate">Intermediate (3 - 5 years)</option>
                <option value="Experienced">Experienced (5+ years)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Preferred Job Location</label>
              <div style={{ position: 'relative' }}>
                <MapPin size={17} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  className="form-input"
                  style={{ paddingLeft: '2.4rem' }}
                  placeholder="e.g. Bangalore, Hyderabad, Remote"
                  value={preferredLocation}
                  onChange={(e) => setPreferredLocation(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Desired Job Role</label>
            <div style={{ position: 'relative' }}>
              <Briefcase size={17} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                className="form-input"
                style={{ paddingLeft: '2.4rem' }}
                placeholder="e.g. Java Full Stack Developer, Frontend Engineer, Data Scientist"
                value={desiredRole}
                onChange={(e) => setDesiredRole(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Career Goals & Aspirations</label>
            <textarea
              className="form-textarea"
              placeholder="What kind of projects or technologies do you aspire to work on in the next 1-2 years?"
              value={careerGoals}
              onChange={(e) => setCareerGoals(e.target.value)}
            />
          </div>
        </div>

        {/* Prominent Action Button */}
        <div style={{ textAlign: 'center' }}>
          <button
            type="submit"
            className="btn btn-primary btn-lg"
            style={{ minWidth: '280px', padding: '1rem 2.5rem', fontSize: '1.15rem' }}
            disabled={submitting}
          >
            {submitting ? (
              'Analyzing Your Profile...'
            ) : (
              <>
                <Sparkles size={20} />
                <span>Analyze My Profile</span>
                <ArrowRight size={20} />
              </>
            )}
          </button>
          {!isAuthenticated && (
            <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Note: You'll be prompted to sign in so your assessment and recommendations can be saved.
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { Award, CheckCircle2, AlertTriangle, BookOpen, ExternalLink, ArrowRight, RefreshCw, CheckSquare, Square, Target } from 'lucide-react';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import api from '../services/api';

const TARGET_ROLES = [
  'Java Full Stack Developer',
  'Spring Boot Backend Developer',
  'React Frontend Developer',
  'Software Engineer Trainee',
  'Data Analyst / Scientist',
  'Cloud & DevOps Trainee',
  'Machine Learning Engineer'
];

export const SkillGapPage = ({ onNavigate }) => {
  const [selectedRole, setSelectedRole] = useState('Java Full Stack Developer');
  const [gapData, setGapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [learnedSkills, setLearnedSkills] = useState({});

  const fetchSkillGap = async (role) => {
    setLoading(true);
    try {
      const res = await api.get(`/recommendations/skill-gap?targetRole=${encodeURIComponent(role)}`);
      if (res.data) {
        setGapData(res.data);
      }
    } catch (e) {
      console.error('Failed to analyze skill gap:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkillGap(selectedRole);
  }, [selectedRole]);

  const toggleLearned = (skillName) => {
    setLearnedSkills((prev) => ({
      ...prev,
      [skillName]: !prev[skillName],
    }));
  };

  const totalRequired = (gapData?.alreadyHaveSkills?.length || 0) + (gapData?.skillsToImprove?.length || 0);
  const learnedCount = Object.values(learnedSkills).filter(Boolean).length;
  const currentMastered = (gapData?.alreadyHaveSkills?.length || 0) + learnedCount;
  const readinessPercentage = totalRequired > 0 ? Math.round((currentMastered / totalRequired) * 100) : 0;

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.25rem', marginBottom: '2rem' }}>
        <div>
          <div className="hero-badge" style={{ marginBottom: '0.5rem' }}>
            <Target size={14} />
            <span>Target Competency Benchmark</span>
          </div>
          <h1 style={{ fontSize: '2.2rem', marginBottom: '0.4rem' }}>Skill Gap Analysis</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '650px' }}>
            Compare your current skill set against market requirements for your target career role and focus on high-priority improvements.
          </p>
        </div>

        {/* Role Selector Dropdown */}
        <div style={{ minWidth: '280px' }}>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
            Choose Target Career Role:
          </label>
          <select
            className="form-select"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            style={{ fontWeight: 600, padding: '0.65rem 1rem' }}
          >
            {TARGET_ROLES.map((role, idx) => (
              <option key={idx} value={role}>{role}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <LoadingSkeleton count={3} height={180} />
      ) : !gapData ? (
        <div className="dashboard-card" style={{ textAlign: 'center', padding: '3rem' }}>
          <h3>Unable to load skill gap analysis</h3>
        </div>
      ) : (
        <>
          {/* Readiness Meter Card */}
          <div
            className="dashboard-card"
            style={{
              marginBottom: '2rem',
              background: 'var(--gradient-card)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.5rem',
            }}
          >
            <div style={{ flex: 1, minWidth: '260px' }}>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                Role Alignment
              </div>
              <h2 style={{ fontSize: '1.5rem', margin: '0.25rem 0 0.5rem' }}>
                {selectedRole}
              </h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.35rem' }}>
                <span>Mastered: <strong>{currentMastered} of {totalRequired} Competencies</strong></span>
                <span style={{ fontWeight: 700, color: readinessPercentage >= 75 ? 'var(--success)' : 'var(--primary-600)' }}>
                  {readinessPercentage}% Readiness
                </span>
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar-fill" style={{ width: `${readinessPercentage}%` }}></div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', borderLeft: '1px solid var(--border-color)', paddingLeft: '1.5rem' }}>
              <div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--success)' }}>
                  {gapData.alreadyHaveSkills.length}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Already Have</div>
              </div>
              <div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--danger)' }}>
                  {gapData.skillsToImprove.length - learnedCount}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>To Improve</div>
              </div>
            </div>
          </div>

          {/* Two-Column Comparison Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2.5rem' }}>
            {/* Column 1: Already Have */}
            <div className="dashboard-card" style={{ height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                <CheckCircle2 size={20} color="var(--success)" />
                <h3 style={{ fontSize: '1.2rem' }}>Already Have ({gapData.alreadyHaveSkills.length})</h3>
              </div>

              {gapData.alreadyHaveSkills.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  No overlapping skills found yet. Take the assessment to add your skills.
                </p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {gapData.alreadyHaveSkills.map((s, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.75rem 1rem',
                        background: 'var(--bg-secondary)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>{s.skillName}</div>
                      <span className="skill-chip skill-chip-matching" style={{ fontSize: '0.75rem' }}>
                        {s.proficiency}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Column 2: Skills to Improve (Interactive Checklist) */}
            <div className="dashboard-card" style={{ height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                <AlertTriangle size={20} color="var(--danger)" />
                <h3 style={{ fontSize: '1.2rem' }}>Skills to Improve ({gapData.skillsToImprove.length})</h3>
              </div>

              {gapData.skillsToImprove.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--success)' }}>
                  <CheckCircle2 size={32} style={{ margin: '0 auto 0.5rem' }} />
                  <p style={{ fontWeight: 600 }}>Outstanding! You have all core skills for this role.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {gapData.skillsToImprove.map((item, idx) => {
                    const isLearned = !!learnedSkills[item.skillName];
                    const priorityClass =
                      item.priority === 'HIGH' ? 'skill-chip-priority-high' :
                      item.priority === 'MEDIUM' ? 'skill-chip-priority-med' : 'skill-chip-priority-low';

                    return (
                      <div
                        key={idx}
                        className={priorityClass}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.85rem 1rem',
                          background: isLearned ? 'var(--success-bg)' : 'var(--bg-card)',
                          border: '1px solid var(--border-color)',
                          borderRadius: 'var(--radius-md)',
                          transition: 'all 150ms ease',
                          cursor: 'pointer',
                        }}
                        onClick={() => toggleLearned(item.skillName)}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <button
                            type="button"
                            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: isLearned ? 'var(--success)' : 'var(--text-muted)' }}
                          >
                            {isLearned ? <CheckSquare size={19} /> : <Square size={19} />}
                          </button>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '0.92rem', textDecoration: isLearned ? 'line-through' : 'none' }}>
                              {item.skillName}
                            </div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                              {item.importanceReason}
                            </div>
                          </div>
                        </div>

                        <span
                          style={{
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            padding: '0.2rem 0.55rem',
                            borderRadius: 'var(--radius-full)',
                            background: item.priority === 'HIGH' ? 'var(--danger-bg)' : item.priority === 'MEDIUM' ? 'var(--warning-bg)' : 'var(--info-bg)',
                            color: item.priority === 'HIGH' ? 'var(--danger)' : item.priority === 'MEDIUM' ? 'var(--warning)' : 'var(--info)',
                          }}
                        >
                          {item.priority} PRIORITY
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Recommended Learning Topics Section */}
          <div className="dashboard-card" style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
              <BookOpen size={20} color="var(--primary-600)" />
              <h3 style={{ fontSize: '1.25rem' }}>Curated Learning Resources to Bridge Your Gaps</h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {gapData.recommendedLearningTopics.map((topic, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '1.25rem',
                    background: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-600)', textTransform: 'uppercase' }}>
                        {topic.resourceType}
                      </span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        Est. {topic.estimatedTime}
                      </span>
                    </div>
                    <h4 style={{ fontSize: '1.05rem', marginBottom: '0.35rem' }}>{topic.topic}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.5 }}>
                      {topic.resourceTitle}
                    </p>
                  </div>

                  <a
                    href={topic.resourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline btn-sm"
                    style={{ alignSelf: 'flex-start', display: 'inline-flex', gap: '0.35rem' }}
                  >
                    <span>Start Learning</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Roadmap Link */}
          <div style={{ textAlign: 'center' }}>
            <button className="btn btn-primary" onClick={() => onNavigate('/roadmap')}>
              <span>View Full Career Milestone Roadmap</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

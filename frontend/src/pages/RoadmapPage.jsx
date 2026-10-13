import React, { useEffect, useState } from 'react';
import { Map, CheckCircle2, Clock, BookOpen, ExternalLink, Award, ArrowRight, CheckSquare, Square, Info } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import api from '../services/api';

export const RoadmapPage = ({ onNavigate }) => {
  const { isAuthenticated } = useAuth();
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('Java Full Stack Developer');
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load available roles
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await api.get('/career-roadmap/roles');
        if (res.data && res.data.length > 0) {
          setRoles(res.data);
        } else {
          setRoles(['Java Full Stack Developer', 'Frontend Engineer', 'Data Scientist']);
        }
      } catch (e) {
        setRoles(['Java Full Stack Developer', 'Frontend Engineer', 'Data Scientist']);
      }
    };
    fetchRoles();
  }, []);

  // Load milestones for role
  const fetchMilestones = async (role) => {
    setLoading(true);
    try {
      const res = await api.get(`/career-roadmap?role=${encodeURIComponent(role)}`);
      if (res.data) {
        setMilestones(res.data);
      }
    } catch (e) {
      console.error('Failed to load roadmap:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMilestones(selectedRole);
  }, [selectedRole]);

  // Toggle milestone completion
  const handleToggle = async (milestoneId) => {
    if (!isAuthenticated) {
      onNavigate('/login');
      return;
    }

    try {
      const res = await api.post(`/career-roadmap/${milestoneId}/toggle`);
      if (res.data) {
        setMilestones((prev) =>
          prev.map((m) => (m.id === milestoneId ? { ...m, isCompleted: res.data.isCompleted } : m))
        );
      }
    } catch (e) {
      console.error('Failed to toggle milestone progress:', e);
    }
  };

  const completedCount = milestones.filter((m) => m.isCompleted).length;
  const progressPct = milestones.length > 0 ? Math.round((completedCount / milestones.length) * 100) : 0;

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div className="hero-badge" style={{ marginBottom: '0.5rem' }}>
          <Map size={14} />
          <span>Structured Skill Progression</span>
        </div>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Personalized Career Roadmap</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', maxWidth: '680px', margin: '0 auto' }}>
          Suggested developmental milestones crafted to guide you step-by-step from foundational coding to technical interview readiness.
        </p>
      </div>

      {/* Role Selection Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
        {roles.map((role, idx) => (
          <button
            key={idx}
            className={`btn ${selectedRole === role ? 'btn-primary' : 'btn-secondary'} btn-sm`}
            style={{ borderRadius: 'var(--radius-full)', padding: '0.5rem 1.25rem' }}
            onClick={() => setSelectedRole(role)}
          >
            {role}
          </button>
        ))}
      </div>

      {/* Progress Header */}
      <div className="dashboard-card" style={{ marginBottom: '2.5rem', background: 'var(--gradient-card)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <div style={{ fontWeight: 700, fontSize: '1.05rem' }}>
            {selectedRole} — Roadmap Progress
          </div>
          <div style={{ fontWeight: 700, color: progressPct === 100 ? 'var(--success)' : 'var(--primary-600)' }}>
            {completedCount} of {milestones.length} Milestones Completed ({progressPct}%)
          </div>
        </div>

        <div className="progress-bar-container">
          <div className="progress-bar-fill" style={{ width: `${progressPct}%` }}></div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.75rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          <Info size={14} />
          <span>
            Milestones represent suggested learning pathways rather than guaranteed employment outcomes. Check off milestones as you master each domain.
          </span>
        </div>
      </div>

      {/* Timeline Steps */}
      {loading ? (
        <LoadingSkeleton count={5} height={140} />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
          {milestones.map((m) => (
            <div
              key={m.id}
              className="dashboard-card card-hover"
              style={{
                display: 'flex',
                gap: '1.5rem',
                alignItems: 'flex-start',
                borderLeft: m.isCompleted ? '4px solid var(--success)' : '4px solid var(--primary-500)',
                background: m.isCompleted ? 'var(--bg-glass)' : 'var(--bg-card)',
              }}
            >
              {/* Step indicator */}
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: m.isCompleted ? 'var(--success-bg)' : 'var(--primary-100)',
                  color: m.isCompleted ? 'var(--success)' : 'var(--primary-700)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  flexShrink: 0,
                }}
              >
                {m.isCompleted ? <CheckCircle2 size={22} /> : m.stepOrder}
              </div>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <h3 style={{ fontSize: '1.25rem', textDecoration: m.isCompleted ? 'line-through' : 'none' }}>
                    {m.milestoneTitle}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem', background: 'var(--bg-secondary)', padding: '0.2rem 0.55rem', borderRadius: 'var(--radius-sm)' }}>
                      <Clock size={12} /> {m.estimatedDuration}
                    </span>
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => handleToggle(m.id)}
                      style={{ padding: '0.2rem 0.5rem', color: m.isCompleted ? 'var(--success)' : 'var(--text-muted)' }}
                      title={m.isCompleted ? 'Mark as incomplete' : 'Mark as completed'}
                    >
                      {m.isCompleted ? <CheckSquare size={18} /> : <Square size={18} />}
                      <span style={{ fontSize: '0.8rem', marginLeft: '0.3rem' }}>
                        {m.isCompleted ? 'Completed' : 'Mark Done'}
                      </span>
                    </button>
                  </div>
                </div>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '0.85rem', lineHeight: 1.6 }}>
                  {m.milestoneDescription}
                </p>

                {/* Key skills & Learning Resources */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', fontSize: '0.84rem' }}>
                  {m.keySkills && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>Focus Skills:</span>
                      <span className="skill-chip" style={{ fontSize: '0.75rem', padding: '0.15rem 0.5rem' }}>
                        {m.keySkills}
                      </span>
                    </div>
                  )}

                  {m.learningResources && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary-600)' }}>
                      <BookOpen size={14} />
                      <span style={{ fontWeight: 500 }}>{m.learningResources}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

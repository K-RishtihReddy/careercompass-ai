import React, { useEffect, useState } from 'react';
import { User, Sparkles, Briefcase, Bookmark, Award, ArrowRight, BookOpen, Compass, CheckCircle2, TrendingUp, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { JobCard } from '../components/JobCard';
import { JobDetailModal } from '../components/JobDetailModal';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import api from '../services/api';

export const DashboardPage = ({ onNavigate }) => {
  const { user, refreshUser } = useAuth();
  const [recommendations, setRecommendations] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [recsRes, savedRes] = await Promise.all([
        api.get('/recommendations'),
        api.get('/jobs/saved'),
      ]);

      if (recsRes.data) setRecommendations(recsRes.data);
      if (savedRes.data) setSavedJobs(savedRes.data);
    } catch (e) {
      console.error('Error fetching dashboard data:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleSaveToggle = async (jobId) => {
    try {
      const isAlreadySaved = savedJobs.some((j) => (j.id || j.jobId) === jobId);
      if (isAlreadySaved) {
        await api.delete(`/jobs/${jobId}/save`);
        setSavedJobs((prev) => prev.filter((j) => (j.id || j.jobId) !== jobId));
      } else {
        await api.post(`/jobs/${jobId}/save`);
        const jobToAdd = recommendations.find((r) => (r.id || r.jobId) === jobId);
        if (jobToAdd) setSavedJobs((prev) => [...prev, jobToAdd]);
      }
      refreshUser();
    } catch (e) {
      console.error('Save toggle failed:', e);
    }
  };

  const topMatch = recommendations[0];
  const topRoles = recommendations.slice(0, 3);
  const completionPct = user?.completionPercentage || 85;

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
      {/* Welcome Banner */}
      <div
        className="dashboard-card"
        style={{
          background: 'var(--gradient-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-xl)',
          padding: '2.25rem',
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}
      >
        <div>
          <div style={{ fontSize: '0.85rem', color: 'var(--primary-600)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.25rem' }}>
            Career Intelligence Dashboard
          </div>
          <h1 style={{ fontSize: '2.1rem', marginBottom: '0.5rem' }}>
            Welcome back, <span className="gradient-text">{user?.fullName || 'Candidate'}</span>!
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '600px' }}>
            {user?.desiredRole ? `Focus Role: ${user.desiredRole}` : 'Explore tailored opportunities and track your skill development milestones.'}
          </p>
        </div>

        {/* Quick Actions */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => onNavigate('/assessment')}>
            <Sparkles size={16} /> Update Skills
          </button>
          <button className="btn btn-secondary btn-sm" onClick={() => onNavigate('/jobs')}>
            <Briefcase size={16} /> Explore Jobs
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => onNavigate('/recommendations')}>
            <TrendingUp size={16} /> Analyze Career
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="stat-card-row">
        {/* Metric 1: Profile Completion */}
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'var(--primary-100)', color: 'var(--primary-600)' }}>
            <User size={22} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Profile Completion</div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800 }}>{completionPct}%</div>
            <div className="progress-bar-container" style={{ margin: '0.35rem 0' }}>
              <div className="progress-bar-fill" style={{ width: `${completionPct}%` }}></div>
            </div>
          </div>
        </div>

        {/* Metric 2: Total Recommended Jobs */}
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'var(--success-bg)', color: 'var(--success)' }}>
            <Briefcase size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Recommended Roles</div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800 }}>{recommendations.length}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--success)' }}>Scored on actual data</div>
          </div>
        </div>

        {/* Metric 3: Saved Jobs */}
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'var(--info-bg)', color: 'var(--info)' }}>
            <Bookmark size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Saved Opportunities</div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800 }}>{savedJobs.length}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Bookmarked listings</div>
          </div>
        </div>

        {/* Metric 4: Top Match */}
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'var(--warning-bg)', color: 'var(--warning)' }}>
            <Award size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Peak Match Score</div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800 }}>
              {topMatch ? `${topMatch.matchPercentage}%` : 'N/A'}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {topMatch ? topMatch.title : 'Pending analysis'}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left 2 cols, Right 1 col */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '2rem' }}>
        {/* Left Column: Recent Recommendations & Target Roles */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1.35rem' }}>Top Matching Career Roles</h2>
            <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('/recommendations')}>
              View All ({recommendations.length}) <ArrowRight size={14} />
            </button>
          </div>

          {loading ? (
            <LoadingSkeleton count={2} height={160} />
          ) : recommendations.length === 0 ? (
            <div className="dashboard-card" style={{ textAlign: 'center', padding: '3rem' }}>
              <Compass size={36} color="var(--text-muted)" style={{ margin: '0 auto 1rem' }} />
              <h3>No recommendations yet</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                Complete the Skills Assessment to calculate tailored job recommendations.
              </p>
              <button className="btn btn-primary btn-sm" onClick={() => onNavigate('/assessment')}>
                Take Assessment
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {recommendations.slice(0, 3).map((job) => (
                <JobCard
                  key={job.jobId || job.id}
                  job={job}
                  onSelect={setSelectedJob}
                  onSaveToggle={handleSaveToggle}
                  isSaved={savedJobs.some((j) => (j.id || j.jobId) === (job.jobId || job.id))}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Skill Proficiency & Roadmaps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Skill Proficiency Breakdown */}
          <div className="dashboard-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.15rem' }}>Your Skill Proficiency</h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {user?.skills?.length || 0} Skills
              </span>
            </div>

            {(!user?.skills || user.skills.length === 0) ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                No skills entered yet. Update your assessment to visualize proficiencies.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {user.skills.slice(0, 6).map((s, idx) => {
                  const prof = s.proficiency || 'INTERMEDIATE';
                  const pct = prof === 'EXPERT' ? 95 : prof === 'ADVANCED' ? 80 : prof === 'INTERMEDIATE' ? 60 : 40;
                  return (
                    <div key={idx}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                        <span style={{ fontWeight: 600 }}>{s.skillName}</span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>{prof}</span>
                      </div>
                      <div className="progress-bar-container" style={{ height: '6px' }}>
                        <div
                          className="progress-bar-fill"
                          style={{
                            width: `${pct}%`,
                            background: pct >= 80 ? 'var(--gradient-primary)' : 'var(--info)',
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <button
              className="btn btn-outline btn-sm"
              style={{ width: '100%', marginTop: '1.25rem' }}
              onClick={() => onNavigate('/skill-gap')}
            >
              Analyze Skill Gap & Priority
            </button>
          </div>

          {/* Quick Learning & Roadmap Card */}
          <div className="dashboard-card" style={{ background: 'var(--primary-50)', border: '1px solid var(--primary-100)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: 'var(--primary-700)' }}>
              <BookOpen size={18} />
              <h3 style={{ fontSize: '1.1rem' }}>Learning Milestones</h3>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
              Follow suggested step-by-step milestones to prepare for technical interviews and build production-grade full-stack projects.
            </p>
            <button className="btn btn-primary btn-sm" style={{ width: '100%' }} onClick={() => onNavigate('/roadmap')}>
              Explore Career Roadmap
            </button>
          </div>
        </div>
      </div>

      {/* Job Details Modal */}
      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onSaveToggle={handleSaveToggle}
          isSaved={savedJobs.some((j) => (j.id || j.jobId) === (selectedJob.jobId || selectedJob.id))}
        />
      )}
    </div>
  );
};

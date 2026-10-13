import React, { useEffect, useState } from 'react';
import { Target, Search, Filter, Sparkles, AlertCircle, ArrowUpDown, Bookmark, RefreshCw } from 'lucide-react';
import { JobCard } from '../components/JobCard';
import { JobDetailModal } from '../components/JobDetailModal';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import api from '../services/api';

export const RecommendationsPage = ({ onNavigate }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [minMatch, setMinMatch] = useState(0);
  const [jobTypeFilter, setJobTypeFilter] = useState('ALL');

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const [recsRes, savedRes] = await Promise.all([
        api.get('/recommendations'),
        api.get('/jobs/saved'),
      ]);
      if (recsRes.data) setRecommendations(recsRes.data);
      if (savedRes.data) setSavedJobs(savedRes.data);
    } catch (e) {
      console.error('Failed to load recommendations:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
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
    } catch (e) {
      console.error('Failed to toggle save:', e);
    }
  };

  // Filter recommendations
  const filteredRecommendations = recommendations.filter((job) => {
    const matchesQuery =
      searchQuery === '' ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesScore = job.matchPercentage >= minMatch;
    const matchesType = jobTypeFilter === 'ALL' || job.jobType.toLowerCase() === jobTypeFilter.toLowerCase();

    return matchesQuery && matchesScore && matchesType;
  });

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <div className="hero-badge" style={{ marginBottom: '0.5rem' }}>
            <Sparkles size={14} />
            <span>Rule-Based Recommendation Engine</span>
          </div>
          <h1 style={{ fontSize: '2.2rem', marginBottom: '0.4rem' }}>Smart Job Recommendations</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '650px' }}>
            Roles ranked strictly by mathematical overlap with your technical competencies, experience level, and stated career interests.
          </p>
        </div>

        <button className="btn btn-secondary btn-sm" onClick={fetchRecommendations}>
          <RefreshCw size={15} /> Refresh Analysis
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="dashboard-card" style={{ marginBottom: '2rem', padding: '1.25rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '1rem' }}>
          {/* Search */}
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: '2.3rem' }}
              placeholder="Search by job title or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Min Match Filter */}
          <div>
            <select
              className="form-select"
              value={minMatch}
              onChange={(e) => setMinMatch(Number(e.target.value))}
            >
              <option value={0}>All Match Percentages</option>
              <option value={80}>High Match (80%+)</option>
              <option value={60}>Moderate Match (60%+)</option>
              <option value={40}>Developing Match (40%+)</option>
            </select>
          </div>

          {/* Job Type Filter */}
          <div>
            <select
              className="form-select"
              value={jobTypeFilter}
              onChange={(e) => setJobTypeFilter(e.target.value)}
            >
              <option value="ALL">All Employment Types</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Internship">Internship</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count & Transparent Legend */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem', fontSize: '0.88rem' }}>
        <div style={{ color: 'var(--text-secondary)' }}>
          Showing <strong>{filteredRecommendations.length}</strong> calculated job recommendations
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--success)' }}></span>
            <span>80%+ High Fit</span>
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--info)' }}></span>
            <span>60%–79% Moderate</span>
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--warning)' }}></span>
            <span>&lt;60% Skill Gap</span>
          </span>
        </div>
      </div>

      {/* Recommendations Cards Grid */}
      {loading ? (
        <LoadingSkeleton count={4} height={200} />
      ) : filteredRecommendations.length === 0 ? (
        <div className="dashboard-card" style={{ textAlign: 'center', padding: '3.5rem' }}>
          <AlertCircle size={40} color="var(--text-muted)" style={{ margin: '0 auto 1rem' }} />
          <h3>No matching jobs found</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1.25rem' }}>
            Try lowering the minimum match filter or updating your skills assessment to broaden results.
          </p>
          <button className="btn btn-primary btn-sm" onClick={() => onNavigate('/assessment')}>
            Update Skills Assessment
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.5rem' }}>
          {filteredRecommendations.map((job) => (
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

      {/* Details Modal */}
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

import React, { useEffect, useState } from 'react';
import { Search, MapPin, Briefcase, Filter, Bookmark, RefreshCw, AlertCircle, ArrowUpDown } from 'lucide-react';
import { JobCard } from '../components/JobCard';
import { JobDetailModal } from '../components/JobDetailModal';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export const JobsExplorePage = ({ onNavigate }) => {
  const { isAuthenticated, refreshUser } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);

  // Filters
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [viewSavedOnly, setViewSavedOnly] = useState(false);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (query) params.append('query', query);
      if (location) params.append('location', location);
      if (jobType) params.append('jobType', jobType);
      if (experienceLevel) params.append('experienceLevel', experienceLevel);

      const [jobsRes, savedRes] = await Promise.all([
        api.get(`/jobs?${params.toString()}`),
        isAuthenticated ? api.get('/jobs/saved') : Promise.resolve({ data: [] }),
      ]);

      if (jobsRes.data) setJobs(jobsRes.data);
      if (savedRes.data) setSavedJobs(savedRes.data);
    } catch (e) {
      console.error('Failed to load jobs:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [query, location, jobType, experienceLevel, isAuthenticated]);

  const handleSaveToggle = async (jobId) => {
    if (!isAuthenticated) {
      onNavigate('/login');
      return;
    }

    try {
      const isAlreadySaved = savedJobs.some((j) => (j.id || j.jobId) === jobId);
      if (isAlreadySaved) {
        await api.delete(`/jobs/${jobId}/save`);
        setSavedJobs((prev) => prev.filter((j) => (j.id || j.jobId) !== jobId));
      } else {
        await api.post(`/jobs/${jobId}/save`);
        const jobToAdd = jobs.find((j) => (j.id || j.jobId) === jobId);
        if (jobToAdd) setSavedJobs((prev) => [...prev, jobToAdd]);
      }
      refreshUser();
    } catch (e) {
      console.error('Save toggle failed:', e);
    }
  };

  // Filter for skill or saved-only
  const displayedJobs = (viewSavedOnly ? savedJobs : jobs).filter((job) => {
    if (!selectedSkill) return true;
    const hasInReq = job.requiredSkills?.some((s) =>
      (typeof s === 'string' ? s : s.skillName).toLowerCase().includes(selectedSkill.toLowerCase())
    );
    const hasInOpt = job.optionalSkills?.some((s) =>
      (typeof s === 'string' ? s : s.skillName).toLowerCase().includes(selectedSkill.toLowerCase())
    );
    return hasInReq || hasInOpt;
  });

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <div className="hero-badge" style={{ marginBottom: '0.5rem' }}>
            <Briefcase size={14} />
            <span>Curated Career Opportunities</span>
          </div>
          <h1 style={{ fontSize: '2.2rem', marginBottom: '0.4rem' }}>Explore Opportunities</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '650px' }}>
            Search open roles by skills, location, employment type, and experience requirements. Verified sample listings for platform demonstration.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {isAuthenticated && (
            <button
              className={`btn ${viewSavedOnly ? 'btn-primary' : 'btn-secondary'} btn-sm`}
              onClick={() => setViewSavedOnly(!viewSavedOnly)}
            >
              <Bookmark size={15} fill={viewSavedOnly ? 'currentColor' : 'none'} />
              <span>Saved Jobs ({savedJobs.length})</span>
            </button>
          )}
          <button className="btn btn-secondary btn-sm" onClick={fetchJobs}>
            <RefreshCw size={15} /> Refresh
          </button>
        </div>
      </div>

      {/* Search and Filters Strip */}
      <div className="dashboard-card" style={{ marginBottom: '2rem', padding: '1.25rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {/* Query input */}
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: '2.3rem' }}
              placeholder="Title or Company..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {/* Location input */}
          <div style={{ position: 'relative' }}>
            <MapPin size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: '2.3rem' }}
              placeholder="Location (e.g. Bangalore)..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          {/* Job Type select */}
          <div>
            <select
              className="form-select"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
            >
              <option value="">All Employment Types</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Internship">Internship</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          {/* Experience level select */}
          <div>
            <select
              className="form-select"
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
            >
              <option value="">All Experience Levels</option>
              <option value="Fresher">Fresher (0 yrs)</option>
              <option value="Junior">Junior (1-2 yrs)</option>
              <option value="Mid-Level">Mid-Level (3-5 yrs)</option>
              <option value="Senior">Senior (5+ yrs)</option>
            </select>
          </div>

          {/* Skill Filter input */}
          <div>
            <input
              type="text"
              className="form-input"
              placeholder="Filter by skill (e.g. Java, React)..."
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
        <div>
          Showing <strong>{displayedJobs.length}</strong> {viewSavedOnly ? 'saved' : 'available'} job positions
        </div>

        {(query || location || jobType || experienceLevel || selectedSkill || viewSavedOnly) && (
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => {
              setQuery('');
              setLocation('');
              setJobType('');
              setExperienceLevel('');
              setSelectedSkill('');
              setViewSavedOnly(false);
            }}
          >
            Clear All Filters
          </button>
        )}
      </div>

      {/* Jobs Grid */}
      {loading ? (
        <LoadingSkeleton count={6} height={200} />
      ) : displayedJobs.length === 0 ? (
        <div className="dashboard-card" style={{ textAlign: 'center', padding: '3.5rem' }}>
          <AlertCircle size={40} color="var(--text-muted)" style={{ margin: '0 auto 1rem' }} />
          <h3>No jobs match your selected criteria</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1.25rem' }}>
            Try clearing or adjusting your search keywords or location filters.
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.5rem' }}>
          {displayedJobs.map((job) => (
            <JobCard
              key={job.id || job.jobId}
              job={job}
              onSelect={setSelectedJob}
              onSaveToggle={handleSaveToggle}
              isSaved={savedJobs.some((j) => (j.id || j.jobId) === (job.id || job.jobId))}
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
          isSaved={savedJobs.some((j) => (j.id || j.jobId) === (selectedJob.id || selectedJob.jobId))}
        />
      )}
    </div>
  );
};

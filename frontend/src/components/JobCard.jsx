import React from 'react';
import { MapPin, Briefcase, Bookmark, ExternalLink, ArrowRight, Building, CheckCircle2 } from 'lucide-react';

export const JobCard = ({ job, onSelect, onSaveToggle, isSaved }) => {
  const jobId = job.id || job.jobId;
  const matchScore = job.matchPercentage !== undefined ? job.matchPercentage : null;
  const badgeClass = matchScore >= 80 ? 'match-high' : matchScore >= 60 ? 'match-med' : 'match-low';

  return (
    <div className="dashboard-card card-hover" style={{ display: 'flex', flexDirection: 'column', height: '100%', transition: 'all 200ms ease' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.85rem' }}>
        <div>
          <h3
            style={{ fontSize: '1.2rem', marginBottom: '0.25rem', cursor: 'pointer', transition: 'color 150ms' }}
            onClick={() => onSelect(job)}
            className="hover-primary"
          >
            {job.title}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            <Building size={14} />
            <span style={{ fontWeight: 600 }}>{job.company}</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {matchScore !== null && (
            <span className={`match-badge ${badgeClass}`}>
              {matchScore}% Match
            </span>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSaveToggle(jobId);
            }}
            className="btn btn-ghost btn-sm"
            style={{ padding: '0.35rem', borderRadius: '50%' }}
            title={isSaved ? 'Remove from saved' : 'Save job'}
          >
            <Bookmark size={17} fill={isSaved ? '#4f46e5' : 'none'} color={isSaved ? '#4f46e5' : 'var(--text-muted)'} />
          </button>
        </div>
      </div>

      {/* Meta tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <MapPin size={13} /> {job.location}
        </span>
        <span>•</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <Briefcase size={13} /> {job.jobType}
        </span>
        <span>•</span>
        <span>{job.experienceLevel}</span>
        {job.salaryRange && (
          <>
            <span>•</span>
            <span style={{ color: 'var(--success)', fontWeight: 600 }}>{job.salaryRange}</span>
          </>
        )}
      </div>

      {/* Match Reason snippet if available */}
      {job.matchExplanation && (
        <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '1rem', background: 'var(--bg-secondary)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', lineHeight: 1.4 }}>
          💡 {job.matchExplanation}
        </p>
      )}

      {/* Skills Snippet */}
      <div style={{ marginTop: 'auto', marginBottom: '1.25rem' }}>
        <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.4rem', letterSpacing: '0.04em' }}>
          Key Skills
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
          {/* If match results, show matching and missing skills */}
          {job.matchingSkills && job.matchingSkills.slice(0, 3).map((s, idx) => (
            <span key={idx} className="skill-chip skill-chip-matching" style={{ fontSize: '0.75rem', padding: '0.2rem 0.55rem' }}>
              ✓ {s}
            </span>
          ))}
          {job.missingSkills && job.missingSkills.slice(0, 2).map((s, idx) => (
            <span key={idx} className="skill-chip skill-chip-missing" style={{ fontSize: '0.75rem', padding: '0.2rem 0.55rem' }}>
              + {s}
            </span>
          ))}

          {/* Regular jobs skill list */}
          {!job.matchingSkills && job.requiredSkills && job.requiredSkills.slice(0, 4).map((s, idx) => (
            <span key={idx} className="skill-chip" style={{ fontSize: '0.75rem', padding: '0.2rem 0.55rem' }}>
              {typeof s === 'string' ? s : s.skillName}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.85rem', borderTop: '1px solid var(--border-color)' }}>
        <button
          className="btn btn-ghost btn-sm"
          style={{ padding: '0.35rem 0.5rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
          onClick={() => onSelect(job)}
        >
          <span>View Details</span>
          <ArrowRight size={14} />
        </button>

        <a
          href={job.applyUrl || '#'}
          target="_blank"
          rel="noreferrer"
          className="btn btn-secondary btn-sm"
          style={{ padding: '0.35rem 0.75rem', fontSize: '0.82rem' }}
          onClick={(e) => e.stopPropagation()}
        >
          <span>Apply</span>
          <ExternalLink size={13} />
        </a>
      </div>
    </div>
  );
};

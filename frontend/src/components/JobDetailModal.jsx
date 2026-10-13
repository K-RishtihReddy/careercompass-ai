import React from 'react';
import { X, MapPin, Briefcase, IndianRupee, ExternalLink, Bookmark, CheckCircle2, AlertTriangle, Building } from 'lucide-react';

export const JobDetailModal = ({ job, onClose, onSaveToggle, isSaved }) => {
  if (!job) return null;

  const matchScore = job.matchPercentage !== undefined ? job.matchPercentage : null;
  const badgeClass = matchScore >= 80 ? 'match-high' : matchScore >= 60 ? 'match-med' : 'match-low';

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
              <h2 style={{ fontSize: '1.45rem' }}>{job.title}</h2>
              {job.isSample && (
                <span style={{ fontSize: '0.72rem', padding: '0.15rem 0.5rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', color: 'var(--text-muted)' }}>
                  Sample Listing
                </span>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
              <Building size={16} />
              <span style={{ fontWeight: 600 }}>{job.company}</span>
              <span>•</span>
              <MapPin size={15} />
              <span>{job.location}</span>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Highlights Bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', marginBottom: '1.5rem', padding: '0.85rem 1rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.88rem' }}>
            <Briefcase size={15} color="var(--primary-600)" />
            <span>{job.jobType}</span>
          </div>
          <span>•</span>
          <div style={{ fontSize: '0.88rem' }}>Exp: <strong>{job.experienceLevel}</strong></div>
          {job.salaryRange && (
            <>
              <span>•</span>
              <div style={{ fontSize: '0.88rem', color: 'var(--success)', fontWeight: 600 }}>
                {job.salaryRange}
              </div>
            </>
          )}
          {matchScore !== null && (
            <div className={`match-badge ${badgeClass}`} style={{ marginLeft: 'auto' }}>
              {matchScore}% Profile Match
            </div>
          )}
        </div>

        {/* Match Breakdown if Recommendation */}
        {job.matchExplanation && (
          <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'var(--primary-50)', border: '1px solid var(--primary-100)', borderRadius: 'var(--radius-md)', fontSize: '0.9rem' }}>
            <div style={{ fontWeight: 700, color: 'var(--primary-700)', marginBottom: '0.35rem' }}>Why this job was recommended:</div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>{job.matchExplanation}</p>
          </div>
        )}

        {/* Skills section */}
        {job.matchingSkills && job.matchingSkills.length > 0 && (
          <div style={{ marginBottom: '1.25rem' }}>
            <h4 style={{ fontSize: '0.92rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--success)' }}>
              <CheckCircle2 size={16} /> Skills You Already Have ({job.matchingSkills.length})
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
              {job.matchingSkills.map((s, idx) => (
                <span key={idx} className="skill-chip skill-chip-matching">
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {job.missingSkills && job.missingSkills.length > 0 && (
          <div style={{ marginBottom: '1.25rem' }}>
            <h4 style={{ fontSize: '0.92rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--danger)' }}>
              <AlertTriangle size={16} /> Skills to Learn / Bridge Gap ({job.missingSkills.length})
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
              {job.missingSkills.map((s, idx) => (
                <span key={idx} className="skill-chip skill-chip-missing">
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Fallback to required skills if no match breakdown */}
        {!job.matchingSkills && job.requiredSkills && (
          <div style={{ marginBottom: '1.25rem' }}>
            <h4 style={{ fontSize: '0.92rem', marginBottom: '0.5rem' }}>Required Competencies:</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
              {job.requiredSkills.map((s, idx) => (
                <span key={idx} className="skill-chip">
                  {typeof s === 'string' ? s : s.skillName}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        <div style={{ marginBottom: '2rem' }}>
          <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Job Overview</h4>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.92rem', whiteSpace: 'pre-line' }}>
            {job.description}
          </p>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)' }}>
          <button
            className={`btn ${isSaved ? 'btn-secondary' : 'btn-outline'} btn-sm`}
            onClick={() => onSaveToggle(job.id || job.jobId)}
          >
            <Bookmark size={15} fill={isSaved ? 'currentColor' : 'none'} />
            {isSaved ? 'Saved' : 'Save Job'}
          </button>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn btn-ghost btn-sm" onClick={onClose}>
              Close
            </button>
            <a
              href={job.applyUrl || '#'}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <span>Apply Now</span>
              <ExternalLink size={15} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

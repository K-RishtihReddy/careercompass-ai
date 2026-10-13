import React, { useEffect, useState } from 'react';
import { Shield, Plus, Edit2, Trash2, Users, Briefcase, Award, MapPin, CheckCircle2, AlertCircle, X, Search, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import api from '../services/api';

export const AdminPage = ({ onNavigate }) => {
  const { user, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('jobs'); // 'jobs' | 'users'
  const [stats, setStats] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Job Form Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJobId, setEditingJobId] = useState(null);
  const [jobFormData, setJobFormData] = useState({
    title: '',
    company: '',
    location: '',
    jobType: 'Full-Time',
    experienceLevel: 'Fresher',
    salaryRange: '₹6.0 - 9.0 LPA',
    description: '',
    applyUrl: 'https://careers.example.com/apply',
    isSample: true,
    requiredSkillNames: '',
    optionalSkillNames: '',
  });

  const [notification, setNotification] = useState('');
  const [error, setError] = useState('');

  const fetchAdminData = async () => {
    setLoading(true);
    setError('');
    try {
      const [statsRes, jobsRes, usersRes] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/jobs'),
        api.get('/admin/users'),
      ]);

      if (statsRes.data) setStats(statsRes.data);
      if (jobsRes.data) setJobs(jobsRes.data);
      if (usersRes.data) setUsersList(usersRes.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch admin data. Ensure you have administrator rights.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchAdminData();
    }
  }, [isAdmin]);

  if (!isAdmin) {
    return (
      <div style={{ maxWidth: '600px', margin: '4rem auto', textAlign: 'center', padding: '3rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-xl)' }}>
        <Shield size={48} color="var(--danger)" style={{ margin: '0 auto 1rem' }} />
        <h2 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>Access Denied</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          This administration console is restricted to authenticated administrator accounts.
        </p>
        <button className="btn btn-primary" onClick={() => onNavigate('/')}>
          Return to Home
        </button>
      </div>
    );
  }

  const handleOpenAddModal = () => {
    setEditingJobId(null);
    setJobFormData({
      title: '',
      company: '',
      location: '',
      jobType: 'Full-Time',
      experienceLevel: 'Fresher',
      salaryRange: '₹6.0 - 9.0 LPA',
      description: '',
      applyUrl: 'https://careers.example.com/apply',
      isSample: true,
      requiredSkillNames: 'Java, Spring Boot, MySQL',
      optionalSkillNames: 'React, Git, Docker',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (job) => {
    setEditingJobId(job.id);
    const reqSkills = job.requiredSkills?.map((s) => (typeof s === 'string' ? s : s.skillName)).join(', ') || '';
    const optSkills = job.optionalSkills?.map((s) => (typeof s === 'string' ? s : s.skillName)).join(', ') || '';

    setJobFormData({
      title: job.title,
      company: job.company,
      location: job.location,
      jobType: job.jobType,
      experienceLevel: job.experienceLevel,
      salaryRange: job.salaryRange || '',
      description: job.description,
      applyUrl: job.applyUrl || '',
      isSample: job.isSample !== undefined ? job.isSample : true,
      requiredSkillNames: reqSkills,
      optionalSkillNames: optSkills,
    });
    setIsModalOpen(true);
  };

  const handleSaveJob = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: jobFormData.title,
        company: jobFormData.company,
        location: jobFormData.location,
        jobType: jobFormData.jobType,
        experienceLevel: jobFormData.experienceLevel,
        salaryRange: jobFormData.salaryRange,
        description: jobFormData.description,
        applyUrl: jobFormData.applyUrl,
        isSample: jobFormData.isSample,
        requiredSkillNames: jobFormData.requiredSkillNames
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        optionalSkillNames: jobFormData.optionalSkillNames
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
      };

      if (editingJobId) {
        await api.put(`/admin/jobs/${editingJobId}`, payload);
        setNotification('Job listing successfully updated.');
      } else {
        await api.post('/admin/jobs', payload);
        setNotification('New job listing successfully created.');
      }

      setIsModalOpen(false);
      fetchAdminData();
    } catch (err) {
      alert('Error saving job: ' + err.message);
    }
  };

  const handleDeleteJob = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      await api.delete(`/admin/jobs/${id}`);
      setNotification(`Job "${title}" deleted.`);
      fetchAdminData();
    } catch (err) {
      alert('Error deleting job: ' + err.message);
    }
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
      {/* Admin Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div className="hero-badge" style={{ background: 'rgba(236, 72, 153, 0.15)', color: '#ec4899', marginBottom: '0.4rem' }}>
            <Shield size={14} />
            <span>Administrator Control Center</span>
          </div>
          <h1 style={{ fontSize: '2.2rem', marginBottom: '0.25rem' }}>Admin Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
            Manage job inventory, skill mappings, platform configurations, and view registered user profiles.
          </p>
        </div>

        <button className="btn btn-primary" onClick={handleOpenAddModal}>
          <Plus size={16} /> Add New Job
        </button>
      </div>

      {notification && (
        <div style={{ background: 'var(--success-bg)', border: '1px solid var(--success-border)', color: 'var(--success)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
            <CheckCircle2 size={18} />
            <span>{notification}</span>
          </div>
          <button onClick={() => setNotification('')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--success)' }}>
            <X size={16} />
          </button>
        </div>
      )}

      {error && (
        <div style={{ background: 'var(--danger-bg)', border: '1px solid var(--danger-border)', color: 'var(--danger)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
          {error}
        </div>
      )}

      {/* Stats Strip */}
      {stats && (
        <div className="stat-card-row" style={{ marginBottom: '2rem' }}>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'var(--primary-100)', color: 'var(--primary-600)' }}>
              <Users size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Registered Candidates</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{stats.totalUsers}</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'var(--success-bg)', color: 'var(--success)' }}>
              <Briefcase size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Active Job Listings</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{stats.totalJobs}</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'var(--warning-bg)', color: 'var(--warning)' }}>
              <Award size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Master Skills</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{stats.totalSkills}</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'var(--info-bg)', color: 'var(--info)' }}>
              <Sparkles size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Completed Profiles</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{stats.completedAssessments}</div>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
        <button
          className={`btn ${activeTab === 'jobs' ? 'btn-primary' : 'btn-ghost'} btn-sm`}
          style={{ borderRadius: 'var(--radius-md) var(--radius-md) 0 0', padding: '0.65rem 1.25rem' }}
          onClick={() => setActiveTab('jobs')}
        >
          <Briefcase size={16} /> Manage Jobs ({jobs.length})
        </button>
        <button
          className={`btn ${activeTab === 'users' ? 'btn-primary' : 'btn-ghost'} btn-sm`}
          style={{ borderRadius: 'var(--radius-md) var(--radius-md) 0 0', padding: '0.65rem 1.25rem' }}
          onClick={() => setActiveTab('users')}
        >
          <Users size={16} /> Registered Users ({usersList.length})
        </button>
      </div>

      {/* Tab 1: Jobs Table */}
      {activeTab === 'jobs' && (
        <div className="dashboard-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '0.85rem 1.25rem', fontWeight: 700 }}>Job Title</th>
                  <th style={{ padding: '0.85rem 1.25rem', fontWeight: 700 }}>Company</th>
                  <th style={{ padding: '0.85rem 1.25rem', fontWeight: 700 }}>Location</th>
                  <th style={{ padding: '0.85rem 1.25rem', fontWeight: 700 }}>Type</th>
                  <th style={{ padding: '0.85rem 1.25rem', fontWeight: 700 }}>Experience</th>
                  <th style={{ padding: '0.85rem 1.25rem', fontWeight: 700, textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.id} style={{ borderBottom: '1px solid var(--border-subtle)', transition: 'background 150ms' }}>
                    <td style={{ padding: '1rem 1.25rem', fontWeight: 600 }}>{job.title}</td>
                    <td style={{ padding: '1rem 1.25rem' }}>{job.company}</td>
                    <td style={{ padding: '1rem 1.25rem', color: 'var(--text-muted)' }}>{job.location}</td>
                    <td style={{ padding: '1rem 1.25rem' }}>
                      <span className="skill-chip" style={{ fontSize: '0.78rem' }}>{job.jobType}</span>
                    </td>
                    <td style={{ padding: '1rem 1.25rem' }}>{job.experienceLevel}</td>
                    <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                        <button
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '0.35rem 0.65rem' }}
                          onClick={() => handleOpenEditModal(job)}
                          title="Edit Job"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          className="btn btn-outline btn-sm"
                          style={{ padding: '0.35rem 0.65rem', borderColor: 'var(--danger)', color: 'var(--danger)' }}
                          onClick={() => handleDeleteJob(job.id, job.title)}
                          title="Delete Job"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Users Table */}
      {activeTab === 'users' && (
        <div className="dashboard-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '0.85rem 1.25rem', fontWeight: 700 }}>Full Name</th>
                  <th style={{ padding: '0.85rem 1.25rem', fontWeight: 700 }}>Email</th>
                  <th style={{ padding: '0.85rem 1.25rem', fontWeight: 700 }}>Role</th>
                  <th style={{ padding: '0.85rem 1.25rem', fontWeight: 700 }}>Degree / Branch</th>
                  <th style={{ padding: '0.85rem 1.25rem', fontWeight: 700 }}>Desired Role</th>
                  <th style={{ padding: '0.85rem 1.25rem', fontWeight: 700 }}>Readiness</th>
                </tr>
              </thead>
              <tbody>
                {usersList.map((u) => (
                  <tr key={u.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '1rem 1.25rem', fontWeight: 600 }}>{u.fullName}</td>
                    <td style={{ padding: '1rem 1.25rem', color: 'var(--text-secondary)' }}>{u.email}</td>
                    <td style={{ padding: '1rem 1.25rem' }}>
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-sm)', background: u.role === 'ROLE_ADMIN' ? 'rgba(236,72,153,0.15)' : 'var(--primary-100)', color: u.role === 'ROLE_ADMIN' ? '#ec4899' : 'var(--primary-700)' }}>
                        {u.role}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1.25rem' }}>{u.degree || 'Not provided'}</td>
                    <td style={{ padding: '1rem 1.25rem' }}>{u.desiredRole || 'Flexible'}</td>
                    <td style={{ padding: '1rem 1.25rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontWeight: 600 }}>{u.completionPercentage}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Job Modal */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 style={{ fontSize: '1.4rem' }}>{editingJobId ? 'Edit Job Listing' : 'Add New Job Listing'}</h2>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveJob}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Job Title *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={jobFormData.title}
                    onChange={(e) => setJobFormData({ ...jobFormData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Company Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={jobFormData.company}
                    onChange={(e) => setJobFormData({ ...jobFormData, company: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Location *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={jobFormData.location}
                    onChange={(e) => setJobFormData({ ...jobFormData, location: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Employment Type</label>
                  <select
                    className="form-select"
                    value={jobFormData.jobType}
                    onChange={(e) => setJobFormData({ ...jobFormData, jobType: e.target.value })}
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Internship">Internship</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Experience Level</label>
                  <select
                    className="form-select"
                    value={jobFormData.experienceLevel}
                    onChange={(e) => setJobFormData({ ...jobFormData, experienceLevel: e.target.value })}
                  >
                    <option value="Fresher">Fresher</option>
                    <option value="Junior">Junior</option>
                    <option value="Mid-Level">Mid-Level</option>
                    <option value="Senior">Senior</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Salary Range</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. ₹6.0 - 9.0 LPA"
                    value={jobFormData.salaryRange}
                    onChange={(e) => setJobFormData({ ...jobFormData, salaryRange: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Apply URL</label>
                  <input
                    type="text"
                    className="form-input"
                    value={jobFormData.applyUrl}
                    onChange={(e) => setJobFormData({ ...jobFormData, applyUrl: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Required Skills (Comma separated) *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Java, Spring Boot, MySQL, REST APIs"
                  value={jobFormData.requiredSkillNames}
                  onChange={(e) => setJobFormData({ ...jobFormData, requiredSkillNames: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Optional / Bonus Skills (Comma separated)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Docker, React, Git, AWS"
                  value={jobFormData.optionalSkillNames}
                  onChange={(e) => setJobFormData({ ...jobFormData, optionalSkillNames: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Job Description *</label>
                <textarea
                  className="form-textarea"
                  value={jobFormData.description}
                  onChange={(e) => setJobFormData({ ...jobFormData, description: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  {editingJobId ? 'Update Listing' : 'Create Listing'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

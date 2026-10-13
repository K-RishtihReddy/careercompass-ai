import React, { useState } from 'react';
import { User, Mail, Lock, GraduationCap, Calendar, Award, UserPlus, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const RegisterPage = ({ onNavigate }) => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    educationLevel: "Bachelor's",
    degree: '',
    graduationYear: new Date().getFullYear(),
    experienceLevel: 'Fresher',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }

    setLoading(true);
    try {
      await register({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        educationLevel: formData.educationLevel,
        degree: formData.degree,
        graduationYear: parseInt(formData.graduationYear, 10),
        experienceLevel: formData.experienceLevel,
      });
      onNavigate('/assessment');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 180px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2.5rem 1.5rem' }}>
      <div style={{ maxWidth: '580px', width: '100%', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-xl)', padding: '2.5rem', boxShadow: 'var(--shadow-xl)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.85rem', marginBottom: '0.5rem' }}>Create Your Account</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
            Build your personalized profile to start receiving intelligent career recommendations.
          </p>
        </div>

        {error && (
          <div style={{ background: 'var(--danger-bg)', border: '1px solid var(--danger-border)', color: 'var(--danger)', padding: '0.85rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <div style={{ position: 'relative' }}>
                <User size={17} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  name="fullName"
                  className="form-input"
                  style={{ paddingLeft: '2.4rem' }}
                  placeholder="e.g. Rahul Sharma"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <div style={{ position: 'relative' }}>
                <Mail size={17} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  style={{ paddingLeft: '2.4rem' }}
                  placeholder="name@university.edu"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Password *</label>
              <div style={{ position: 'relative' }}>
                <Lock size={17} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="password"
                  name="password"
                  className="form-input"
                  style={{ paddingLeft: '2.4rem' }}
                  placeholder="Min. 6 chars"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password *</label>
              <div style={{ position: 'relative' }}>
                <Lock size={17} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-input"
                  style={{ paddingLeft: '2.4rem' }}
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Education Level *</label>
              <div style={{ position: 'relative' }}>
                <GraduationCap size={17} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <select
                  name="educationLevel"
                  className="form-select"
                  style={{ paddingLeft: '2.4rem' }}
                  value={formData.educationLevel}
                  onChange={handleChange}
                >
                  <option value="Bachelor's">Bachelor's Degree</option>
                  <option value="Master's">Master's Degree</option>
                  <option value="Diploma">Diploma / Associate</option>
                  <option value="PhD">Doctorate / PhD</option>
                  <option value="High School">High School</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Degree / Branch *</label>
              <input
                type="text"
                name="degree"
                className="form-input"
                placeholder="e.g. B.Tech Computer Science, BCA"
                value={formData.degree}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Graduation Year</label>
              <div style={{ position: 'relative' }}>
                <Calendar size={17} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="number"
                  name="graduationYear"
                  className="form-input"
                  style={{ paddingLeft: '2.4rem' }}
                  min="2015"
                  max="2032"
                  value={formData.graduationYear}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Experience Level *</label>
              <div style={{ position: 'relative' }}>
                <Award size={17} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <select
                  name="experienceLevel"
                  className="form-select"
                  style={{ paddingLeft: '2.4rem' }}
                  value={formData.experienceLevel}
                  onChange={handleChange}
                >
                  <option value="Fresher">Fresher (0 years)</option>
                  <option value="Junior">Junior (1 - 2 years)</option>
                  <option value="Intermediate">Intermediate (3 - 5 years)</option>
                  <option value="Experienced">Experienced (5+ years)</option>
                </select>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '1rem', padding: '0.8rem' }}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : <><UserPlus size={18} /> Create Account & Continue</>}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          Already have an account?{' '}
          <span
            style={{ color: 'var(--primary-600)', fontWeight: 600, cursor: 'pointer' }}
            onClick={() => onNavigate('/login')}
          >
            Sign in
          </span>
        </div>
      </div>
    </div>
  );
};

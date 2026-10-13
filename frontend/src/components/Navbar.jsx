import React, { useState } from 'react';
import { Compass, Moon, Sun, User, LogOut, ShieldCheck, Menu, X, Briefcase, Award, Map, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export const Navbar = ({ currentPath, onNavigate }) => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (path) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-inner">
        {/* Brand */}
        <div className="nav-brand" onClick={() => handleNav('/')} style={{ cursor: 'pointer' }}>
          <div className="nav-brand-icon">
            <Compass size={22} />
          </div>
          <span>CareerCompass <span className="gradient-text">AI</span></span>
        </div>

        {/* Desktop Links */}
        <ul className="nav-links">
          <li className={`nav-link ${currentPath === '/' ? 'active' : ''}`} onClick={() => handleNav('/')}>
            Home
          </li>
          <li className={`nav-link ${currentPath === '/jobs' ? 'active' : ''}`} onClick={() => handleNav('/jobs')}>
            <Briefcase size={16} /> Explore Jobs
          </li>
          <li className={`nav-link ${currentPath === '/roadmap' ? 'active' : ''}`} onClick={() => handleNav('/roadmap')}>
            <Map size={16} /> Career Roadmap
          </li>

          {isAuthenticated && (
            <>
              <li className={`nav-link ${currentPath === '/dashboard' ? 'active' : ''}`} onClick={() => handleNav('/dashboard')}>
                Dashboard
              </li>
              <li className={`nav-link ${currentPath === '/assessment' ? 'active' : ''}`} onClick={() => handleNav('/assessment')}>
                <Sparkles size={16} /> Assessment
              </li>
              <li className={`nav-link ${currentPath === '/recommendations' ? 'active' : ''}`} onClick={() => handleNav('/recommendations')}>
                Recommendations
              </li>
              <li className={`nav-link ${currentPath === '/skill-gap' ? 'active' : ''}`} onClick={() => handleNav('/skill-gap')}>
                <Award size={16} /> Skill Gap
              </li>
              {isAdmin && (
                <li className={`nav-link ${currentPath === '/admin' ? 'active' : ''}`} onClick={() => handleNav('/admin')} style={{ color: '#ec4899', fontWeight: 700 }}>
                  <ShieldCheck size={16} /> Admin
                </li>
              )}
            </>
          )}

          {!isAuthenticated && (
            <li className={`nav-link ${currentPath === '/assessment' ? 'active' : ''}`} onClick={() => handleNav('/assessment')}>
              <Sparkles size={16} /> Career Guidance
            </li>
          )}
        </ul>

        {/* Actions */}
        <div className="nav-actions">
          <button className="theme-toggle-btn" onClick={toggleTheme} title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}>
            {theme === 'dark' ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} color="#4f46e5" />}
          </button>

          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                onClick={() => handleNav('/dashboard')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.4rem 0.8rem',
                  background: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-color)',
                  cursor: 'pointer',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                }}
              >
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  <User size={14} />
                </div>
                <span>{user?.fullName?.split(' ')[0] || 'User'}</span>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={logout} title="Sign Out">
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '0.65rem' }}>
              <button className="btn btn-ghost btn-sm" onClick={() => handleNav('/login')}>
                Login
              </button>
              <button className="btn btn-primary btn-sm" onClick={() => handleNav('/register')}>
                Sign Up
              </button>
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            className="btn btn-ghost btn-sm"
            style={{ display: 'none', padding: '0.4rem' }}
            id="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{ padding: '1rem 1.5rem', background: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <span className="nav-link" onClick={() => handleNav('/')}>Home</span>
            <span className="nav-link" onClick={() => handleNav('/jobs')}>Explore Jobs</span>
            <span className="nav-link" onClick={() => handleNav('/roadmap')}>Career Roadmap</span>
            {isAuthenticated ? (
              <>
                <span className="nav-link" onClick={() => handleNav('/dashboard')}>Dashboard</span>
                <span className="nav-link" onClick={() => handleNav('/assessment')}>Skills Assessment</span>
                <span className="nav-link" onClick={() => handleNav('/recommendations')}>Recommendations</span>
                <span className="nav-link" onClick={() => handleNav('/skill-gap')}>Skill Gap Analysis</span>
                {isAdmin && <span className="nav-link" onClick={() => handleNav('/admin')}>Admin Console</span>}
                <button className="btn btn-outline btn-sm" onClick={logout} style={{ marginTop: '0.5rem' }}>Log Out</button>
              </>
            ) : (
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button className="btn btn-secondary btn-sm" onClick={() => handleNav('/login')}>Login</button>
                <button className="btn btn-primary btn-sm" onClick={() => handleNav('/register')}>Sign Up</button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

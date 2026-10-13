import React from 'react';
import { Compass, Heart, Code, Globe, Mail } from 'lucide-react';

export const Footer = ({ onNavigate }) => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <div className="nav-brand" style={{ marginBottom: '1rem', cursor: 'pointer' }} onClick={() => onNavigate('/')}>
            <div className="nav-brand-icon" style={{ width: 32, height: 32 }}>
              <Compass size={18} />
            </div>
            <span>CareerCompass <span className="gradient-text">AI</span></span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '320px', lineHeight: 1.6 }}>
            Empowering students and job seekers with transparent, rule-based career guidance, smart skill gap analysis, and tailored job recommendations.
          </p>
        </div>

        <div>
          <h4 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Platform</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            <li style={{ cursor: 'pointer' }} onClick={() => onNavigate('/')}>Home</li>
            <li style={{ cursor: 'pointer' }} onClick={() => onNavigate('/jobs')}>Explore Jobs</li>
            <li style={{ cursor: 'pointer' }} onClick={() => onNavigate('/assessment')}>Skills Assessment</li>
            <li style={{ cursor: 'pointer' }} onClick={() => onNavigate('/roadmap')}>Career Roadmaps</li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Intelligence</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            <li style={{ cursor: 'pointer' }} onClick={() => onNavigate('/recommendations')}>Job Match Engine</li>
            <li style={{ cursor: 'pointer' }} onClick={() => onNavigate('/skill-gap')}>Skill Gap Analyzer</li>
            <li style={{ cursor: 'pointer' }} onClick={() => onNavigate('/dashboard')}>Dashboard Metrics</li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Architecture</h4>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Full-Stack Java Spring Boot 3.3, MySQL 8.0 & React Vite architecture. Certified for academic demonstrations and portfolio showcases.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', color: 'var(--text-secondary)' }}>
            <a href="https://github.com" target="_blank" rel="noreferrer" style={{ padding: '0.4rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
              <Code size={16} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ padding: '0.4rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
              <Globe size={16} />
            </a>
            <a href="mailto:support@careercompass.ai" style={{ padding: '0.4rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
              <Mail size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div>© {new Date().getFullYear()} CareerCompass AI. Designed with modern full-stack web standards.</div>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <span>Transparent Rule-Based Matching</span>
          <span>Sample Job Listings Identified</span>
        </div>
      </div>
    </footer>
  );
};

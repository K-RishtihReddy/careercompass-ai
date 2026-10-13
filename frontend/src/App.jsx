import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { AssessmentPage } from './pages/AssessmentPage';
import { RecommendationsPage } from './pages/RecommendationsPage';
import { SkillGapPage } from './pages/SkillGapPage';
import { RoadmapPage } from './pages/RoadmapPage';
import { JobsExplorePage } from './pages/JobsExplorePage';
import { AdminPage } from './pages/AdminPage';

function AppContent() {
  const { isAuthenticated, loading } = useAuth();
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname || '/');

  // Sync browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Route protection
  const protectedRoutes = ['/dashboard', '/recommendations', '/skill-gap'];
  if (!loading && !isAuthenticated && protectedRoutes.includes(currentPath)) {
    return (
      <div className="app-container">
        <Navbar currentPath="/login" onNavigate={navigate} />
        <main className="main-content">
          <LoginPage onNavigate={navigate} />
        </main>
        <Footer onNavigate={navigate} />
      </div>
    );
  }

  const renderPage = () => {
    switch (currentPath) {
      case '/':
        return <LandingPage onNavigate={navigate} />;
      case '/login':
        return <LoginPage onNavigate={navigate} />;
      case '/register':
        return <RegisterPage onNavigate={navigate} />;
      case '/dashboard':
        return <DashboardPage onNavigate={navigate} />;
      case '/assessment':
        return <AssessmentPage onNavigate={navigate} />;
      case '/recommendations':
        return <RecommendationsPage onNavigate={navigate} />;
      case '/skill-gap':
        return <SkillGapPage onNavigate={navigate} />;
      case '/roadmap':
        return <RoadmapPage onNavigate={navigate} />;
      case '/jobs':
        return <JobsExplorePage onNavigate={navigate} />;
      case '/admin':
        return <AdminPage onNavigate={navigate} />;
      default:
        return <LandingPage onNavigate={navigate} />;
    }
  };

  return (
    <div className="app-container">
      <Navbar currentPath={currentPath} onNavigate={navigate} />
      <main className="main-content">
        {renderPage()}
      </main>
      <Footer onNavigate={navigate} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

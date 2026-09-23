import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/Toast';

import { HomePage } from './pages/HomePage';
import { TutorRegisterPage } from './pages/TutorRegisterPage';
import { TutorStatusPage } from './pages/TutorStatusPage';
import { ParentInquiryPage } from './pages/ParentInquiryPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';

const AppContent: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const isAdminDashboard = currentPath.startsWith('/admin/dashboard');

  return (
    <div className="flex flex-col min-h-screen font-sans bg-slate-50 text-slate-900">
      
      {!isAdminDashboard && (
        <Navbar currentPath={currentPath} onNavigate={handleNavigate} />
      )}

      <div className="flex-1">
        {currentPath === '/' && <HomePage onNavigate={handleNavigate} />}
        {currentPath === '/tutor/register' && <TutorRegisterPage />}
        {currentPath === '/tutor/status' && <TutorStatusPage />}
        {currentPath === '/parent/inquiry' && <ParentInquiryPage />}
        {currentPath === '/admin/login' && (
          <AdminLoginPage onSuccess={() => handleNavigate('/admin/dashboard')} />
        )}
        {currentPath === '/admin/dashboard' && (
          <AdminDashboardPage onNavigateHome={() => handleNavigate('/')} />
        )}
        {currentPath === '/about' && <AboutPage />}
        {currentPath === '/contact' && <ContactPage />}
        {currentPath === '/privacy-policy' && <PrivacyPolicyPage />}
        {currentPath === '/terms' && <TermsPage />}
      </div>

      {!isAdminDashboard && (
        <Footer onNavigate={handleNavigate} />
      )}

      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;

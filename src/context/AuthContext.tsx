import React, { createContext, useContext, useState, useEffect } from 'react';
import type { TutorApplication, ParentInquiry, TutorMatch } from '../types';
import { getTutors, getParentInquiries, getTutorMatches, updateTutorStatus as apiUpdateTutorStatus, updateInquiryStatus as apiUpdateInquiryStatus, saveTutorMatch as apiSaveTutorMatch } from '../lib/supabase';

interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
}

interface AuthContextType {
  isAdminLoggedIn: boolean;
  adminEmail: string | null;
  loginAdmin: (email: string, pass: string) => boolean;
  logoutAdmin: () => void;
  
  tutors: TutorApplication[];
  inquiries: ParentInquiry[];
  matches: TutorMatch[];
  loading: boolean;
  
  refreshData: () => Promise<void>;
  updateTutorStatus: (id: string, status: any, notes?: string) => Promise<void>;
  updateInquiryStatus: (id: string, status: any) => Promise<void>;
  saveTutorMatch: (match: any) => Promise<void>;
  
  toasts: ToastMessage[];
  addToast: (title: string, message: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('tutorconnect_admin_session') === 'true';
  });
  const [adminEmail, setAdminEmail] = useState<string | null>(() => {
    return localStorage.getItem('tutorconnect_admin_email') || null;
  });

  const [tutors, setTutors] = useState<TutorApplication[]>([]);
  const [inquiries, setInquiries] = useState<ParentInquiry[]>([]);
  const [matches, setMatches] = useState<TutorMatch[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (title: string, message: string, type: ToastMessage['type'] = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const refreshData = async () => {
    setLoading(true);
    try {
      const [tData, iData, mData] = await Promise.all([
        getTutors(),
        getParentInquiries(),
        getTutorMatches()
      ]);
      setTutors(tData);
      setInquiries(iData);
      setMatches(mData);
    } catch (err) {
      console.error('Error refreshing data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const loginAdmin = (email: string, pass: string): boolean => {
    if ((email === 'admin@tutorconnect.com' || email === 'admin') && (pass === 'admin123' || pass === 'admin')) {
      setIsAdminLoggedIn(true);
      setAdminEmail(email);
      localStorage.setItem('tutorconnect_admin_session', 'true');
      localStorage.setItem('tutorconnect_admin_email', email);
      addToast('Welcome Admin', 'Successfully logged into Admin Portal', 'success');
      return true;
    } else {
      addToast('Login Failed', 'Invalid admin email or password', 'error');
      return false;
    }
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    setAdminEmail(null);
    localStorage.removeItem('tutorconnect_admin_session');
    localStorage.removeItem('tutorconnect_admin_email');
    addToast('Logged Out', 'You have been logged out of the admin panel', 'info');
  };

  const handleUpdateTutorStatus = async (id: string, status: any, notes?: string) => {
    await apiUpdateTutorStatus(id, status, notes);
    await refreshData();
    addToast('Tutor Status Updated', `Tutor application status changed to ${status}`, 'success');
  };

  const handleUpdateInquiryStatus = async (id: string, status: any) => {
    await apiUpdateInquiryStatus(id, status);
    await refreshData();
    addToast('Inquiry Updated', `Inquiry status changed to ${status}`, 'success');
  };

  const handleSaveTutorMatch = async (matchData: any) => {
    await apiSaveTutorMatch(matchData);
    await refreshData();
    addToast('Tutor Assigned', 'Tutor matched and saved to parent inquiry', 'success');
  };

  return (
    <AuthContext.Provider
      value={{
        isAdminLoggedIn,
        adminEmail,
        loginAdmin,
        logoutAdmin,
        tutors,
        inquiries,
        matches,
        loading,
        refreshData,
        updateTutorStatus: handleUpdateTutorStatus,
        updateInquiryStatus: handleUpdateInquiryStatus,
        saveTutorMatch: handleSaveTutorMatch,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

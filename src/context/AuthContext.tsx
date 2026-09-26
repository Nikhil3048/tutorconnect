import React, { createContext, useContext, useState, useEffect } from 'react';
import type { TutorApplication, ParentInquiry, TutorMatch } from '../types';
import { getTutors, getParentInquiries, getTutorMatches, updateTutorStatus as apiUpdateTutorStatus, updateInquiryStatus as apiUpdateInquiryStatus, saveTutorMatch as apiSaveTutorMatch, clearAllLocalData, isSupabaseConfigured, supabase } from '../lib/supabase';

interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
}

interface AuthContextType {
  isAdminLoggedIn: boolean;
  adminEmail: string | null;
  loginAdmin: (email: string, pass: string) => Promise<boolean>;
  logoutAdmin: () => Promise<void>;
  
  tutors: TutorApplication[];
  inquiries: ParentInquiry[];
  matches: TutorMatch[];
  loading: boolean;
  
  refreshData: () => Promise<void>;
  clearAllData: () => Promise<void>;
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

  const loginAdmin = async (email: string, pass: string): Promise<boolean> => {
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !pass) {
      addToast('Missing Credentials', 'Please enter your admin email and password.', 'warning');
      return false;
    }

    if (isSupabaseConfigured && supabase) {
      try {
        // 1. Attempt Supabase Auth Login
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: pass,
        });

        if (!authError && authData?.user) {
          // Check role in public.profiles table
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', authData.user.id)
            .maybeSingle();

          if (profile && profile.role !== 'admin') {
            await supabase.auth.signOut();
            addToast('Access Denied', 'Your account is not authorized as an Admin in Supabase.', 'error');
            return false;
          }

          setIsAdminLoggedIn(true);
          setAdminEmail(cleanEmail);
          localStorage.setItem('tutorconnect_admin_session', 'true');
          localStorage.setItem('tutorconnect_admin_email', cleanEmail);
          addToast('Welcome Admin', `Authenticated via Supabase (${cleanEmail})`, 'success');
          return true;
        }

        // 2. Direct Query in public.profiles table (for admins added via Supabase SQL / Table Editor)
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('email', cleanEmail)
          .eq('role', 'admin')
          .maybeSingle();

        if (profile) {
          setIsAdminLoggedIn(true);
          setAdminEmail(cleanEmail);
          localStorage.setItem('tutorconnect_admin_session', 'true');
          localStorage.setItem('tutorconnect_admin_email', cleanEmail);
          addToast('Welcome Admin', `Authenticated as Admin (${cleanEmail})`, 'success');
          return true;
        }

        addToast('Login Failed', authError?.message || 'Invalid admin email or password', 'error');
        return false;
      } catch (err: any) {
        addToast('Authentication Error', err.message || 'Supabase authentication failed', 'error');
        return false;
      }
    }

    addToast('Authentication Required', 'Supabase connection is required to authenticate admin users.', 'error');
    return false;
  };

  const clearAllData = async () => {
    await clearAllLocalData();
    await refreshData();
    addToast('Data Wiped', 'All local and sample data cleared successfully', 'info');
  };

  const logoutAdmin = async () => {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        // Ignore signout error
      }
    }
    setIsAdminLoggedIn(false);
    setAdminEmail(null);
    localStorage.removeItem('tutorconnect_admin_session');
    localStorage.removeItem('tutorconnect_admin_email');
    addToast('Logged Out', 'You have been logged out of the admin panel', 'info');
  };

  const handleUpdateTutorStatus = async (id: string, status: any, notes?: string) => {
    setTutors(prev => prev.map(t => {
      if (t.id === id || t.applicationId === id) {
        return {
          ...t,
          status,
          adminNotes: notes !== undefined ? notes : t.adminNotes,
          updatedAt: new Date().toISOString(),
        };
      }
      return t;
    }));

    await apiUpdateTutorStatus(id, status, notes);
    await refreshData();
    addToast('Tutor Status Updated', `Tutor application status changed to ${status}`, 'success');
  };

  const handleUpdateInquiryStatus = async (id: string, status: any) => {
    setInquiries(prev => prev.map(i => {
      if (i.id === id || i.inquiryId === id) {
        return {
          ...i,
          status,
          updatedAt: new Date().toISOString(),
        };
      }
      return i;
    }));

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
        clearAllData,
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

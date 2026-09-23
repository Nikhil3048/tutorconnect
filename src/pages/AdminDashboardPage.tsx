import React from 'react';
import { AdminDashboard } from '../components/admin/AdminDashboard';
import { AdminLoginForm } from '../components/admin/AdminLoginForm';
import { useAuth } from '../context/AuthContext';

interface AdminDashboardPageProps {
  onNavigateHome: () => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onNavigateHome }) => {
  const { isAdminLoggedIn } = useAuth();

  if (!isAdminLoggedIn) {
    return (
      <div className="py-16 bg-slate-900 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <AdminLoginForm onSuccess={() => {}} />
        </div>
      </div>
    );
  }

  return <AdminDashboard onNavigateHome={onNavigateHome} />;
};

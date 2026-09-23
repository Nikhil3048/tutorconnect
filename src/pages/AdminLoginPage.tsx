import React from 'react';
import { AdminLoginForm } from '../components/admin/AdminLoginForm';

interface AdminLoginProps {
  onSuccess: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginProps> = ({ onSuccess }) => {
  return (
    <div className="py-16 bg-slate-900 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <AdminLoginForm onSuccess={onSuccess} />
      </div>
    </div>
  );
};

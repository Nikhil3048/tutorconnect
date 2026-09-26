import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, Lock, Mail, ArrowRight, Loader2 } from 'lucide-react';

interface LoginProps {
  onSuccess: () => void;
}

export const AdminLoginForm: React.FC<LoginProps> = ({ onSuccess }) => {
  const { loginAdmin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsSubmitting(true);
    try {
      const ok = await loginAdmin(email, password);
      if (ok) {
        onSuccess();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden p-8 sm:p-10 space-y-6">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-14 h-14 bg-slate-900 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto shadow-md">
          <ShieldCheck className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900">Admin Portal Login</h2>
        <p className="text-xs text-slate-500">
          Authorized compliance management and verification access only.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Admin Email
          </label>
          <div className="relative">
            <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              placeholder="admin@yourdomain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Password
          </label>
          <div className="relative">
            <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:bg-slate-700 text-white font-bold text-sm shadow-lg shadow-slate-900/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
              Authenticating with Supabase...
            </>
          ) : (
            <>
              Login to Admin Dashboard
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

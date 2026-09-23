import React, { useState } from 'react';
import { GraduationCap, Menu, X, ShieldCheck, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAdminLoggedIn, logoutAdmin } = useAuth();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Find a Tutor', path: '/parent/inquiry', highlight: true },
    { label: 'Tutor Registration', path: '/tutor/register' },
    { label: 'Check Status', path: '/tutor/status' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleNav = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => handleNav('/')}
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-200">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 bg-clip-text text-transparent tracking-tight">
                TutorConnect
              </span>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-blue-600">
                Verified Educator Portal
              </span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              if (link.highlight) {
                return (
                  <button
                    key={link.path}
                    onClick={() => handleNav(link.path)}
                    className="ml-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 transition-all flex items-center gap-1.5"
                  >
                    <Search className="w-4 h-4" />
                    {link.label}
                  </button>
                );
              }
              return (
                <button
                  key={link.path}
                  onClick={() => handleNav(link.path)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive 
                      ? 'text-blue-700 bg-blue-50 font-semibold' 
                      : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center space-x-3">
            {isAdminLoggedIn ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleNav('/admin/dashboard')}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold border flex items-center gap-1.5 transition-all ${
                    currentPath.startsWith('/admin')
                      ? 'bg-slate-900 text-white border-slate-900 shadow'
                      : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Admin Dashboard
                </button>
                <button
                  onClick={logoutAdmin}
                  className="text-xs text-rose-600 hover:underline font-medium px-2 py-1"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNav('/admin/login')}
                className="px-3.5 py-2 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-900 border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-white transition-all flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                Admin Portal
              </button>
            )}
          </div>

          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 shadow-xl animate-fade-in">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => handleNav(link.path)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between transition-colors ${
                currentPath === link.path
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>{link.label}</span>
              {link.highlight && <Search className="w-4 h-4 text-blue-600" />}
            </button>
          ))}
          
          <div className="pt-4 border-t border-slate-100">
            {isAdminLoggedIn ? (
              <button
                onClick={() => handleNav('/admin/dashboard')}
                className="w-full py-3 rounded-xl bg-slate-900 text-white font-semibold text-sm flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Open Admin Dashboard
              </button>
            ) : (
              <button
                onClick={() => handleNav('/admin/login')}
                className="w-full py-3 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-semibold text-sm flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-slate-500" />
                Admin Login
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

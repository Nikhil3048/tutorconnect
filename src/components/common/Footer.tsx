import React from 'react';
import { GraduationCap, Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          <div className="lg:col-span-2 space-y-4">
            <div 
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => onNavigate('/')}
            >
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-lg">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-2xl font-extrabold text-white tracking-tight">
                TutorConnect
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Connecting qualified, background-checked tutors with parents and students for personalized, result-oriented home and online learning across India.
            </p>
            <div className="pt-2 flex items-center space-x-3 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Background & Qualification Verified Tutors</span>
            </div>
          </div>

          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">For Tutors</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => onNavigate('/tutor/register')} 
                  className="hover:text-blue-400 transition-colors"
                >
                  Register as Tutor
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/tutor/status')} 
                  className="hover:text-blue-400 transition-colors"
                >
                  Check Application Status
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/tutor/register')} 
                  className="hover:text-blue-400 transition-colors"
                >
                  Verification Guidelines
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/contact')} 
                  className="hover:text-blue-400 transition-colors"
                >
                  Tutor Support
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">For Parents</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => onNavigate('/parent/inquiry')} 
                  className="hover:text-blue-400 transition-colors"
                >
                  Submit Tutor Inquiry
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/parent/inquiry')} 
                  className="hover:text-blue-400 transition-colors"
                >
                  Find Math & Physics Tutors
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/parent/inquiry')} 
                  className="hover:text-blue-400 transition-colors"
                >
                  Find Home Tutors
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/about')} 
                  className="hover:text-blue-400 transition-colors"
                >
                  How Tutor Matching Works
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Legal & Contact</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => onNavigate('/privacy-policy')} 
                  className="hover:text-blue-400 transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/terms')} 
                  className="hover:text-blue-400 transition-colors"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/admin/login')} 
                  className="hover:text-blue-400 transition-colors text-slate-400"
                >
                  Admin Portal Login
                </button>
              </li>
            </ul>
            <div className="mt-6 space-y-2 text-xs text-slate-400">
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>support@tutorconnect.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>New Delhi, India</span>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
          <p>© {new Date().getFullYear()} TutorConnect Education Platform. All rights reserved.</p>
          <div className="mt-4 sm:mt-0 flex items-center space-x-4">
            <button onClick={() => onNavigate('/privacy-policy')} className="hover:underline">Privacy</button>
            <button onClick={() => onNavigate('/terms')} className="hover:underline font-normal">Terms</button>
            <button onClick={() => onNavigate('/contact')} className="hover:underline">Contact</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

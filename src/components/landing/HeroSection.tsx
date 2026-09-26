import React from 'react';
import { ShieldCheck, Search, UserPlus, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onNavigate: (path: string) => void;
}

export const HeroSection: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-blue-50/60 via-slate-50 to-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-blue-400/10 via-indigo-500/10 to-purple-400/10 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-100/80 text-blue-800 text-xs sm:text-sm font-bold border border-blue-200 shadow-xs">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>100% Background & Qualification Verified Tutors</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] max-w-4xl mx-auto">
          Find the Right Tutor for Your{' '}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Learning Journey
          </span>
        </h1>

        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Connect students and parents with highly qualified, background-checked tutors for home tuition and online coaching across Mathematics, Science, Languages, and Competitive Exams.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onNavigate('/parent/inquiry')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-base shadow-xl shadow-blue-500/25 flex items-center justify-center gap-2.5 transition-all transform hover:scale-[1.02]"
          >
            <Search className="w-5 h-5" />
            Find a Tutor
          </button>

          <button
            onClick={() => onNavigate('/tutor/register')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-base border border-slate-300 shadow-md flex items-center justify-center gap-2.5 transition-all hover:border-slate-400"
          >
            <UserPlus className="w-5 h-5 text-blue-600" />
            Register as Tutor
          </button>
        </div>

        <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-slate-600 font-semibold">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Strict Document Verification</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Home & Online Tuition</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Zero Commission Setup</span>
          </div>
        </div>

      </div>
    </section>
  );
};


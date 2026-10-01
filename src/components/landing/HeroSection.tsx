import React from 'react';
import { ShieldCheck, Search, UserPlus, CheckCircle2, Sparkles, BookOpen, Target, TrendingUp } from 'lucide-react';

interface HeroProps {
  onNavigate: (path: string) => void;
}

export const HeroSection: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:pt-10 lg:pb-20 bg-gradient-to-b from-blue-50/70 via-slate-50 to-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-blue-400/15 via-indigo-500/15 to-purple-400/15 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Top Header Section */}
        <div className="text-center space-y-3 sm:space-y-4 max-w-4xl mx-auto px-2">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-100/90 text-blue-900 text-xs sm:text-sm font-bold border border-blue-200/80 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <span>100% Background & Qualification Verified Tutors</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.18]">
            Find the Right Tutor for Your{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Learning Journey
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Connect students and parents with highly qualified, background-checked tutors for home tuition and online coaching across Mathematics, Science, Languages, and Board Exams.
          </p>
        </div>

        {/* 1. CLEAN FULL-WIDTH HERO IMAGE (FIRST VISUAL BLOCK - NO TEXT OVERLAID) */}
        <div className="w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-2 sm:border-4 border-white bg-white group">
          <img
            src="/home_tuition_hero.png"
            alt="Home tuition teacher encouraging student during study session"
            className="w-full h-[260px] sm:h-[420px] lg:h-[500px] object-cover object-center group-hover:scale-[1.01] transition-transform duration-500"
          />
        </div>

        {/* 2. WRITTEN WORDS & FEATURES BELOW THE IMAGE */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
          
          {/* Importance of Home Tuition Section */}
          <div className="space-y-3 text-center sm:text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-lg bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200/80">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
              <span>The Power & Importance of Home Tuition</span>
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
              Personalized 1-on-1 Learning Builds Future Leaders
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
              Home tuition gives students the focused, individual care they need to master complex subjects, clear doubts without hesitation, build lifelong study habits, and achieve academic success.
            </p>
          </div>

          {/* Key Benefits Grid for Mobile & Desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-2">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-start space-x-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Focused Attention</h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">Tailored teaching pace suited to your child's learning speed.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-start space-x-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Doubt-Free Learning</h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">Safe environment to ask questions and clear doubts instantly.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-start space-x-3">
              <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Proven Results</h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">Consistent guidance leading to better grades and confidence.</p>
              </div>
            </div>
          </div>

          {/* Action Buttons (CTAs) BELOW the Text */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => onNavigate('/parent/inquiry')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm shadow-md flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01]"
              >
                <Search className="w-4 h-4" />
                Find a Tutor Now
              </button>

              <button
                onClick={() => onNavigate('/tutor/register')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-sm border border-slate-300 shadow-xs flex items-center justify-center gap-2 transition-all"
              >
                <UserPlus className="w-4 h-4 text-blue-600" />
                Register as Tutor
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-600 font-medium">
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Strict Document Verification</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Home & Online Tuition</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Zero Commission Setup</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};


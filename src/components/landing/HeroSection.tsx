import React from 'react';
import { ShieldCheck, Search, UserPlus, CheckCircle2, Award, Sparkles } from 'lucide-react';

interface HeroProps {
  onNavigate: (path: string) => void;
}

export const HeroSection: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-24 bg-gradient-to-b from-blue-50/70 via-slate-50 to-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-blue-400/15 via-indigo-500/15 to-purple-400/15 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header Section */}
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-100/90 text-blue-900 text-xs sm:text-sm font-bold border border-blue-200/80 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>100% Background & Qualification Verified Tutors</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Find the Right Tutor for Your{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Learning Journey
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Connect students and parents with highly qualified, background-checked tutors for home tuition and online coaching across Mathematics, Science, Languages, and Board Exams.
          </p>
        </div>

        {/* Full Width Hero Image Container with Text Overlaid at the Bottom */}
        <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
          
          {/* Main Full Width Image */}
          <img
            src="/home_tuition_hero.png"
            alt="Home tuition teacher assisting student with books"
            className="w-full h-[460px] sm:h-[540px] lg:h-[620px] object-cover object-center filter brightness-[0.92] group-hover:scale-[1.02] transition-transform duration-700"
          />

          {/* Dark Gradient Overlay at the Bottom of Image */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />

          {/* Floating Top Badge */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-white/40 flex items-center space-x-3 z-20">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-sm">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-xs font-extrabold text-slate-900">1-on-1 Personal Attention</span>
              <span className="block text-[10px] text-amber-600 font-bold">Empowering Academic Excellence</span>
            </div>
          </div>

          {/* Text Written at the Bottom of Image */}
          <div className="absolute bottom-0 inset-x-0 p-6 sm:p-10 text-white z-20 space-y-6">
            
            {/* Importance of Education Callout */}
            <div className="max-w-3xl space-y-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-lg bg-amber-500/30 text-amber-300 text-xs font-bold border border-amber-400/40 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>The Power & Importance of Home Tuition</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight text-white drop-shadow-md">
                Personalized 1-on-1 Learning Builds Future Leaders
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed drop-shadow-xs">
                Home tuition gives students the focused, individual care they need to master complex subjects, clear doubts without hesitation, build lifelong study habits, and achieve academic success.
              </p>
            </div>

            {/* Action Buttons & Badges Row at Bottom */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-white/20">
              
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => onNavigate('/parent/inquiry')}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]"
                >
                  <Search className="w-4 h-4" />
                  Find a Tutor Now
                </button>

                <button
                  onClick={() => onNavigate('/tutor/register')}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white/90 hover:bg-white text-slate-900 font-extrabold text-sm shadow-lg backdrop-blur-md flex items-center justify-center gap-2 transition-all"
                >
                  <UserPlus className="w-4 h-4 text-blue-600" />
                  Register as Tutor
                </button>
              </div>

              {/* Trust Badges on Right Side of Bottom Bar */}
              <div className="hidden lg:flex items-center space-x-6 text-xs text-slate-200 font-semibold">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Strict Document Check</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Home & Online Tuition</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Zero Commission Setup</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};


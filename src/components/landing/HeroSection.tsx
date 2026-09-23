import React from 'react';
import { GraduationCap, ShieldCheck, Search, UserPlus, Star, Award, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onNavigate: (path: string) => void;
}

export const HeroSection: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-blue-50/60 via-slate-50 to-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-blue-400/10 via-indigo-500/10 to-purple-400/10 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-100/80 text-blue-800 text-xs font-bold border border-blue-200 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>100% Background & Qualification Verified Tutors</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Find the Right Tutor for Your{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Learning Journey
              </span>
            </h1>

            <p className="text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Connect students and parents with highly qualified, background-checked tutors for home tuition and online coaching across Mathematics, Science, Languages, and Competitive Exams.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
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

            <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-600 font-semibold">
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

          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              <div className="bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 space-y-6 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
                      <GraduationCap className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Top Educator Pool</h4>
                      <p className="text-xs text-slate-500">Physics, Math, Bio & English</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                    98% Match Rate
                  </span>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center space-x-4">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
                    alt="Verified Tutor"
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-sm"
                  />
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-1.5">
                      <h5 className="font-extrabold text-slate-900 text-sm">Rahul Kumar, M.Sc</h5>
                      <ShieldCheck className="w-4 h-4 text-blue-600" />
                    </div>
                    <p className="text-xs text-slate-600">Senior Math & Physics Educator</p>
                    <div className="flex items-center space-x-1 text-amber-500 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>4.9 / 5.0 (6 Yrs Exp)</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-900 to-slate-900 text-white space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-blue-300">Live Matching Active</span>
                    <span className="text-emerald-400 font-mono text-[10px]">INQ-2026-0001</span>
                  </div>
                  <p className="text-xs text-slate-200">
                    Parent Inquiry matched with 3 approved tutors in South Delhi.
                  </p>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center space-x-3 z-20">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="font-extrabold text-slate-900 text-xs">Verified Credentials</h5>
                  <p className="text-[11px] text-slate-500">Degree & Aadhaar Verified</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

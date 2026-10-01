import React from 'react';
import { ShieldCheck, Search, UserPlus, CheckCircle2, Award, HeartHandshake, Sparkles } from 'lucide-react';

interface HeroProps {
  onNavigate: (path: string) => void;
}

export const HeroSection: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 bg-gradient-to-b from-blue-50/70 via-slate-50 to-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-blue-400/15 via-indigo-500/15 to-purple-400/15 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline, CTAs, Highlights */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-100/90 text-blue-900 text-xs sm:text-sm font-bold border border-blue-200/80 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>100% Background & Qualification Verified Tutors</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.18]">
              Find the Right Tutor for Your{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Learning Journey
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Unlock your child's full academic potential with dedicated 1-on-1 home tuition. Connect with verified, background-checked tutors for personalized attention in Mathematics, Science, Languages, and Board Exams.
            </p>

            {/* Importance of Education Callout */}
            <div className="p-4 rounded-2xl bg-white/80 border border-slate-200/80 shadow-xs flex items-start space-x-3 text-left max-w-xl mx-auto lg:mx-0">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Why Home Tuition Matters</h4>
                <p className="text-xs text-slate-600 mt-0.5 leading-snug">
                  Personalized 1-on-1 guidance builds core conceptual clarity, boosts confidence, and turns academic struggles into lasting success.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
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

            {/* Trust Badges */}
            <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs sm:text-sm text-slate-600 font-semibold">
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

          {/* Right Column: Featured Image with Floating Badges */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Soft backdrop glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-indigo-500/10 to-purple-500/20 rounded-3xl blur-2xl -z-10 transform scale-105" />

            <div className="relative w-full max-w-lg rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-white group">
              <img
                src="/home_tuition_hero.png"
                alt="Home tuition teacher assisting young student with books"
                className="w-full h-[400px] sm:h-[460px] object-cover group-hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />

              {/* Floating Top Badge */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-slate-100 flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xs font-extrabold text-slate-900">1-on-1 Personal Care</span>
                  <span className="block text-[10px] text-emerald-600 font-semibold">Home & In-Person Learning</span>
                </div>
              </div>

              {/* Floating Bottom Card */}
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg border border-slate-100 flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-extrabold text-slate-900">Quality Education First</span>
                  <span className="block text-[10px] text-slate-500 font-medium">Empowering Student Success</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};


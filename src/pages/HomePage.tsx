import React from 'react';
import { HeroSection } from '../components/landing/HeroSection';
import { WhyChooseUsSection } from '../components/landing/WhyChooseUsSection';
import { HowItWorksSection } from '../components/landing/HowItWorksSection';
import { StatsAndFeatures } from '../components/landing/StatsAndFeatures';
import { Search, UserPlus, ShieldCheck } from 'lucide-react';

interface HomeProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-0">
      <HeroSection onNavigate={onNavigate} />
      <StatsAndFeatures />
      <WhyChooseUsSection />
      <HowItWorksSection onNavigate={onNavigate} />
      
      {/* Bottom CTA Banner */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Ready to transform learning?</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Connect with Verified Tutors Today
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Whether you are a teacher looking for home or online tuition opportunities, or a parent seeking an expert educator for your child, TutorConnect is here to assist.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('/parent/inquiry')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-slate-100 text-blue-900 font-extrabold text-sm shadow-xl flex items-center justify-center gap-2 transition-all"
            >
              <Search className="w-4 h-4 text-blue-600" />
              Find a Tutor Now
            </button>
            <button
              onClick={() => onNavigate('/tutor/register')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-xl flex items-center justify-center gap-2 transition-all"
            >
              <UserPlus className="w-4 h-4" />
              Register as Tutor
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

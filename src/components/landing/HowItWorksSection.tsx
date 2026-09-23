import React, { useState } from 'react';
import { Search, UserPlus, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onNavigate: (path: string) => void;
}

export const HowItWorksSection: React.FC<HowItWorksProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'tutor' | 'parent'>('parent');

  const tutorSteps = [
    { num: '01', title: 'Register', desc: 'Create your tutor account and fill out personal & address details.' },
    { num: '02', title: 'Submit Documents', desc: 'Upload Class 10/12/Higher Ed marksheets and identity proof (Aadhaar/PAN).' },
    { num: '03', title: 'Admin Verification', desc: 'Our compliance team reviews and verifies your documents within 24-48 hours.' },
    { num: '04', title: 'Get Approved', desc: 'Once approved, your verified tutor badge is activated on the platform.' },
    { num: '05', title: 'Connect with Students', desc: 'Receive tuition matches based on your subject, fees, and location preferences.' },
  ];

  const parentSteps = [
    { num: '01', title: 'Submit Inquiry', desc: 'Fill out our quick 2-minute tutor requirement form.' },
    { num: '02', title: 'Tell Us Requirements', desc: 'Specify class, subjects required, preferred schedule, and budget range.' },
    { num: '03', title: 'We Find Suitable Tutors', desc: 'Our matching engine filters top verified tutors near your location.' },
    { num: '04', title: 'Connect & Learn', desc: 'Review tutor profiles, schedule a trial session, and start learning!' },
  ];

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-96 bg-blue-600/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-950/80 px-3.5 py-1.5 rounded-full border border-blue-800">
            Simple Step-by-Step Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            How TutorConnect Works
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Seamless process tailored specifically for educators and parents.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="bg-slate-800 p-1.5 rounded-2xl border border-slate-700 inline-flex space-x-2">
            <button
              onClick={() => setActiveTab('parent')}
              className={`px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                activeTab === 'parent'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Search className="w-4 h-4" />
              For Parents & Students
            </button>
            <button
              onClick={() => setActiveTab('tutor')}
              className={`px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                activeTab === 'tutor'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              For Teachers & Tutors
            </button>
          </div>
        </div>

        <div className="pt-4">
          {activeTab === 'parent' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {parentSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 relative hover:border-blue-500 transition-all group space-y-3"
                >
                  <div className="text-3xl font-black text-blue-500/40 group-hover:text-blue-400 transition-colors font-mono">
                    {step.num}
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {tutorSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-5 relative hover:border-blue-500 transition-all group space-y-2.5"
                >
                  <div className="text-2xl font-black text-emerald-500/40 group-hover:text-emerald-400 transition-colors font-mono">
                    {step.num}
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-8 text-center">
          {activeTab === 'parent' ? (
            <button
              onClick={() => onNavigate('/parent/inquiry')}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm shadow-xl shadow-blue-500/25 inline-flex items-center gap-2 transition-all transform hover:scale-105"
            >
              Start Tutor Search Now
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => onNavigate('/tutor/register')}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm shadow-xl shadow-emerald-500/25 inline-flex items-center gap-2 transition-all transform hover:scale-105"
            >
              Begin Tutor Registration
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </section>
  );
};

import React from 'react';

export const TermsPage: React.FC = () => {
  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 space-y-3 shadow-xl">
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Terms & Conditions of Service
          </h1>
          <p className="text-xs text-slate-300">
            TutorConnect Code of Conduct & Platform Usage Agreement
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6 text-xs text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">1. Educator Integrity & Truthfulness</h2>
            <p>
              By registering as a tutor on TutorConnect, you warrant that all educational degrees, experience records, identity numbers, and marksheets submitted are 100% genuine and unaltered. Providing fraudulent documents results in immediate rejection and permanent blacklisting.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">2. Parent & Student Expectations</h2>
            <p>
              Parent inquiries represent genuine tuition requirements. TutorConnect acts as a facilitating matching platform to connect verified tutors with suitable parent requirements.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

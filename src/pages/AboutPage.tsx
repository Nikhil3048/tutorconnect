import React from 'react';
import { GraduationCap, ShieldCheck, Target } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            About TutorConnect
          </h1>
          <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Empowering students with verified home and online educators while helping qualified teachers grow their tutoring careers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Our Mission</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              To provide every student with personalized, one-on-one academic guidance from thoroughly background-checked educators, ensuring safety, convenience, and measurable learning results.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Verification Standard</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We uphold zero tolerance for unverified profiles. Every tutor must submit government identity proofs (Aadhaar/PAN) and academic marksheets before being matched with students.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

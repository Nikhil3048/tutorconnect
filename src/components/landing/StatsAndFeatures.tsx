import React from 'react';

export const StatsAndFeatures: React.FC = () => {
  return (
    <section className="py-16 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          
          <div className="space-y-1">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-blue-600 font-mono">500+</h3>
            <p className="text-xs sm:text-sm font-semibold text-slate-700">Verified Tutors</p>
            <p className="text-[11px] text-slate-400">Strictly Background Verified</p>
          </div>

          <div className="space-y-1">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-indigo-600 font-mono">1,200+</h3>
            <p className="text-xs sm:text-sm font-semibold text-slate-700">Parent Inquiries</p>
            <p className="text-[11px] text-slate-400">Matched Across All Grades</p>
          </div>

          <div className="space-y-1">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-emerald-600 font-mono">98%</h3>
            <p className="text-xs sm:text-sm font-semibold text-slate-700">Satisfaction Rate</p>
            <p className="text-[11px] text-slate-400">High Score Improvement</p>
          </div>

          <div className="space-y-1">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-purple-600 font-mono">24 Hours</h3>
            <p className="text-xs sm:text-sm font-semibold text-slate-700">Average Turnaround</p>
            <p className="text-[11px] text-slate-400">Fast Document Verification</p>
          </div>

        </div>
      </div>
    </section>
  );
};

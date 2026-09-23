import React from 'react';
import { ShieldCheck, Award, DollarSign, Sparkles, Lock } from 'lucide-react';

export const WhyChooseUsSection: React.FC = () => {
  const features = [
    {
      title: 'Verified Tutors',
      description: 'Every educator undergoes strict government ID (Aadhaar/PAN) and academic degree verification by our compliance team.',
      icon: ShieldCheck,
      color: 'bg-blue-50 text-blue-600 border-blue-200',
    },
    {
      title: 'Qualified Teachers',
      description: 'Find subject specialists holding Bachelor’s, Master’s, or Doctorate degrees from top colleges with proven teaching credentials.',
      icon: Award,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    },
    {
      title: 'Flexible Fee Options',
      description: 'Transparent hourly, per-class, or monthly fee options tailored to your family’s learning budget with zero hidden costs.',
      icon: DollarSign,
      color: 'bg-amber-50 text-amber-600 border-amber-200',
    },
    {
      title: 'Personalized Tutor Matching',
      description: 'Our smart algorithm and admin coordinators match tutors based on subject, grade level, location, schedule, and preferred gender.',
      icon: Sparkles,
      color: 'bg-purple-50 text-purple-600 border-purple-200',
    },
    {
      title: 'Safe & Reliable Platform',
      description: 'All identity and qualification documents are encrypted in private storage vaults, keeping sensitive data strictly protected.',
      icon: Lock,
      color: 'bg-rose-50 text-rose-600 border-rose-200',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
            Why Choose TutorConnect
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Built for Academic Excellence & Trust
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            We bridge the gap between dedicated tutors and ambitious students through rigorous verification, seamless matching, and transparent communication.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:shadow-xl hover:border-blue-200 transition-all duration-300 group"
              >
                <div className={`w-14 h-14 rounded-2xl border ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

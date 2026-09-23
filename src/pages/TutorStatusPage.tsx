import React from 'react';
import { ApplicationStatusChecker } from '../components/tutor/ApplicationStatusChecker';

export const TutorStatusPage: React.FC = () => {
  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ApplicationStatusChecker />
      </div>
    </div>
  );
};

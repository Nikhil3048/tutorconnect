import React, { useState } from 'react';
import { TutorRegistrationWizard } from '../components/tutor/TutorRegistrationWizard';
import { ApplicationStatusChecker } from '../components/tutor/ApplicationStatusChecker';

export const TutorRegisterPage: React.FC = () => {
  const [completedAppId, setCompletedAppId] = useState<string | null>(null);

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Teacher & Tutor Registration
          </h1>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Complete the 6-step registration wizard below to submit your teaching details and verification documents.
          </p>
        </div>

        {completedAppId ? (
          <ApplicationStatusChecker initialAppId={completedAppId} />
        ) : (
          <TutorRegistrationWizard onSuccess={(appId) => setCompletedAppId(appId)} />
        )}
      </div>
    </div>
  );
};

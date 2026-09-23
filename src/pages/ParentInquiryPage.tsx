import React from 'react';
import { ParentInquiryForm } from '../components/parent/ParentInquiryForm';

export const ParentInquiryPage: React.FC = () => {
  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ParentInquiryForm />
      </div>
    </div>
  );
};

import React from 'react';
import { ShieldCheck, Lock, EyeOff, FileText } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 space-y-3 shadow-xl">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs">
            <Lock className="w-4 h-4" />
            <span>ENCRYPTED & COMPLIANT PRIVACY POLICY</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Privacy Policy & Document Protection Protocol
          </h1>
          <p className="text-xs text-slate-300">
            Last Updated: September 2026 • TutorConnect Compliance & Security Standards
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6 text-xs text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              1. Why We Collect Personal Details & Identity Documents
            </h2>
            <p>
              TutorConnect collects personal details (Full Name, Address, Contact details) and government-issued identity proof (Aadhaar Card, Voter ID, PAN Card, Driving Licence, Passport) and academic marksheets to perform mandatory background verification for student safety.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <EyeOff className="w-5 h-5 text-rose-600" />
              2. Strict Non-Public Document Access Policy
            </h2>
            <p>
              Uploaded identity documents and academic marksheets are stored in private, restricted Supabase storage buckets. They are strictly **NEVER** published on the public website, **NEVER** shown to parents or students, and **NEVER** shared with third parties.
            </p>
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-900 space-y-1 font-medium">
              <span className="font-bold block">Authorized Access Only:</span>
              <p>
                Only verified TutorConnect compliance administrators logged into protected control panels have encrypted access to inspect uploaded documents during verification.
              </p>
            </div>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-600" />
              3. Data Retention & Soft Deletion
            </h2>
            <p>
              Personal details and documents are retained securely for as long as the tutor remains active on the platform. Tutors may request account deactivation or update of documents at any time by contacting compliance@tutorconnect.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

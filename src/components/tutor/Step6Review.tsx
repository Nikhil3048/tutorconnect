import React from 'react';
import type { TutorApplication } from '../../types';
import { User, MapPin, GraduationCap, BookOpen, FileText } from 'lucide-react';

interface Step6Props {
  data: Partial<TutorApplication>;
  onChange: (fields: Partial<TutorApplication>) => void;
  errors: Record<string, string>;
  isSubmitting: boolean;
  onNavigateToStep: (step: number) => void;
}

export const Step6Review: React.FC<Step6Props> = ({
  data,
  onChange,
  errors,
  onNavigateToStep,
}) => {
  const confirmed = data.confirmedCorrect ?? false;
  const agreed = data.agreedToTerms ?? false;

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-bold text-slate-900">Step 6: Review & Submit Application</h3>
        <p className="text-sm text-slate-500 mt-1">
          Review all your details before final submission. Click "Edit" on any section to make updates.
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 relative">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
            <div className="flex items-center space-x-2 font-bold text-slate-800">
              <User className="w-4 h-4 text-blue-600" />
              <span>Personal Details</span>
            </div>
            <button
              type="button"
              onClick={() => onNavigateToStep(1)}
              className="text-xs text-blue-600 hover:text-blue-800 font-semibold hover:underline"
            >
              Edit
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-slate-400 block">Full Name</span>
              <span className="font-semibold text-slate-800">{data.fullName || '-'}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Guardian Name</span>
              <span className="font-semibold text-slate-800">{data.guardianName || '-'}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Gender & DOB</span>
              <span className="font-semibold text-slate-800">{data.gender || '-'} ({data.dob || '-'})</span>
            </div>
            <div>
              <span className="text-slate-400 block">Mobile & WhatsApp</span>
              <span className="font-semibold text-slate-800">{data.mobile || '-'}</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 relative">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
            <div className="flex items-center space-x-2 font-bold text-slate-800">
              <MapPin className="w-4 h-4 text-indigo-600" />
              <span>Address Details</span>
            </div>
            <button
              type="button"
              onClick={() => onNavigateToStep(2)}
              className="text-xs text-blue-600 hover:text-blue-800 font-semibold hover:underline"
            >
              Edit
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-400 block">Current Address</span>
              <span className="font-semibold text-slate-800">
                {data.currentAddress ? `${data.currentAddress.houseNo}, ${data.currentAddress.street}, ${data.currentAddress.city}, ${data.currentAddress.district}, ${data.currentAddress.state} - ${data.currentAddress.pincode}` : '-'}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block">Permanent Address</span>
              <span className="font-semibold text-slate-800">
                {data.sameAsCurrent ? 'Same as Current Address' : data.permanentAddress ? `${data.permanentAddress.houseNo}, ${data.permanentAddress.street}, ${data.permanentAddress.city}, ${data.permanentAddress.state}` : '-'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 relative">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
            <div className="flex items-center space-x-2 font-bold text-slate-800">
              <GraduationCap className="w-4 h-4 text-emerald-600" />
              <span>Educational Qualification</span>
            </div>
            <button
              type="button"
              onClick={() => onNavigateToStep(3)}
              className="text-xs text-blue-600 hover:text-blue-800 font-semibold hover:underline"
            >
              Edit
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <span className="text-slate-400 block">Class 10</span>
              <span className="font-semibold text-slate-800">{data.class10?.board} ({data.class10?.passingYear}) - {data.class10?.percentage}%</span>
            </div>
            <div>
              <span className="text-slate-400 block">Class 12</span>
              <span className="font-semibold text-slate-800">{data.class12?.stream} - {data.class12?.percentage}%</span>
            </div>
            <div>
              <span className="text-slate-400 block">Highest Degree</span>
              <span className="font-semibold text-slate-800">{data.higherEdu?.degree} ({data.higherEdu?.institution})</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 relative">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
            <div className="flex items-center space-x-2 font-bold text-slate-800">
              <BookOpen className="w-4 h-4 text-purple-600" />
              <span>Teaching Preferences & Fees</span>
            </div>
            <button
              type="button"
              onClick={() => onNavigateToStep(4)}
              className="text-xs text-blue-600 hover:text-blue-800 font-semibold hover:underline"
            >
              Edit
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <span className="text-slate-400 block">Subjects</span>
              <span className="font-semibold text-slate-800">{data.teaching?.subjects.join(', ')}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Classes</span>
              <span className="font-semibold text-slate-800">{data.teaching?.classes.join(', ')}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Expected Fees</span>
              <span className="font-semibold text-slate-800">₹{data.teaching?.minFee} - ₹{data.teaching?.maxFee} ({data.teaching?.feeType})</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 relative">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
            <div className="flex items-center space-x-2 font-bold text-slate-800">
              <FileText className="w-4 h-4 text-amber-600" />
              <span>Identity Document</span>
            </div>
            <button
              type="button"
              onClick={() => onNavigateToStep(5)}
              className="text-xs text-blue-600 hover:text-blue-800 font-semibold hover:underline"
            >
              Edit
            </button>
          </div>
          <div className="flex items-center space-x-4 text-xs">
            <div>
              <span className="text-slate-400 block">Document Type</span>
              <span className="font-semibold text-slate-800">{data.identityDoc?.docType}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Document Number</span>
              <span className="font-semibold text-slate-800">{data.identityDoc?.docNumber}</span>
            </div>
            <div>
              <span className="text-slate-400 block">File Attached</span>
              <span className="font-semibold text-emerald-600">{data.identityDoc?.fileName || 'Attached'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-5 space-y-3">
        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => onChange({ confirmedCorrect: e.target.checked })}
            className="mt-0.5 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <span className="text-xs font-semibold text-slate-800">
            I confirm that all the information and uploaded documents provided by me are genuine and correct to the best of my knowledge.
          </span>
        </label>
        {errors.confirmedCorrect && <p className="text-xs text-rose-600 pl-7">{errors.confirmedCorrect}</p>}

        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => onChange({ agreedToTerms: e.target.checked })}
            className="mt-0.5 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <span className="text-xs font-semibold text-slate-800">
            I agree to TutorConnect's Terms & Conditions, Privacy Policy, and background verification procedures.
          </span>
        </label>
        {errors.agreedToTerms && <p className="text-xs text-rose-600 pl-7">{errors.agreedToTerms}</p>}
      </div>
    </div>
  );
};

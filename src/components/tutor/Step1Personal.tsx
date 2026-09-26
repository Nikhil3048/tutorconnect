import React from 'react';
import type { TutorApplication, Gender } from '../../types';
import { FileUpload } from '../common/FileUpload';
import { User, Calendar, Phone, Mail, Users } from 'lucide-react';

interface Step1Props {
  data: Partial<TutorApplication>;
  onChange: (fields: Partial<TutorApplication>) => void;
  errors: Record<string, string>;
}

export const Step1Personal: React.FC<Step1Props> = ({ data, onChange, errors }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-slate-900">Step 1: Personal Details</h3>
        <p className="text-sm text-slate-500 mt-1">
          Provide your basic personal contact information and upload a recent passport-size photo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <User className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="e.g. Rahul Kumar"
              value={data.fullName || ''}
              onChange={(e) => onChange({ fullName: e.target.value })}
              className={`w-full pl-11 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                errors.fullName ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/30' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
              }`}
            />
          </div>
          {errors.fullName && <p className="text-xs text-rose-500 mt-1">{errors.fullName}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Father's / Mother's / Guardian's Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Users className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="e.g. Ramesh Kumar"
              value={data.guardianName || ''}
              onChange={(e) => onChange({ guardianName: e.target.value })}
              className={`w-full pl-11 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                errors.guardianName ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/30' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
              }`}
            />
          </div>
          {errors.guardianName && <p className="text-xs text-rose-500 mt-1">{errors.guardianName}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Date of Birth <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Calendar className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="date"
              value={data.dob || ''}
              onChange={(e) => onChange({ dob: e.target.value })}
              className={`w-full pl-11 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                errors.dob ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/30' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
              }`}
            />
          </div>
          {errors.dob && <p className="text-xs text-rose-500 mt-1">{errors.dob}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Gender <span className="text-rose-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-3">
            {(['Male', 'Female', 'Other'] as Gender[]).map((g) => (
              <label
                key={g}
                className={`flex items-center justify-center py-2.5 px-3 rounded-xl border text-sm font-medium cursor-pointer transition-all ${
                  data.gender === g
                    ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={data.gender === g}
                  onChange={() => onChange({ gender: g })}
                  className="sr-only"
                />
                {g}
              </label>
            ))}
          </div>
          {errors.gender && <p className="text-xs text-rose-500 mt-1">{errors.gender}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Mobile Number <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Phone className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="tel"
              placeholder="10-digit phone number"
              value={data.mobile || ''}
              onChange={(e) => onChange({ mobile: e.target.value, whatsapp: data.whatsapp || e.target.value })}
              className={`w-full pl-11 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                errors.mobile ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/30' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
              }`}
            />
          </div>
          {errors.mobile && <p className="text-xs text-rose-500 mt-1">{errors.mobile}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            WhatsApp Number <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Phone className="w-5 h-5 text-emerald-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="tel"
              placeholder="10-digit WhatsApp number"
              value={data.whatsapp || ''}
              onChange={(e) => onChange({ whatsapp: e.target.value })}
              className={`w-full pl-11 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                errors.whatsapp ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/30' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
              }`}
            />
          </div>
          {errors.whatsapp && <p className="text-xs text-rose-500 mt-1">{errors.whatsapp}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              placeholder="name@example.com"
              value={data.email || ''}
              onChange={(e) => onChange({ email: e.target.value })}
              className={`w-full pl-11 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                errors.email ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/30' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
              }`}
            />
          </div>
          {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Alternate Contact Number <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <Phone className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="tel"
              placeholder="Landline or secondary mobile"
              value={data.alternateContact || ''}
              onChange={(e) => onChange({ alternateContact: e.target.value })}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
            />
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-slate-100">
        <FileUpload
          label="Profile / Passport-size Photo (Optional)"
          required={false}
          isImage
          accept="image/jpeg,image/png,image/webp"
          maxSizeMB={5}
          helpText="JPG, PNG, or WebP up to 5 MB"
          valueUrl={data.photoUrl}
          valueFileName={data.photoFileName}
          onFileSelect={({ url, fileName }) => onChange({ photoUrl: url, photoFileName: fileName })}
          onFileRemove={() => onChange({ photoUrl: undefined, photoFileName: undefined })}
        />
        {errors.photoUrl && <p className="text-xs text-rose-500 mt-1">{errors.photoUrl}</p>}
      </div>
    </div>
  );
};

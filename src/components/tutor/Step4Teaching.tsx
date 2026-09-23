import React, { useState } from 'react';
import type { TutorApplication, TeachingDetails, LocationPreference, FeeType } from '../../types';
import { BookOpen, Clock, MapPin, Briefcase, Check } from 'lucide-react';

interface Step4Props {
  data: Partial<TutorApplication>;
  onChange: (fields: Partial<TutorApplication>) => void;
  errors: Record<string, string>;
}

const AVAILABLE_SUBJECTS = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'English',
  'Hindi',
  'Computer Science',
  'Social Science',
  'Science',
  'Accountancy',
  'Business Studies',
  'Economics',
];

const AVAILABLE_CLASSES = [
  'Class 1–5',
  'Class 6–8',
  'Class 9',
  'Class 10',
  'Class 11',
  'Class 12',
  'College',
];

const DAYS_LIST = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const Step4Teaching: React.FC<Step4Props> = ({ data, onChange, errors }) => {
  const teaching: TeachingDetails = data.teaching || {
    subjects: ['Mathematics'],
    classes: ['Class 9', 'Class 10'],
    yearsOfExperience: 3,
    previousExperience: '',
    currentOccupation: 'Private Tutor',
    teachingMode: 'Both',
    preferredLocations: ['Home Tuition', 'Online'],
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    availableTimeSlots: ['Evening'],
    minFee: 3000,
    maxFee: 6000,
    feeType: 'Per Month',
  };

  const [customSubjectInput, setCustomSubjectInput] = useState(teaching.customSubject || '');

  const toggleSubject = (sub: string) => {
    const current = teaching.subjects || [];
    const updated = current.includes(sub)
      ? current.filter((s) => s !== sub)
      : [...current, sub];
    onChange({ teaching: { ...teaching, subjects: updated } });
  };

  const toggleClass = (cls: string) => {
    const current = teaching.classes || [];
    const updated = current.includes(cls)
      ? current.filter((c) => c !== cls)
      : [...current, cls];
    onChange({ teaching: { ...teaching, classes: updated } });
  };

  const toggleLocation = (loc: LocationPreference) => {
    const current = teaching.preferredLocations || [];
    const updated = current.includes(loc)
      ? current.filter((l) => l !== loc)
      : [...current, loc];
    onChange({ teaching: { ...teaching, preferredLocations: updated } });
  };

  const toggleDay = (day: string) => {
    const current = teaching.availableDays || [];
    const updated = current.includes(day)
      ? current.filter((d) => d !== day)
      : [...current, day];
    onChange({ teaching: { ...teaching, availableDays: updated } });
  };

  const toggleTimeSlot = (slot: 'Morning' | 'Afternoon' | 'Evening') => {
    const current = teaching.availableTimeSlots || [];
    const updated = current.includes(slot)
      ? current.filter((s) => s !== slot)
      : [...current, slot];
    onChange({ teaching: { ...teaching, availableTimeSlots: updated } });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-bold text-slate-900">Step 4: Teaching Details</h3>
        <p className="text-sm text-slate-500 mt-1">
          Specify the subjects, grades, teaching location preferences, availability, and fee expectations.
        </p>
      </div>

      <div className="bg-slate-50/70 rounded-2xl p-5 border border-slate-200 space-y-4">
        <div className="flex items-center space-x-2 text-blue-700 font-bold">
          <BookOpen className="w-5 h-5" />
          <h4 className="text-base">Subjects You Can Teach <span className="text-rose-500">*</span></h4>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {AVAILABLE_SUBJECTS.map((sub) => {
            const isSelected = teaching.subjects.includes(sub);
            return (
              <button
                key={sub}
                type="button"
                onClick={() => toggleSubject(sub)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5" />}
                {sub}
              </button>
            );
          })}
        </div>

        <div className="pt-2 flex items-center space-x-2">
          <input
            type="text"
            placeholder="Add custom subject (e.g. French, Coding, SAT Math)"
            value={customSubjectInput}
            onChange={(e) => {
              setCustomSubjectInput(e.target.value);
              onChange({ teaching: { ...teaching, customSubject: e.target.value } });
            }}
            className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:border-blue-500 focus:outline-none bg-white"
          />
          {teaching.customSubject && (
            <span className="text-xs bg-emerald-100 text-emerald-800 px-3 py-2 rounded-xl font-semibold">
              Added: {teaching.customSubject}
            </span>
          )}
        </div>
        {errors['teaching.subjects'] && <p className="text-xs text-rose-500">{errors['teaching.subjects']}</p>}
      </div>

      <div className="bg-slate-50/70 rounded-2xl p-5 border border-slate-200 space-y-4">
        <div className="flex items-center space-x-2 text-indigo-700 font-bold">
          <BookOpen className="w-5 h-5" />
          <h4 className="text-base">Classes / Grades You Can Teach <span className="text-rose-500">*</span></h4>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {AVAILABLE_CLASSES.map((cls) => {
            const isSelected = teaching.classes.includes(cls);
            return (
              <button
                key={cls}
                type="button"
                onClick={() => toggleClass(cls)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5" />}
                {cls}
              </button>
            );
          })}
        </div>
        {errors['teaching.classes'] && <p className="text-xs text-rose-500">{errors['teaching.classes']}</p>}
      </div>

      <div className="bg-slate-50/70 rounded-2xl p-5 border border-slate-200 space-y-4">
        <div className="flex items-center space-x-2 text-slate-800 font-bold">
          <Briefcase className="w-5 h-5 text-emerald-600" />
          <h4 className="text-base">Teaching Experience</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Years of Teaching Experience <span className="text-rose-500">*</span>
            </label>
            <input
              type="number"
              min={0}
              max={40}
              placeholder="e.g. 5"
              value={teaching.yearsOfExperience}
              onChange={(e) => onChange({ teaching: { ...teaching, yearsOfExperience: parseInt(e.target.value) || 0 } })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:outline-none bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Current Occupation <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. School Teacher / Full-time Home Tutor / M.Sc Student"
              value={teaching.currentOccupation}
              onChange={(e) => onChange({ teaching: { ...teaching, currentOccupation: e.target.value } })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:outline-none bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
            Previous Teaching History / Profile Details <span className="text-rose-500">*</span>
          </label>
          <textarea
            rows={3}
            placeholder="Describe previous institutes, coaching centers, or home tutoring achievements..."
            value={teaching.previousExperience}
            onChange={(e) => onChange({ teaching: { ...teaching, previousExperience: e.target.value } })}
            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:outline-none bg-white"
          />
        </div>
      </div>

      <div className="bg-slate-50/70 rounded-2xl p-5 border border-slate-200 space-y-4">
        <div className="flex items-center space-x-2 text-slate-800 font-bold">
          <MapPin className="w-5 h-5 text-amber-600" />
          <h4 className="text-base">Teaching Mode & Preferred Location</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Teaching Mode <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Online', 'Offline', 'Both'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => onChange({ teaching: { ...teaching, teachingMode: mode } })}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                    teaching.teachingMode === mode
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Preferred Locations <span className="text-rose-500">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {(['Home Tuition', "Student's Home", "Tutor's Home", 'Online', 'Coaching/Institute'] as LocationPreference[]).map((loc) => {
                const isSel = teaching.preferredLocations?.includes(loc);
                return (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => toggleLocation(loc)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      isSel ? 'bg-amber-600 text-white' : 'bg-white text-slate-700 border border-slate-200'
                    }`}
                  >
                    {loc}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-50/70 rounded-2xl p-5 border border-slate-200 space-y-4">
        <div className="flex items-center space-x-2 text-slate-800 font-bold">
          <Clock className="w-5 h-5 text-purple-600" />
          <h4 className="text-base">Availability & Expected Fees</h4>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Available Days
          </label>
          <div className="flex flex-wrap gap-2">
            {DAYS_LIST.map((day) => {
              const isSel = teaching.availableDays?.includes(day);
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isSel ? 'bg-purple-600 text-white' : 'bg-white text-slate-700 border border-slate-200'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Available Time Slots
          </label>
          <div className="flex flex-wrap gap-2">
            {(['Morning', 'Afternoon', 'Evening'] as const).map((slot) => {
              const isSel = teaching.availableTimeSlots?.includes(slot);
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => toggleTimeSlot(slot)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isSel ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 border border-slate-200'
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Minimum Fee (₹) <span className="text-rose-500">*</span>
            </label>
            <input
              type="number"
              placeholder="e.g. 3000"
              value={teaching.minFee}
              onChange={(e) => onChange({ teaching: { ...teaching, minFee: parseInt(e.target.value) || 0 } })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:outline-none bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Maximum Fee (₹) <span className="text-rose-500">*</span>
            </label>
            <input
              type="number"
              placeholder="e.g. 6000"
              value={teaching.maxFee}
              onChange={(e) => onChange({ teaching: { ...teaching, maxFee: parseInt(e.target.value) || 0 } })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:outline-none bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Fee Structure <span className="text-rose-500">*</span>
            </label>
            <select
              value={teaching.feeType}
              onChange={(e) => onChange({ teaching: { ...teaching, feeType: e.target.value as FeeType } })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:outline-none bg-white"
            >
              <option value="Per Month">Per Month</option>
              <option value="Per Hour">Per Hour</option>
              <option value="Per Class">Per Class</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

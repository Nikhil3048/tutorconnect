import React, { useState } from 'react';
import type { ParentInquiry, PreferredGender, QualificationPreference, TeachingMode } from '../../types';
import { submitParentInquiry } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { User, GraduationCap, DollarSign, MapPin, Clock, CheckCircle2, Sparkles, Search } from 'lucide-react';

const SUBJECT_OPTIONS = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'English',
  'Hindi',
  'Computer Science',
  'Social Science',
  'Accountancy',
  'Economics',
];

const CLASS_OPTIONS = [
  'Class 1–5',
  'Class 6',
  'Class 7',
  'Class 8',
  'Class 9',
  'Class 10',
  'Class 11',
  'Class 12',
  'College / Entrance Exam',
];

const DAYS_LIST = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const ParentInquiryForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedInquiry, setSubmittedInquiry] = useState<ParentInquiry | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { refreshData, addToast } = useAuth();

  const [formData, setFormData] = useState<Partial<ParentInquiry>>({
    parentName: '',
    mobile: '',
    whatsapp: '',
    email: '',
    studentName: '',
    studentAge: 14,
    currentClass: 'Class 10',
    schoolBoard: 'CBSE',
    subjectsRequired: ['Mathematics', 'Physics'],
    preferredGender: 'No Preference',
    qualificationPreference: 'Any Qualified Tutor',
    budgetRange: '₹4,000–₹6,000/month',
    minBudget: 4000,
    maxBudget: 6000,
    teachingMode: 'Both',
    address: {
      houseNo: '',
      street: '',
      city: 'New Delhi',
      district: 'South Delhi',
      state: 'Delhi',
      pincode: '110016',
    },
    preferredDays: ['Monday', 'Wednesday', 'Friday'],
    preferredTimeSlots: ['Evening'],
    additionalRequirements: '',
  });

  const toggleSubject = (sub: string) => {
    const current = formData.subjectsRequired || [];
    const updated = current.includes(sub)
      ? current.filter(s => s !== sub)
      : [...current, sub];
    setFormData(prev => ({ ...prev, subjectsRequired: updated }));
  };

  const toggleDay = (day: string) => {
    const current = formData.preferredDays || [];
    const updated = current.includes(day)
      ? current.filter(d => d !== day)
      : [...current, day];
    setFormData(prev => ({ ...prev, preferredDays: updated }));
  };

  const handleBudgetRangeSelect = (rangeLabel: string, min: number, max: number) => {
    setFormData(prev => ({
      ...prev,
      budgetRange: rangeLabel,
      minBudget: min,
      maxBudget: max,
    }));
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.parentName?.trim()) errs.parentName = 'Parent Name is required';
    if (!formData.studentName?.trim()) errs.studentName = 'Student Name is required';
    if (!formData.mobile || formData.mobile.length < 10) errs.mobile = 'Valid 10-digit mobile number is required';
    if (!formData.email || !formData.email.includes('@')) errs.email = 'Valid email is required';
    if (!formData.subjectsRequired || formData.subjectsRequired.length === 0) errs.subjectsRequired = 'Select at least 1 subject';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      addToast('Missing Fields', 'Please complete all required fields.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitParentInquiry(formData as any);
      setSubmittedInquiry(result);
      await refreshData();
      addToast('Inquiry Submitted!', `Inquiry ID: ${result.inquiryId}`, 'success');
    } catch (err) {
      console.error('Inquiry submission error:', err);
      addToast('Error', 'Failed to submit inquiry. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submittedInquiry) {
    return (
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 sm:p-12 max-w-2xl mx-auto text-center space-y-6 animate-slide-up">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-900">
            Tutor Inquiry Submitted!
          </h2>
          <p className="text-sm text-slate-600">
            Thank you <span className="font-bold">{submittedInquiry.parentName}</span>. Your tutor requirement for <span className="font-bold">{submittedInquiry.studentName}</span> has been logged.
          </p>
        </div>

        <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md space-y-2">
          <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold block">
            Your Unique Inquiry ID
          </span>
          <span className="text-3xl font-black text-blue-400 font-mono tracking-wider">
            {submittedInquiry.inquiryId}
          </span>
          <p className="text-[11px] text-slate-400">
            Submitted on {new Date(submittedInquiry.createdAt).toLocaleString()}
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 text-left text-xs text-blue-900 space-y-2">
          <h4 className="font-bold text-sm flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-blue-600" />
            What happens next?
          </h4>
          <p className="text-slate-700 leading-relaxed">
            Our Academic Coordinator will analyze your inquiry specifications ({submittedInquiry.subjectsRequired.join(', ')} for {submittedInquiry.currentClass}) and match verified tutors from your city within 24 hours.
          </p>
        </div>

        <button
          onClick={() => {
            setSubmittedInquiry(null);
            setFormData(prev => ({ ...prev, parentName: '', studentName: '' }));
          }}
          className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all"
        >
          Submit Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white p-8 sm:p-10 space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Personalized Tutor Matching</span>
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight">Find the Right Tutor for Your Child</h2>
        <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
          Tell us your student's subject requirements, grade level, schedule, and fee budget. We will shortlist top verified tutors for you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8">
        <div className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200 space-y-4">
          <div className="flex items-center space-x-2 text-blue-700 font-bold">
            <User className="w-5 h-5" />
            <h3 className="text-base">1. Parent & Student Contact Details</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Parent / Guardian Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Mrs. Ananya Roy"
                value={formData.parentName}
                onChange={(e) => setFormData(prev => ({ ...prev, parentName: e.target.value }))}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none ${
                  errors.parentName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 focus:border-blue-500'
                }`}
              />
              {errors.parentName && <p className="text-xs text-rose-500 mt-1">{errors.parentName}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Student Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Aarav Roy"
                value={formData.studentName}
                onChange={(e) => setFormData(prev => ({ ...prev, studentName: e.target.value }))}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none ${
                  errors.studentName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 focus:border-blue-500'
                }`}
              />
              {errors.studentName && <p className="text-xs text-rose-500 mt-1">{errors.studentName}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Mobile Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                placeholder="10-digit mobile number"
                value={formData.mobile}
                onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value, whatsapp: e.target.value }))}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none ${
                  errors.mobile ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 focus:border-blue-500'
                }`}
              />
              {errors.mobile && <p className="text-xs text-rose-500 mt-1">{errors.mobile}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none ${
                  errors.email ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 focus:border-blue-500'
                }`}
              />
              {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
            </div>
          </div>
        </div>

        <div className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200 space-y-4">
          <div className="flex items-center space-x-2 text-indigo-700 font-bold">
            <GraduationCap className="w-5 h-5" />
            <h3 className="text-base">2. Student Grade & Required Subjects</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Current Class / Grade <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.currentClass}
                onChange={(e) => setFormData(prev => ({ ...prev, currentClass: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:outline-none bg-white font-medium"
              >
                {CLASS_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                School Board <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.schoolBoard}
                onChange={(e) => setFormData(prev => ({ ...prev, schoolBoard: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:outline-none bg-white font-medium"
              >
                <option value="CBSE">CBSE</option>
                <option value="ICSE">ICSE</option>
                <option value="State Board">State Board</option>
                <option value="IB / IGCSE">IB / IGCSE</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
              Subjects Required <span className="text-rose-500">*</span> (Select all that apply)
            </label>
            <div className="flex flex-wrap gap-2.5">
              {SUBJECT_OPTIONS.map(sub => {
                const isSel = formData.subjectsRequired?.includes(sub);
                return (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => toggleSubject(sub)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isSel
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {sub}
                  </button>
                );
              })}
            </div>
            {errors.subjectsRequired && <p className="text-xs text-rose-500 mt-1">{errors.subjectsRequired}</p>}
          </div>
        </div>

        <div className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200 space-y-4">
          <div className="flex items-center space-x-2 text-emerald-700 font-bold">
            <DollarSign className="w-5 h-5" />
            <h3 className="text-base">3. Tutor Preferences & Monthly Budget</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Preferred Tutor Gender
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['No Preference', 'Male', 'Female'] as PreferredGender[]).map(g => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, preferredGender: g }))}
                    className={`py-2 px-2.5 rounded-xl border text-xs font-semibold transition-all ${
                      formData.preferredGender === g
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                        : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Qualification Preference
              </label>
              <select
                value={formData.qualificationPreference}
                onChange={(e) => setFormData(prev => ({ ...prev, qualificationPreference: e.target.value as QualificationPreference }))}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:outline-none bg-white font-medium"
              >
                <option value="Any Qualified Tutor">Any Qualified Tutor</option>
                <option value="Graduate">Graduate (B.Sc / B.Tech / B.A)</option>
                <option value="Postgraduate">Postgraduate (M.Sc / M.A / M.Tech / Ph.D)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
              Preferred Tutor Fee Range (Monthly)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {[
                { label: 'Below ₹2,000/month', min: 1000, max: 2000 },
                { label: '₹2,000–₹4,000/month', min: 2000, max: 4000 },
                { label: '₹4,000–₹6,000/month', min: 4000, max: 6000 },
                { label: '₹6,000–₹10,000/month', min: 6000, max: 10000 },
                { label: '₹10,000+/month', min: 10000, max: 25000 },
              ].map(tier => (
                <button
                  key={tier.label}
                  type="button"
                  onClick={() => handleBudgetRangeSelect(tier.label, tier.min, tier.max)}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all text-center ${
                    formData.budgetRange === tier.label
                      ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-xs'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {tier.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200 space-y-4">
          <div className="flex items-center space-x-2 text-amber-700 font-bold">
            <MapPin className="w-5 h-5" />
            <h3 className="text-base">4. Teaching Mode & Home Address</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Teaching Mode
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {(['Online', 'Offline', 'Both'] as TeachingMode[]).map(m => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, teachingMode: m }))}
                    className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                      formData.teachingMode === m
                        ? 'border-amber-600 bg-amber-50 text-amber-800'
                        : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                City / Locality
              </label>
              <input
                type="text"
                placeholder="e.g. South Extension, New Delhi"
                value={formData.address?.city}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  address: { ...prev.address!, city: e.target.value }
                }))}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:outline-none bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                District / PIN Code
              </label>
              <input
                type="text"
                placeholder="e.g. 110049"
                value={formData.address?.pincode}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  address: { ...prev.address!, pincode: e.target.value }
                }))}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:outline-none bg-white"
              />
            </div>
          </div>
        </div>

        <div className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200 space-y-4">
          <div className="flex items-center space-x-2 text-purple-700 font-bold">
            <Clock className="w-5 h-5" />
            <h3 className="text-base">5. Preferred Schedule & Additional Notes</h3>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Preferred Days
            </label>
            <div className="flex flex-wrap gap-2">
              {DAYS_LIST.map(day => {
                const isSel = formData.preferredDays?.includes(day);
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
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Additional Requirements / Learning Goals
            </label>
            <textarea
              rows={3}
              placeholder="Tell us anything specific about your student's learning pace, upcoming exams, or special instructions..."
              value={formData.additionalRequirements}
              onChange={(e) => setFormData(prev => ({ ...prev, additionalRequirements: e.target.value }))}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:outline-none bg-white"
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white font-extrabold text-base shadow-xl shadow-blue-500/25 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01] disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Submitting Tutor Requirement...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                Submit Tutor Inquiry
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
};

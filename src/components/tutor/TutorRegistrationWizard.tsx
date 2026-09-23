import React, { useState } from 'react';
import type { TutorApplication } from '../../types';
import { Step1Personal } from './Step1Personal';
import { Step2Address } from './Step2Address';
import { Step3Education } from './Step3Education';
import { Step4Teaching } from './Step4Teaching';
import { Step5Documents } from './Step5Documents';
import { Step6Review } from './Step6Review';
import { submitTutorApplication } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { CheckCircle2, ChevronRight, ChevronLeft, ShieldCheck, ArrowRight, Copy } from 'lucide-react';

interface WizardProps {
  onSuccess: (appId: string) => void;
}

const STEP_NAMES = [
  'Personal Details',
  'Address',
  'Education',
  'Teaching Details',
  'Documents',
  'Review & Submit',
];

export const TutorRegistrationWizard: React.FC<WizardProps> = ({ onSuccess }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedApp, setSubmittedApp] = useState<TutorApplication | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { refreshData, addToast } = useAuth();

  const [formData, setFormData] = useState<Partial<TutorApplication>>({
    fullName: '',
    guardianName: '',
    dob: '',
    gender: 'Male',
    mobile: '',
    whatsapp: '',
    email: '',
    alternateContact: '',
    photoUrl: undefined,
    photoFileName: undefined,
    currentAddress: {
      houseNo: '',
      street: '',
      city: '',
      district: '',
      state: '',
      pincode: '',
    },
    permanentAddress: {
      houseNo: '',
      street: '',
      city: '',
      district: '',
      state: '',
      pincode: '',
    },
    sameAsCurrent: true,
    class10: {
      board: 'CBSE',
      passingYear: '',
      schoolName: '',
      percentage: '',
    },
    class12: {
      board: 'CBSE',
      passingYear: '',
      schoolName: '',
      percentage: '',
      stream: 'Science',
    },
    higherEdu: {
      highestQualification: 'Bachelor of Technology (B.Tech)',
      degree: '',
      institution: '',
      passingYear: '',
      percentage: '',
    },
    teaching: {
      subjects: ['Mathematics'],
      classes: ['Class 9', 'Class 10'],
      yearsOfExperience: 2,
      previousExperience: '',
      currentOccupation: 'Full-time Tutor',
      teachingMode: 'Both',
      preferredLocations: ['Home Tuition', 'Online'],
      availableDays: ['Monday', 'Wednesday', 'Friday'],
      availableTimeSlots: ['Evening'],
      minFee: 3000,
      maxFee: 6000,
      feeType: 'Per Month',
    },
    identityDoc: {
      docType: 'Aadhaar Card',
      docNumber: '',
      fileUrl: '',
      fileName: '',
      uploadedAt: new Date().toISOString(),
    },
    confirmedCorrect: false,
    agreedToTerms: false,
  });

  const updateFormData = (fields: Partial<TutorApplication>) => {
    setFormData(prev => ({ ...prev, ...fields }));
    setErrors({});
  };

  const validateStep = (step: number): boolean => {
    const errs: Record<string, string> = {};

    if (step === 1) {
      if (!formData.fullName?.trim()) errs.fullName = 'Full Name is required';
      if (!formData.guardianName?.trim()) errs.guardianName = "Guardian's Name is required";
      if (!formData.dob) errs.dob = 'Date of Birth is required';
      if (!formData.gender) errs.gender = 'Gender is required';
      if (!formData.mobile || formData.mobile.length < 10) errs.mobile = 'Valid 10-digit phone number is required';
      if (!formData.whatsapp || formData.whatsapp.length < 10) errs.whatsapp = 'Valid 10-digit WhatsApp number is required';
      if (!formData.email || !formData.email.includes('@')) errs.email = 'Valid email address is required';
      if (!formData.photoUrl) errs.photoUrl = 'Profile passport photo is required';
    }

    if (step === 2) {
      const addr = formData.currentAddress;
      if (!addr?.houseNo?.trim()) errs['currentAddress.houseNo'] = 'House/Flat No is required';
      if (!addr?.street?.trim()) errs['currentAddress.street'] = 'Street/Locality is required';
      if (!addr?.city?.trim()) errs['currentAddress.city'] = 'City is required';
      if (!addr?.district?.trim()) errs['currentAddress.district'] = 'District is required';
      if (!addr?.state?.trim()) errs['currentAddress.state'] = 'State is required';
      if (!addr?.pincode || addr.pincode.length < 6) errs['currentAddress.pincode'] = 'Valid 6-digit PIN code is required';
    }

    if (step === 3) {
      if (!formData.class10?.passingYear) errs['class10.passingYear'] = 'Class 10 passing year is required';
      if (!formData.class10?.schoolName) errs['class10.schoolName'] = 'Class 10 school name is required';
      if (!formData.class10?.percentage) errs['class10.percentage'] = 'Class 10 percentage/CGPA is required';

      if (!formData.class12?.passingYear) errs['class12.passingYear'] = 'Class 12 passing year is required';
      if (!formData.class12?.schoolName) errs['class12.schoolName'] = 'Class 12 school name is required';
      if (!formData.class12?.percentage) errs['class12.percentage'] = 'Class 12 percentage/CGPA is required';

      if (!formData.higherEdu?.degree) errs['higherEdu.degree'] = 'Degree/Course name is required';
      if (!formData.higherEdu?.institution) errs['higherEdu.institution'] = 'College/University name is required';
      if (!formData.higherEdu?.passingYear) errs['higherEdu.passingYear'] = 'Passing year is required';
      if (!formData.higherEdu?.percentage) errs['higherEdu.percentage'] = 'Percentage/CGPA is required';
    }

    if (step === 4) {
      if (!formData.teaching?.subjects || formData.teaching.subjects.length === 0) errs['teaching.subjects'] = 'Select at least 1 subject';
      if (!formData.teaching?.classes || formData.teaching.classes.length === 0) errs['teaching.classes'] = 'Select at least 1 class grade';
    }

    if (step === 5) {
      if (!formData.identityDoc?.docNumber?.trim()) errs['identityDoc.docNumber'] = 'Document ID number is required';
      if (!formData.identityDoc?.fileUrl) errs['identityDoc.fileUrl'] = 'Identity proof document file upload is required';
    }

    if (step === 6) {
      if (!formData.confirmedCorrect) errs.confirmedCorrect = 'You must confirm that the information provided is correct';
      if (!formData.agreedToTerms) errs.agreedToTerms = 'You must agree to the Terms & Conditions and Privacy Policy';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(6, prev + 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      addToast('Validation Error', 'Please complete all required fields before proceeding.', 'error');
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    if (!validateStep(6)) {
      addToast('Declaration Required', 'Please check both confirmation checkboxes.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitTutorApplication(formData as any);
      setSubmittedApp(result);
      await refreshData();
      addToast('Application Submitted!', `Your application ID is ${result.applicationId}`, 'success');
    } catch (err) {
      console.error('Submission error:', err);
      addToast('Submission Error', 'Failed to submit application. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submittedApp) {
    return (
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 sm:p-12 max-w-3xl mx-auto text-center space-y-6 animate-slide-up">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-900">
            Application Submitted Successfully!
          </h2>
          <p className="text-sm text-slate-600 max-w-lg mx-auto">
            Thank you for registering with TutorConnect. Your complete profile and verification documents have been safely received by our compliance team.
          </p>
        </div>

        <div className="bg-slate-900 text-white rounded-2xl p-6 max-w-md mx-auto shadow-lg space-y-3">
          <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold block">
            Your Unique Application ID
          </span>
          <div className="flex items-center justify-center space-x-3">
            <span className="text-3xl font-black tracking-wider text-blue-400 font-mono">
              {submittedApp.applicationId}
            </span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(submittedApp.applicationId);
                addToast('Copied', 'Application ID copied to clipboard', 'info');
              }}
              className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
              title="Copy ID"
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>
          <p className="text-[11px] text-slate-300">
            Submitted on {new Date(submittedApp.createdAt).toLocaleString()}
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 text-left text-xs text-blue-900 space-y-2 max-w-lg mx-auto">
          <h4 className="font-bold text-sm flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            What happens next?
          </h4>
          <ol className="list-decimal pl-4 space-y-1 text-slate-700">
            <li>Our Admin team will review your identity proof and academic marksheets.</li>
            <li>Verification is usually completed within 24 to 48 hours.</li>
            <li>You will receive SMS/WhatsApp updates on status changes.</li>
            <li>Once approved, your profile will be matched with parent inquiries!</li>
          </ol>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => onSuccess(submittedApp.applicationId)}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
          >
            Check Application Status
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden">
      <div className="bg-slate-900 text-white px-6 py-6 border-b border-slate-800">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-blue-400 uppercase tracking-wider">
              Step {currentStep} of 6
            </span>
            <span className="text-slate-400 font-medium">
              {STEP_NAMES[currentStep - 1]}
            </span>
          </div>

          <div className="grid grid-cols-6 gap-2 relative">
            {STEP_NAMES.map((name, index) => {
              const stepNum = index + 1;
              const isPassed = stepNum < currentStep;
              const isCurrent = stepNum === currentStep;

              return (
                <div key={stepNum} className="flex flex-col items-center group">
                  <div
                    onClick={() => {
                      if (stepNum < currentStep) setCurrentStep(stepNum);
                    }}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                      stepNum < currentStep
                        ? 'bg-emerald-500 text-white cursor-pointer shadow-md'
                        : isCurrent
                        ? 'bg-blue-600 text-white ring-4 ring-blue-500/30 font-black shadow-lg scale-105'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {isPassed ? <CheckCircle2 className="w-5 h-5" /> : stepNum}
                  </div>
                  <span className={`text-[10px] mt-1.5 hidden sm:block text-center truncate max-w-[70px] ${
                    isCurrent ? 'text-blue-400 font-bold' : isPassed ? 'text-emerald-400 font-medium' : 'text-slate-500'
                  }`}>
                    {name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-10 max-w-4xl mx-auto">
        {currentStep === 1 && <Step1Personal data={formData} onChange={updateFormData} errors={errors} />}
        {currentStep === 2 && <Step2Address data={formData} onChange={updateFormData} errors={errors} />}
        {currentStep === 3 && <Step3Education data={formData} onChange={updateFormData} errors={errors} />}
        {currentStep === 4 && <Step4Teaching data={formData} onChange={updateFormData} errors={errors} />}
        {currentStep === 5 && <Step5Documents data={formData} onChange={updateFormData} errors={errors} />}
        {currentStep === 6 && (
          <Step6Review
            data={formData}
            onChange={updateFormData}
            errors={errors}
            isSubmitting={isSubmitting}
            onNavigateToStep={(s) => setCurrentStep(s)}
          />
        )}

        <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 text-slate-700 font-semibold text-sm flex items-center gap-1.5 transition-colors disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
          ) : <div />}

          {currentStep < 6 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              Next: {STEP_NAMES[currentStep]}
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all hover:scale-[1.02] disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting Application...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Submit Tutor Application
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

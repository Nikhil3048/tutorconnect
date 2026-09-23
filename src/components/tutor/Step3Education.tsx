import React from 'react';
import type { TutorApplication, Class10Education, Class12Education, HigherEducation } from '../../types';
import { FileUpload } from '../common/FileUpload';
import { BookOpen, GraduationCap } from 'lucide-react';

interface Step3Props {
  data: Partial<TutorApplication>;
  onChange: (fields: Partial<TutorApplication>) => void;
  errors: Record<string, string>;
}

export const Step3Education: React.FC<Step3Props> = ({ data, onChange, errors }) => {
  const class10 = data.class10 || { board: 'CBSE', passingYear: '', schoolName: '', percentage: '' };
  const class12 = data.class12 || { board: 'CBSE', passingYear: '', schoolName: '', percentage: '', stream: 'Science' };
  const higherEdu = data.higherEdu || { highestQualification: 'Bachelor of Technology (B.Tech)', degree: '', institution: '', passingYear: '', percentage: '' };

  const handle10Change = (field: keyof Class10Education, val: any) => {
    onChange({ class10: { ...class10, [field]: val } });
  };

  const handle12Change = (field: keyof Class12Education, val: any) => {
    onChange({ class12: { ...class12, [field]: val } });
  };

  const handleHigherChange = (field: keyof HigherEducation, val: any) => {
    onChange({ higherEdu: { ...higherEdu, [field]: val } });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-bold text-slate-900">Step 3: Educational Qualification</h3>
        <p className="text-sm text-slate-500 mt-1">
          Specify your Class 10, Class 12, and Higher Education academic background.
        </p>
      </div>

      <div className="bg-slate-50/70 rounded-2xl p-5 border border-slate-200 space-y-4">
        <div className="flex items-center space-x-2 text-blue-700 font-bold">
          <BookOpen className="w-5 h-5" />
          <h4 className="text-base">Class 10 (Secondary School)</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Board <span className="text-rose-500">*</span>
            </label>
            <select
              value={class10.board}
              onChange={(e) => handle10Change('board', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none bg-white"
            >
              <option value="CBSE">CBSE</option>
              <option value="ICSE">ICSE</option>
              <option value="State Board">State Board</option>
              <option value="IB">IB</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Passing Year <span className="text-rose-500">*</span>
            </label>
            <input
              type="number"
              placeholder="e.g. 2014"
              value={class10.passingYear}
              onChange={(e) => handle10Change('passingYear', e.target.value)}
              className={`w-full px-3.5 py-2 rounded-xl border text-sm focus:outline-none ${
                errors['class10.passingYear'] ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-300 focus:border-blue-500'
              }`}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              School Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Delhi Public School"
              value={class10.schoolName}
              onChange={(e) => handle10Change('schoolName', e.target.value)}
              className={`w-full px-3.5 py-2 rounded-xl border text-sm focus:outline-none ${
                errors['class10.schoolName'] ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-300 focus:border-blue-500'
              }`}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Percentage / CGPA <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. 92.4% or 10.0 CGPA"
              value={class10.percentage}
              onChange={(e) => handle10Change('percentage', e.target.value)}
              className={`w-full px-3.5 py-2 rounded-xl border text-sm focus:outline-none ${
                errors['class10.percentage'] ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-300 focus:border-blue-500'
              }`}
            />
          </div>
        </div>

        <div className="pt-2">
          <FileUpload
            label="Upload Class 10 Marksheet"
            accept="application/pdf,image/*"
            valueUrl={class10.marksheetUrl}
            valueFileName={class10.marksheetFileName}
            onFileSelect={({ url, fileName }) => {
              handle10Change('marksheetUrl', url);
              handle10Change('marksheetFileName', fileName);
            }}
            onFileRemove={() => {
              handle10Change('marksheetUrl', undefined);
              handle10Change('marksheetFileName', undefined);
            }}
          />
        </div>
      </div>

      <div className="bg-slate-50/70 rounded-2xl p-5 border border-slate-200 space-y-4">
        <div className="flex items-center space-x-2 text-indigo-700 font-bold">
          <BookOpen className="w-5 h-5" />
          <h4 className="text-base">Class 12 (Higher Secondary)</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Board <span className="text-rose-500">*</span>
            </label>
            <select
              value={class12.board}
              onChange={(e) => handle12Change('board', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:outline-none bg-white"
            >
              <option value="CBSE">CBSE</option>
              <option value="ISC">ISC</option>
              <option value="State Board">State Board</option>
              <option value="IB">IB</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Stream <span className="text-rose-500">*</span>
            </label>
            <select
              value={class12.stream}
              onChange={(e) => handle12Change('stream', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:outline-none bg-white"
            >
              <option value="Science">Science (PCM/PCB)</option>
              <option value="Commerce">Commerce</option>
              <option value="Arts">Arts / Humanities</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Passing Year <span className="text-rose-500">*</span>
            </label>
            <input
              type="number"
              placeholder="e.g. 2016"
              value={class12.passingYear}
              onChange={(e) => handle12Change('passingYear', e.target.value)}
              className={`w-full px-3.5 py-2 rounded-xl border text-sm focus:outline-none ${
                errors['class12.passingYear'] ? 'border-rose-400' : 'border-slate-300 focus:border-blue-500'
              }`}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              School Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Kendriya Vidyalaya"
              value={class12.schoolName}
              onChange={(e) => handle12Change('schoolName', e.target.value)}
              className={`w-full px-3.5 py-2 rounded-xl border text-sm focus:outline-none ${
                errors['class12.schoolName'] ? 'border-rose-400' : 'border-slate-300 focus:border-blue-500'
              }`}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Percentage / CGPA <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. 94.0%"
              value={class12.percentage}
              onChange={(e) => handle12Change('percentage', e.target.value)}
              className={`w-full px-3.5 py-2 rounded-xl border text-sm focus:outline-none ${
                errors['class12.percentage'] ? 'border-rose-400' : 'border-slate-300 focus:border-blue-500'
              }`}
            />
          </div>
        </div>

        <div className="pt-2">
          <FileUpload
            label="Upload Class 12 Marksheet"
            accept="application/pdf,image/*"
            valueUrl={class12.marksheetUrl}
            valueFileName={class12.marksheetFileName}
            onFileSelect={({ url, fileName }) => {
              handle12Change('marksheetUrl', url);
              handle12Change('marksheetFileName', fileName);
            }}
            onFileRemove={() => {
              handle12Change('marksheetUrl', undefined);
              handle12Change('marksheetFileName', undefined);
            }}
          />
        </div>
      </div>

      <div className="bg-slate-50/70 rounded-2xl p-5 border border-slate-200 space-y-4">
        <div className="flex items-center space-x-2 text-emerald-700 font-bold">
          <GraduationCap className="w-5 h-5" />
          <h4 className="text-base">Higher Education</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Highest Qualification <span className="text-rose-500">*</span>
            </label>
            <select
              value={higherEdu.highestQualification}
              onChange={(e) => handleHigherChange('highestQualification', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:outline-none bg-white"
            >
              <option value="Bachelor's Degree (B.A / B.Sc / B.Com / B.Tech / B.E)">Bachelor's Degree</option>
              <option value="Master's Degree (M.A / M.Sc / M.Com / M.Tech / M.E)">Master's Degree</option>
              <option value="Ph.D / Doctorate">Ph.D / Doctorate</option>
              <option value="B.Ed / M.Ed">B.Ed / M.Ed</option>
              <option value="Diploma / Certificate Course">Diploma</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Degree / Course Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. M.Sc. Mathematics / B.Tech Computer Science"
              value={higherEdu.degree}
              onChange={(e) => handleHigherChange('degree', e.target.value)}
              className={`w-full px-3.5 py-2 rounded-xl border text-sm focus:outline-none ${
                errors['higherEdu.degree'] ? 'border-rose-400' : 'border-slate-300 focus:border-blue-500'
              }`}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              College / University <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Hindu College, University of Delhi"
              value={higherEdu.institution}
              onChange={(e) => handleHigherChange('institution', e.target.value)}
              className={`w-full px-3.5 py-2 rounded-xl border text-sm focus:outline-none ${
                errors['higherEdu.institution'] ? 'border-rose-400' : 'border-slate-300 focus:border-blue-500'
              }`}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Passing Year <span className="text-rose-500">*</span>
            </label>
            <input
              type="number"
              placeholder="e.g. 2020"
              value={higherEdu.passingYear}
              onChange={(e) => handleHigherChange('passingYear', e.target.value)}
              className={`w-full px-3.5 py-2 rounded-xl border text-sm focus:outline-none ${
                errors['higherEdu.passingYear'] ? 'border-rose-400' : 'border-slate-300 focus:border-blue-500'
              }`}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Percentage / CGPA <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. 86.5% or 8.8 CGPA"
              value={higherEdu.percentage}
              onChange={(e) => handleHigherChange('percentage', e.target.value)}
              className={`w-full px-3.5 py-2 rounded-xl border text-sm focus:outline-none ${
                errors['higherEdu.percentage'] ? 'border-rose-400' : 'border-slate-300 focus:border-blue-500'
              }`}
            />
          </div>
        </div>

        <div className="space-y-4 pt-2">
          <FileUpload
            label="Upload Graduation / Degree Marksheet"
            accept="application/pdf,image/*"
            valueUrl={higherEdu.certificateUrl}
            valueFileName={higherEdu.certificateFileName}
            onFileSelect={({ url, fileName }) => {
              handleHigherChange('certificateUrl', url);
              handleHigherChange('certificateFileName', fileName);
            }}
            onFileRemove={() => {
              handleHigherChange('certificateUrl', undefined);
              handleHigherChange('certificateFileName', undefined);
            }}
          />

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Other Certifications / Achievements <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <textarea
              rows={2}
              placeholder="e.g. B.Ed in Science Pedagogy, CTET Qualified, IELTS 8.0, GATE Qualified..."
              value={higherEdu.otherCertifications || ''}
              onChange={(e) => handleHigherChange('otherCertifications', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

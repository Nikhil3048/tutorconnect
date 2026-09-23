import React from 'react';
import type { TutorApplication, IdentityDocType, DocumentUpload } from '../../types';
import { FileUpload } from '../common/FileUpload';
import { ShieldCheck, Lock } from 'lucide-react';

interface Step5Props {
  data: Partial<TutorApplication>;
  onChange: (fields: Partial<TutorApplication>) => void;
  errors: Record<string, string>;
}

export const Step5Documents: React.FC<Step5Props> = ({ data, onChange, errors }) => {
  const identityDoc: DocumentUpload = data.identityDoc || {
    docType: 'Aadhaar Card',
    docNumber: 'XXXX-XXXX-9999',
    fileUrl: '#sample-doc-preview',
    fileName: 'identity_doc_verified.pdf',
    uploadedAt: new Date().toISOString(),
  };

  const handleDocTypeChange = (docType: IdentityDocType) => {
    onChange({ identityDoc: { ...identityDoc, docType } });
  };

  const handleDocNumberChange = (docNumber: string) => {
    onChange({
      identityDoc: {
        ...identityDoc,
        docNumber,
        fileUrl: identityDoc.fileUrl || '#sample-doc-preview',
        fileName: identityDoc.fileName || 'identity_doc_verified.pdf',
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-slate-900">Step 5: Identity & Address Proof</h3>
        <p className="text-sm text-slate-500 mt-1">
          Upload a valid government-issued identity document for admin background verification.
        </p>
      </div>

      <div className="bg-slate-900 text-white rounded-2xl p-4 flex items-start space-x-3.5 shadow-md">
        <div className="p-2 bg-slate-800 rounded-xl text-emerald-400 shrink-0">
          <Lock className="w-5 h-5" />
        </div>
        <div className="text-xs space-y-1">
          <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
            Encrypted & Private Document Storage
          </h4>
          <p className="text-slate-300 leading-relaxed">
            Your identity documents are securely encrypted and accessed ONLY by verified TutorConnect compliance admins. Documents are strictly NEVER shared publicly or displayed to parents.
          </p>
        </div>
      </div>

      <div className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200 space-y-5">
        <div className="flex items-center space-x-2 text-slate-900 font-bold">
          <ShieldCheck className="w-5 h-5 text-blue-600" />
          <h4 className="text-base">Government Identity Proof <span className="text-rose-500">*</span></h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Select Document Type <span className="text-rose-500">*</span>
            </label>
            <select
              value={identityDoc.docType}
              onChange={(e) => handleDocTypeChange(e.target.value as IdentityDocType)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:outline-none bg-white font-medium"
            >
              <option value="Aadhaar Card">Aadhaar Card</option>
              <option value="Voter ID">Voter ID</option>
              <option value="PAN Card">PAN Card</option>
              <option value="Driving Licence">Driving Licence</option>
              <option value="Passport">Passport</option>
              <option value="Other">Other Government ID</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Document Number <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder={`Enter your ${identityDoc.docType} Number`}
              value={identityDoc.docNumber}
              onChange={(e) => handleDocNumberChange(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none ${
                errors['identityDoc.docNumber'] ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/30' : 'border-slate-300 focus:border-blue-500'
              }`}
            />
            {errors['identityDoc.docNumber'] && (
              <p className="text-xs text-rose-500 mt-1">{errors['identityDoc.docNumber']}</p>
            )}
          </div>
        </div>

        <div className="pt-2">
          <FileUpload
            label={`Upload ${identityDoc.docType} Copy (Front & Back or Single PDF)`}
            required
            accept="application/pdf,image/*"
            maxSizeMB={5}
            helpText="Clear scan or photo in PDF/JPG/PNG (Max 5 MB)"
            valueUrl={identityDoc.fileUrl}
            valueFileName={identityDoc.fileName}
            onFileSelect={({ url, fileName }) => {
              onChange({
                identityDoc: {
                  ...identityDoc,
                  fileUrl: url,
                  fileName: fileName,
                  uploadedAt: new Date().toISOString(),
                }
              });
            }}
            onFileRemove={() => {
              onChange({
                identityDoc: {
                  ...identityDoc,
                  fileUrl: '',
                  fileName: '',
                }
              });
            }}
          />
          {errors['identityDoc.fileUrl'] && (
            <p className="text-xs text-rose-500 mt-1">{errors['identityDoc.fileUrl']}</p>
          )}
        </div>
      </div>
    </div>
  );
};

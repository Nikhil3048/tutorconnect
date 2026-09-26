import React, { useState } from 'react';
import type { TutorApplication, TutorApplicationStatus } from '../../types';
import { Modal } from '../common/Modal';
import { StatusBadge } from '../common/Badge';
import { useAuth } from '../../context/AuthContext';
import { 
  User, MapPin, GraduationCap, 
  BookOpen, CheckCircle2, XCircle, AlertTriangle, 
  Eye, ShieldCheck 
} from 'lucide-react';

interface ModalProps {
  tutor: TutorApplication | null;
  onClose: () => void;
}

export const TutorProfileDetailModal: React.FC<ModalProps> = ({ tutor, onClose }) => {
  const { updateTutorStatus, addToast } = useAuth();
  const [adminNoteInput, setAdminNoteInput] = useState<string>('');
  const [actionType, setActionType] = useState<'Approve' | 'Reject' | 'RequestDocs' | null>(null);
  const [docPreviewUrl, setDocPreviewUrl] = useState<string | null>(null);
  const [docPreviewTitle, setDocPreviewTitle] = useState<string>('');

  if (!tutor) return null;

  const handleExecuteStatusUpdate = async (status: TutorApplicationStatus) => {
    if ((status === 'Rejected' || status === 'Documents Required') && !adminNoteInput.trim()) {
      addToast('Note Required', 'Please enter an admin note/reason before updating status.', 'warning');
      return;
    }

    try {
      await updateTutorStatus(tutor.id, status, adminNoteInput.trim() || tutor.adminNotes);
      setActionType(null);
      setAdminNoteInput('');
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Modal
        isOpen={Boolean(tutor)}
        onClose={onClose}
        title={`Tutor Profile — ${tutor.fullName}`}
        subtitle={`Application ID: ${tutor.applicationId}`}
        maxWidth="5xl"
      >
        <div className="space-y-8">
          <div className="bg-slate-900 text-white rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-md">
            <div className="flex items-center space-x-4">
              {tutor.photoUrl ? (
                <img
                  src={tutor.photoUrl}
                  alt={tutor.fullName}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-blue-400 shadow-md shrink-0"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                  {tutor.fullName.charAt(0)}
                </div>
              )}
              <div className="space-y-1">
                <div className="flex items-center space-x-3">
                  <h3 className="text-2xl font-extrabold text-white">{tutor.fullName}</h3>
                  <StatusBadge status={tutor.status} size="lg" />
                </div>
                <p className="text-xs text-slate-300">
                  {tutor.higherEdu.degree} ({tutor.higherEdu.institution})
                </p>
                <div className="flex items-center space-x-4 text-xs text-slate-400 pt-1">
                  <span>Submitted: {new Date(tutor.createdAt).toLocaleDateString()}</span>
                  <span>|</span>
                  <span>{tutor.teaching.yearsOfExperience} Yrs Experience</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-stretch sm:self-auto">
              <button
                onClick={() => handleExecuteStatusUpdate('Approved')}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" />
                Approve
              </button>
              <button
                onClick={() => setActionType('RequestDocs')}
                className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-colors"
              >
                <AlertTriangle className="w-4 h-4" />
                Request Docs
              </button>
              <button
                onClick={() => setActionType('Reject')}
                className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-colors"
              >
                <XCircle className="w-4 h-4" />
                Reject
              </button>
            </div>
          </div>

          {actionType && (
            <div className="bg-amber-50 border border-amber-300 rounded-2xl p-5 space-y-3 animate-fade-in">
              <h4 className="text-sm font-bold text-amber-950 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                {actionType === 'Reject' ? 'Reject Application with Note' : 'Request Additional Documents'}
              </h4>
              <p className="text-xs text-amber-800">
                {actionType === 'Reject'
                  ? 'Please specify the rejection reason for record keeping and tutor notification.'
                  : 'Specify which document needs re-uploading (e.g., "Please re-upload a clearer Class 12 marksheet").'}
              </p>
              <textarea
                rows={2}
                placeholder="Enter admin reason/message..."
                value={adminNoteInput}
                onChange={(e) => setAdminNoteInput(e.target.value)}
                className="w-full p-3 rounded-xl border border-amber-300 text-xs focus:outline-none bg-white font-medium"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setActionType(null)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:underline"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleExecuteStatusUpdate(actionType === 'Reject' ? 'Rejected' : 'Documents Required')}
                  className="px-4 py-1.5 bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs rounded-lg"
                >
                  Confirm & Update Status
                </button>
              </div>
            </div>
          )}

          {tutor.adminNotes && !actionType && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs space-y-1">
              <span className="font-bold text-slate-700 uppercase tracking-wider block">Current Admin Remarks</span>
              <p className="text-slate-800 italic font-medium">"{tutor.adminNotes}"</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <h4 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                <User className="w-4 h-4 text-blue-600" />
                Personal Details
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div><span className="text-slate-400 block">Father/Guardian</span><span className="font-semibold text-slate-800">{tutor.guardianName}</span></div>
                <div><span className="text-slate-400 block">DOB / Gender</span><span className="font-semibold text-slate-800">{tutor.dob} ({tutor.gender})</span></div>
                <div><span className="text-slate-400 block">Mobile</span><span className="font-semibold text-slate-800">+91 {tutor.mobile}</span></div>
                <div><span className="text-slate-400 block">WhatsApp</span><span className="font-semibold text-slate-800">+91 {tutor.whatsapp}</span></div>
                <div className="col-span-2"><span className="text-slate-400 block">Email</span><span className="font-semibold text-slate-800">{tutor.email}</span></div>
              </div>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <h4 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-600" />
                Address Details
              </h4>
              <div className="text-xs space-y-2">
                <div>
                  <span className="text-slate-400 block font-medium">Current Address</span>
                  <span className="font-semibold text-slate-800">
                    {tutor.currentAddress.houseNo}, {tutor.currentAddress.street}, {tutor.currentAddress.city}, {tutor.currentAddress.district}, {tutor.currentAddress.state} - {tutor.currentAddress.pincode}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Permanent Address</span>
                  <span className="font-semibold text-slate-800">
                    {tutor.sameAsCurrent ? 'Same as Current' : `${tutor.permanentAddress.houseNo}, ${tutor.permanentAddress.street}, ${tutor.permanentAddress.city}`}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <h4 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-purple-600" />
                Teaching Subjects & Classes
              </h4>
              <div className="text-xs space-y-2">
                <div>
                  <span className="text-slate-400 block font-medium">Subjects</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {tutor.teaching.subjects.map(s => (
                      <span key={s} className="px-2 py-0.5 rounded-lg bg-blue-100 text-blue-800 font-semibold">{s}</span>
                    ))}
                    {tutor.teaching.customSubject && (
                      <span className="px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 font-semibold">{tutor.teaching.customSubject}</span>
                    )}
                  </div>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Classes</span>
                  <span className="font-semibold text-slate-800">{tutor.teaching.classes.join(', ')}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Mode & Locations</span>
                  <span className="font-semibold text-slate-800">{tutor.teaching.teachingMode} ({tutor.teaching.preferredLocations.join(', ')})</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Expected Fees</span>
                  <span className="font-semibold text-emerald-700">₹{tutor.teaching.minFee} – ₹{tutor.teaching.maxFee} ({tutor.teaching.feeType})</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <h4 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-emerald-600" />
                Academic Background
              </h4>
              <div className="text-xs space-y-2">
                <div>
                  <span className="text-slate-400 block font-medium">Class 10</span>
                  <span className="font-semibold text-slate-800">{tutor.class10.board} ({tutor.class10.passingYear}) — {tutor.class10.percentage}%</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Class 12</span>
                  <span className="font-semibold text-slate-800">{tutor.class12.stream} ({tutor.class12.passingYear}) — {tutor.class12.percentage}%</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Higher Education</span>
                  <span className="font-semibold text-slate-800">{tutor.higherEdu.degree} from {tutor.higherEdu.institution} ({tutor.higherEdu.passingYear})</span>
                </div>
              </div>
            </div>
          </div>

          {/* Uploaded Documents Vault */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 space-y-4 shadow-lg">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h4 className="font-bold text-base text-white">Verification & Uploaded Documents Vault</h4>
              </div>
              <span className="text-[11px] bg-slate-800 text-slate-300 px-3 py-1 rounded-full font-mono">
                Admin Inspection
              </span>
            </div>

            {(() => {
              const docs = [
                tutor.photoUrl || tutor.photoFileName
                  ? { title: 'Profile Photo', sub: 'Passport Photo', url: tutor.photoUrl, fileName: tutor.photoFileName || 'Profile_Photo.jpg' }
                  : null,
                tutor.identityDoc?.fileUrl || tutor.identityDoc?.docNumber || tutor.identityDoc?.fileName
                  ? { title: `Identity Proof (${tutor.identityDoc.docType || 'ID Document'})`, sub: tutor.identityDoc.docNumber ? `Doc #: ${tutor.identityDoc.docNumber}` : 'Government ID', url: tutor.identityDoc.fileUrl, fileName: tutor.identityDoc.fileName || `${tutor.identityDoc.docType}_Scan.pdf` }
                  : null,
                tutor.class10?.marksheetUrl || tutor.class10?.marksheetFileName
                  ? { title: 'Class 10 Marksheet', sub: `Board: ${tutor.class10.board}`, url: tutor.class10.marksheetUrl, fileName: tutor.class10.marksheetFileName || 'Class10_Marksheet.pdf' }
                  : null,
                tutor.class12?.marksheetUrl || tutor.class12?.marksheetFileName
                  ? { title: 'Class 12 Marksheet', sub: `Stream: ${tutor.class12.stream || 'Academic'}`, url: tutor.class12.marksheetUrl, fileName: tutor.class12.marksheetFileName || 'Class12_Marksheet.pdf' }
                  : null,
                tutor.higherEdu?.certificateUrl || tutor.higherEdu?.certificateFileName
                  ? { title: 'Higher Education Degree / Certificate', sub: tutor.higherEdu.degree || 'Degree Certificate', url: tutor.higherEdu.certificateUrl, fileName: tutor.higherEdu.certificateFileName || 'Graduation_Certificate.pdf' }
                  : null,
              ].filter(Boolean) as { title: string; sub: string; url?: string; fileName: string }[];

              if (docs.length === 0) {
                return (
                  <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/60 text-center text-slate-400 text-xs">
                    No documents or certificates uploaded by this tutor.
                  </div>
                );
              }

              return (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {docs.map((doc, idx) => (
                    <div key={idx} className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-400">{doc.title}</span>
                        <span className="text-[10px] text-slate-400 font-mono truncate max-w-[120px]">{doc.sub}</span>
                      </div>
                      <p className="text-xs text-slate-300 font-mono truncate">
                        File: {doc.fileName}
                      </p>
                      <div className="pt-2 flex items-center space-x-2">
                        {doc.url ? (
                          <button
                            onClick={() => {
                              setDocPreviewUrl(doc.url!);
                              setDocPreviewTitle(`${tutor.fullName} — ${doc.title}`);
                            }}
                            className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            Preview Document
                          </button>
                        ) : (
                          <span className="px-3 py-1 bg-slate-700 text-slate-400 text-xs rounded-lg font-mono">
                            File attached: {doc.fileName}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>

        </div>
      </Modal>

      {docPreviewUrl && (
        <Modal
          isOpen={Boolean(docPreviewUrl)}
          onClose={() => setDocPreviewUrl(null)}
          title={docPreviewTitle}
          maxWidth="4xl"
        >
          <div className="space-y-4">
            <div className="p-4 bg-slate-900 rounded-2xl overflow-hidden min-h-[350px] flex items-center justify-center border border-slate-800">
              {docPreviewUrl.startsWith('data:image') || docPreviewUrl.startsWith('blob:') || docPreviewUrl.includes('unsplash') || /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(docPreviewUrl) ? (
                <img src={docPreviewUrl} alt="Document Preview" className="max-h-[550px] max-w-full object-contain rounded-lg shadow-md" />
              ) : docPreviewUrl.startsWith('data:application/pdf') || docPreviewUrl.endsWith('.pdf') ? (
                <iframe src={docPreviewUrl} className="w-full h-[550px] rounded-xl border border-slate-700" title="PDF Document Preview" />
              ) : (
                <iframe src={docPreviewUrl} className="w-full h-[500px] rounded-xl border border-slate-700" title="Document Preview" />
              )}
            </div>

            <div className="flex items-center justify-between pt-2">
              <a
                href={docPreviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <Eye className="w-4 h-4" />
                Open Original File / Download
              </a>

              <button
                onClick={() => setDocPreviewUrl(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs"
              >
                Close Preview
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

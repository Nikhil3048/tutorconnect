import React, { useState } from 'react';
import type { ParentInquiry, TutorApplication } from '../../types';
import { getRankedTutorMatches } from '../../lib/matchingEngine';
import type { MatchResult } from '../../lib/matchingEngine';
import { Modal } from '../common/Modal';
import { useAuth } from '../../context/AuthContext';
import { Sparkles, Award, Star, CheckCircle2 } from 'lucide-react';

interface MatchingModalProps {
  inquiry: ParentInquiry | null;
  tutors: TutorApplication[];
  onClose: () => void;
  onViewTutorProfile: (tutor: TutorApplication) => void;
}

export const TutorMatchingModal: React.FC<MatchingModalProps> = ({
  inquiry,
  tutors,
  onClose,
  onViewTutorProfile,
}) => {
  const { saveTutorMatch, updateInquiryStatus, addToast } = useAuth();
  const [assignedTutorId, setAssignedTutorId] = useState<string | null>(null);

  if (!inquiry) return null;

  const rankedMatches: MatchResult[] = getRankedTutorMatches(inquiry, tutors);

  const handleAssignTutor = async (match: MatchResult) => {
    try {
      await saveTutorMatch({
        inquiryId: inquiry.id,
        tutorId: match.tutor.id,
        matchScore: match.score,
        matchReasons: match.reasons,
        matchStatus: 'Assigned',
        adminNotes: `Assigned ${match.tutor.fullName} (${match.score}% score) to ${inquiry.studentName}`,
      });

      await updateInquiryStatus(inquiry.id, 'Tutor Suggested');
      setAssignedTutorId(match.tutor.id);
      addToast('Tutor Assigned!', `${match.tutor.fullName} successfully assigned to ${inquiry.parentName}'s inquiry.`, 'success');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal
      isOpen={Boolean(inquiry)}
      onClose={onClose}
      title={`Smart Tutor Matching Engine — ${inquiry.studentName}`}
      subtitle={`Inquiry ID: ${inquiry.inquiryId}`}
      maxWidth="5xl"
    >
      <div className="space-y-8">
        <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-blue-400" />
              <h4 className="font-bold text-base text-white">Parent Inquiry Requirements</h4>
            </div>
            <span className="text-xs bg-blue-600/30 text-blue-300 border border-blue-400/30 px-3 py-1 rounded-full font-semibold">
              Target: {inquiry.currentClass} ({inquiry.schoolBoard})
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-slate-400 block font-medium">Required Subjects</span>
              <span className="font-bold text-blue-300 text-sm">{inquiry.subjectsRequired.join(', ')}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Budget Range</span>
              <span className="font-bold text-emerald-400 text-sm">{inquiry.budgetRange}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Mode & Location</span>
              <span className="font-semibold text-slate-200">{inquiry.teachingMode} ({inquiry.address.city})</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Gender Preference</span>
              <span className="font-semibold text-slate-200">{inquiry.preferredGender}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              Ranked Tutor Recommendations ({rankedMatches.length} Available Tutors)
            </h4>
            <span className="text-xs text-slate-500 font-medium">Sorted by Match Compatibility</span>
          </div>

          {rankedMatches.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <p className="text-sm font-semibold text-slate-700">No approved tutors found matching this criteria.</p>
              <p className="text-xs text-slate-500">Approve pending tutor applications to enable matching.</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              {rankedMatches.map((match, idx) => {
                const isTopMatch = idx === 0 && match.score >= 75;
                const isAssigned = assignedTutorId === match.tutor.id;

                return (
                  <div
                    key={match.tutor.id}
                    className={`p-6 rounded-2xl border transition-all ${
                      isAssigned 
                        ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-500/30' 
                        : isTopMatch 
                        ? 'bg-blue-50/50 border-blue-300 shadow-md' 
                        : 'bg-white border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start space-x-4">
                        {match.tutor.photoUrl ? (
                          <img
                            src={match.tutor.photoUrl}
                            alt={match.tutor.fullName}
                            className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-sm shrink-0"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-xl font-bold shrink-0">
                            {match.tutor.fullName.charAt(0)}
                          </div>
                        )}

                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <h5 className="text-lg font-extrabold text-slate-900">{match.tutor.fullName}</h5>
                            {isTopMatch && (
                              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold flex items-center gap-1">
                                <Star className="w-3 h-3 fill-amber-500" />
                                Best Match
                              </span>
                            )}
                          </div>
                          
                          <p className="text-xs text-slate-600 font-medium">
                            {match.tutor.higherEdu.degree} • {match.tutor.teaching.yearsOfExperience} Yrs Exp
                          </p>

                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {match.tutor.teaching.subjects.map(s => (
                              <span key={s} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-semibold">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
                        <div className="text-center bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-xs">
                          <span className="text-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            {match.score}%
                          </span>
                          <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                            Match Score
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onViewTutorProfile(match.tutor)}
                            className="px-3.5 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold"
                          >
                            View Profile
                          </button>
                          
                          <button
                            onClick={() => handleAssignTutor(match)}
                            disabled={isAssigned}
                            className={`px-4 py-2 rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-1.5 ${
                              isAssigned
                                ? 'bg-emerald-600 text-white opacity-90'
                                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20'
                            }`}
                          >
                            {isAssigned ? (
                              <>
                                <CheckCircle2 className="w-4 h-4" />
                                Assigned
                              </>
                            ) : (
                              <>
                                <Sparkles className="w-4 h-4" />
                                Assign to Inquiry
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100/80 flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Match Reasons:
                      </span>
                      {match.reasons.map((r, i) => (
                        <span key={i} className="text-[11px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full font-medium">
                          ✓ {r}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

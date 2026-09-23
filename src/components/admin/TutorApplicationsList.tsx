import React, { useState, useMemo } from 'react';
import type { TutorApplication } from '../../types';
import { StatusBadge } from '../common/Badge';
import { Search, Filter, Eye, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface ListProps {
  tutors: TutorApplication[];
  onSelectTutor: (tutor: TutorApplication) => void;
}

export const TutorApplicationsList: React.FC<ListProps> = ({ tutors, onSelectTutor }) => {
  const { updateTutorStatus } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [genderFilter, setGenderFilter] = useState<string>('All');
  const [subjectFilter, setSubjectFilter] = useState<string>('All');

  const filteredTutors = useMemo(() => {
    return tutors.filter(t => {
      const q = searchQuery.toLowerCase().trim();
      if (q) {
        const matchesQuery = 
          t.fullName.toLowerCase().includes(q) ||
          t.applicationId.toLowerCase().includes(q) ||
          t.email.toLowerCase().includes(q) ||
          t.mobile.includes(q) ||
          t.currentAddress.city.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      if (statusFilter !== 'All' && t.status !== statusFilter) return false;

      if (genderFilter !== 'All' && t.gender !== genderFilter) return false;

      if (subjectFilter !== 'All') {
        const hasSub = t.teaching.subjects.some(s => s.toLowerCase() === subjectFilter.toLowerCase());
        if (!hasSub) return false;
      }

      return true;
    });
  }, [tutors, searchQuery, statusFilter, genderFilter, subjectFilter]);

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="relative w-full lg:w-96">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, phone, application ID, city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <div className="flex items-center space-x-1.5 text-xs text-slate-500 font-bold uppercase tracking-wider">
              <Filter className="w-4 h-4 text-blue-600" />
              <span>Filters:</span>
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold bg-slate-50 text-slate-700 focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Submitted">Submitted</option>
              <option value="Under Review">Under Review</option>
              <option value="Documents Required">Documents Required</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>

            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold bg-slate-50 text-slate-700 focus:outline-none"
            >
              <option value="All">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold bg-slate-50 text-slate-700 focus:outline-none"
            >
              <option value="All">All Subjects</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Biology">Biology</option>
              <option value="English">English</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                <th className="py-4 px-6">Application ID</th>
                <th className="py-4 px-6">Tutor Name</th>
                <th className="py-4 px-6">Qualification</th>
                <th className="py-4 px-6">Subjects</th>
                <th className="py-4 px-6">Exp & Fee</th>
                <th className="py-4 px-6">Location</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
              {filteredTutors.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    No tutor applications match your search or filter criteria.
                  </td>
                </tr>
              ) : (
                filteredTutors.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-slate-900">
                      {t.applicationId}
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        {t.photoUrl ? (
                          <img src={t.photoUrl} alt={t.fullName} className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0" />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0">
                            {t.fullName.charAt(0)}
                          </div>
                        )}
                        <div>
                          <span className="font-bold text-slate-900 block">{t.fullName}</span>
                          <span className="text-[11px] text-slate-400">{t.email} • {t.mobile}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6 font-medium text-slate-800">
                      {t.higherEdu.degree}
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-1 max-w-[180px]">
                        {t.teaching.subjects.slice(0, 2).map((sub) => (
                          <span key={sub} className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[11px] font-semibold">
                            {sub}
                          </span>
                        ))}
                        {t.teaching.subjects.length > 2 && (
                          <span className="px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500 text-[10px]">
                            +{t.teaching.subjects.length - 2}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <span className="block font-semibold text-slate-800">{t.teaching.yearsOfExperience} Yrs Exp</span>
                      <span className="text-[11px] text-emerald-600">₹{t.teaching.minFee}-{t.teaching.maxFee}</span>
                    </td>

                    <td className="py-4 px-6 text-slate-600">
                      {t.currentAddress.city}
                    </td>

                    <td className="py-4 px-6">
                      <StatusBadge status={t.status} />
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => onSelectTutor(t)}
                          className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs transition-colors flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          View
                        </button>
                        
                        {t.status !== 'Approved' && (
                          <button
                            onClick={() => updateTutorStatus(t.id, 'Approved')}
                            className="p-1.5 rounded-xl text-emerald-600 hover:bg-emerald-50 transition-colors"
                            title="Quick Approve"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import type { ParentInquiry, InquiryStatus } from '../../types';
import { Search, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface InquiriesListProps {
  inquiries: ParentInquiry[];
  onOpenMatchModal: (inquiry: ParentInquiry) => void;
}

export const ParentInquiriesList: React.FC<InquiriesListProps> = ({
  inquiries,
  onOpenMatchModal,
}) => {
  const { updateInquiryStatus } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filtered = inquiries.filter(inq => {
    const q = searchQuery.toLowerCase().trim();
    if (q) {
      const match = 
        inq.parentName.toLowerCase().includes(q) ||
        inq.studentName.toLowerCase().includes(q) ||
        inq.inquiryId.toLowerCase().includes(q) ||
        inq.address.city.toLowerCase().includes(q);
      if (!match) return false;
    }

    if (statusFilter !== 'All' && inq.status !== statusFilter) return false;

    return true;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search inquiry ID, parent name, student, city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:border-blue-500 focus:outline-none"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold bg-slate-50 text-slate-700 focus:outline-none"
        >
          <option value="All">All Inquiry Statuses</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Matching">Matching</option>
          <option value="Tutor Suggested">Tutor Suggested</option>
          <option value="Completed">Completed</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                <th className="py-4 px-6">Inquiry ID</th>
                <th className="py-4 px-6">Parent & Student</th>
                <th className="py-4 px-6">Grade / Board</th>
                <th className="py-4 px-6">Required Subjects</th>
                <th className="py-4 px-6">Budget Range</th>
                <th className="py-4 px-6">Mode & Location</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    No parent inquiries match your criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((inq) => (
                  <tr key={inq.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-slate-900">
                      {inq.inquiryId}
                    </td>

                    <td className="py-4 px-6">
                      <span className="font-bold text-slate-900 block">{inq.parentName}</span>
                      <span className="text-[11px] text-slate-500">Student: {inq.studentName} ({inq.studentAge} yrs)</span>
                    </td>

                    <td className="py-4 px-6">
                      <span className="font-semibold text-slate-800 block">{inq.currentClass}</span>
                      <span className="text-[11px] text-slate-400">{inq.schoolBoard}</span>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-1 max-w-[180px]">
                        {inq.subjectsRequired.map((sub) => (
                          <span key={sub} className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[11px] font-semibold">
                            {sub}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="py-4 px-6 font-bold text-emerald-700">
                      {inq.budgetRange}
                    </td>

                    <td className="py-4 px-6 text-slate-600">
                      <span>{inq.teachingMode}</span>
                      <span className="block text-[11px] text-slate-400">{inq.address.city}</span>
                    </td>

                    <td className="py-4 px-6">
                      <select
                        value={inq.status}
                        onChange={(e) => updateInquiryStatus(inq.id, e.target.value as InquiryStatus)}
                        className="text-xs border border-slate-200 rounded-lg px-2 py-1 bg-white font-semibold text-slate-700 focus:outline-none"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Matching">Matching</option>
                        <option value="Tutor Suggested">Tutor Suggested</option>
                        <option value="Completed">Completed</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => onOpenMatchModal(inq)}
                        className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-sm shadow-blue-500/20 flex items-center gap-1.5 ml-auto"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-blue-300" />
                        Match Tutors
                      </button>
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

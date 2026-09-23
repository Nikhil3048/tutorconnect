import React, { useState, useEffect } from 'react';
import { findTutorByAppIdOrEmail } from '../../lib/supabase';
import type { TutorApplication } from '../../types';
import { StatusBadge } from '../common/Badge';
import { Search, Calendar, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface StatusCheckerProps {
  initialAppId?: string;
}

export const ApplicationStatusChecker: React.FC<StatusCheckerProps> = ({ initialAppId }) => {
  const [query, setQuery] = useState<string>(initialAppId || '');
  const [loading, setLoading] = useState<boolean>(false);
  const [tutorApp, setTutorApp] = useState<TutorApplication | null>(null);
  const [searched, setSearched] = useState<boolean>(false);
  const { addToast } = useAuth();

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) {
      addToast('Search Error', 'Please enter your Application ID or Email address.', 'warning');
      return;
    }

    setLoading(true);
    setSearched(true);
    try {
      const result = await findTutorByAppIdOrEmail(query.trim());
      setTutorApp(result);
      if (!result) {
        addToast('Not Found', 'No application found matching that ID or Email.', 'error');
      }
    } catch (err) {
      console.error('Lookup error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialAppId) {
      handleSearch();
    }
  }, [initialAppId]);

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
            <Search className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">Check Tutor Application Status</h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Track your registration progress, document verification status, and administrator messages.
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Enter Application ID (e.g. TUT-2026-0001) or Email"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none font-medium"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Searching...
              </>
            ) : (
              'Check Status'
            )}
          </button>
        </form>
      </div>

      {searched && (
        <>
          {tutorApp ? (
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden animate-slide-up">
              <div className="bg-slate-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-3">
                    <h3 className="text-xl font-black text-white font-mono tracking-wide">
                      {tutorApp.applicationId}
                    </h3>
                    <StatusBadge status={tutorApp.status} size="lg" />
                  </div>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    Submitted on {new Date(tutorApp.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>

                {tutorApp.photoUrl && (
                  <img
                    src={tutorApp.photoUrl}
                    alt={tutorApp.fullName}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-white/20 shadow-md shrink-0"
                  />
                )}
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                {tutorApp.status === 'Approved' && (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start space-x-3 text-emerald-900 text-xs">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm text-emerald-950">Application Approved!</h4>
                      <p className="mt-0.5 leading-relaxed">
                        Congratulations, your application and background documents have been verified. You are now active in our tutor matching pool!
                      </p>
                    </div>
                  </div>
                )}

                {tutorApp.status === 'Documents Required' && (
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start space-x-3 text-amber-900 text-xs">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm text-amber-950">Additional Action Required</h4>
                      <p className="mt-0.5 leading-relaxed">
                        The compliance team has requested additional documents or clearer copies. Please review the admin note below.
                      </p>
                    </div>
                  </div>
                )}

                {tutorApp.adminNotes && (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-1">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      Admin Message / Remarks:
                    </span>
                    <p className="text-xs text-slate-800 font-medium italic">
                      "{tutorApp.adminNotes}"
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-50 p-4 rounded-xl space-y-1">
                    <span className="text-slate-400 block font-medium">Applicant Name</span>
                    <span className="font-bold text-slate-800 text-sm">{tutorApp.fullName}</span>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl space-y-1">
                    <span className="text-slate-400 block font-medium">Contact Email & Phone</span>
                    <span className="font-semibold text-slate-800">{tutorApp.email} | +91 {tutorApp.mobile}</span>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl space-y-1">
                    <span className="text-slate-400 block font-medium">Teaching Subjects</span>
                    <span className="font-semibold text-slate-800">{tutorApp.teaching.subjects.join(', ')}</span>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl space-y-1">
                    <span className="text-slate-400 block font-medium">Highest Qualification</span>
                    <span className="font-semibold text-slate-800">{tutorApp.higherEdu.degree}</span>
                  </div>
                </div>

              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-3">
              <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto" />
              <h3 className="text-lg font-bold text-slate-800">No Record Found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                We couldn't find an application matching "{query}". Please check your Application ID (e.g. TUT-2026-0001) or register a new tutor profile.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

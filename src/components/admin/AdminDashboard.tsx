import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { StatsCard } from './StatsCard';
import { TutorApplicationsList } from './TutorApplicationsList';
import { ParentInquiriesList } from './ParentInquiriesList';
import { TutorProfileDetailModal } from './TutorProfileDetailModal';
import { TutorMatchingModal } from './TutorMatchingModal';
import type { TutorApplication, ParentInquiry } from '../../types';
import { 
  LayoutDashboard, Users, UserCheck, Clock, XCircle, 
  FileText, Sparkles, FolderLock, Settings, LogOut, 
  ShieldCheck 
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigateHome: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigateHome }) => {
  const { tutors, inquiries, logoutAdmin, adminEmail } = useAuth();

  const [activeTab, setActiveTab] = useState<'overview' | 'tutors' | 'inquiries' | 'matching' | 'documents' | 'settings'>('overview');
  
  const [selectedTutor, setSelectedTutor] = useState<TutorApplication | null>(null);
  const [selectedInquiryForMatch, setSelectedInquiryForMatch] = useState<ParentInquiry | null>(null);

  const totalTutors = tutors.length;
  const pendingTutors = tutors.filter(t => t.status === 'Submitted' || t.status === 'Under Review').length;
  const approvedTutors = tutors.filter(t => t.status === 'Approved').length;
  const rejectedTutors = tutors.filter(t => t.status === 'Rejected').length;
  const totalInquiries = inquiries.length;
  const newInquiries = inquiries.filter(i => i.status === 'New').length;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-slate-900 text-white flex-shrink-0 p-6 flex flex-col justify-between border-r border-slate-800">
        <div className="space-y-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-extrabold text-base tracking-tight text-white">Admin Control</h2>
              <p className="text-[11px] text-emerald-400 font-mono">System Active</p>
            </div>
          </div>

          <nav className="space-y-1.5">
            {[
              { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
              { id: 'tutors', label: 'Tutor Applications', icon: Users, badge: pendingTutors > 0 ? pendingTutors : undefined },
              { id: 'inquiries', label: 'Parent Inquiries', icon: FileText, badge: newInquiries > 0 ? newInquiries : undefined },
              { id: 'matching', label: 'Tutor Matching Engine', icon: Sparkles },
              { id: 'documents', label: 'Documents Vault', icon: FolderLock },
              { id: 'settings', label: 'Platform Settings', icon: Settings },
            ].map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-800 space-y-3">
          <div className="text-xs text-slate-400">
            <span className="block font-semibold text-slate-200">Logged in as</span>
            <span className="text-[11px] text-slate-400 truncate block">{adminEmail || 'admin@tutorconnect.com'}</span>
          </div>

          <button
            onClick={() => {
              logoutAdmin();
              onNavigateHome();
            }}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-rose-950/80 hover:text-rose-400 text-slate-300 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-8 border-b border-slate-200 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {activeTab === 'overview' && 'System Overview & Analytics'}
              {activeTab === 'tutors' && 'Teacher / Tutor Applications'}
              {activeTab === 'inquiries' && 'Parent Requirements & Inquiries'}
              {activeTab === 'matching' && 'Smart Tutor Matching Engine'}
              {activeTab === 'documents' && 'Identity & Qualification Document Vault'}
              {activeTab === 'settings' && 'Platform Settings & Security'}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Verify applications, review documents, and match tutors with parents in real time.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onNavigateHome}
              className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
            >
              Public Website View
            </button>
          </div>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <StatsCard
                title="Total Tutor Applications"
                value={totalTutors}
                subtitle="All submitted profiles"
                icon={Users}
                color="blue"
                onClick={() => setActiveTab('tutors')}
              />
              <StatsCard
                title="Pending Verification"
                value={pendingTutors}
                subtitle="Awaiting document review"
                icon={Clock}
                color="amber"
                onClick={() => setActiveTab('tutors')}
              />
              <StatsCard
                title="Approved Tutors"
                value={approvedTutors}
                subtitle="Active in matching pool"
                icon={UserCheck}
                color="emerald"
                onClick={() => setActiveTab('tutors')}
              />
              <StatsCard
                title="Total Parent Inquiries"
                value={totalInquiries}
                subtitle="Parent tuition requests"
                icon={FileText}
                color="purple"
                onClick={() => setActiveTab('inquiries')}
              />
              <StatsCard
                title="New Inquiries"
                value={newInquiries}
                subtitle="Unmatched requests"
                icon={Sparkles}
                color="indigo"
                onClick={() => setActiveTab('inquiries')}
              />
              <StatsCard
                title="Rejected Applications"
                value={rejectedTutors}
                subtitle="Incomplete or invalid docs"
                icon={XCircle}
                color="rose"
                onClick={() => setActiveTab('tutors')}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-500" />
                    Pending Verification Applications
                  </h3>
                  <button
                    onClick={() => setActiveTab('tutors')}
                    className="text-xs text-blue-600 hover:underline font-semibold"
                  >
                    View All
                  </button>
                </div>

                <div className="space-y-3">
                  {tutors.filter(t => t.status === 'Submitted' || t.status === 'Under Review').slice(0, 3).map(t => (
                    <div key={t.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-900 text-xs block">{t.fullName}</span>
                        <span className="text-[11px] text-slate-500">{t.higherEdu.degree} • {t.teaching.subjects.join(', ')}</span>
                      </div>
                      <button
                        onClick={() => setSelectedTutor(t)}
                        className="px-3 py-1.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-xs"
                      >
                        Inspect
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-500" />
                    Recent Parent Tuition Requirements
                  </h3>
                  <button
                    onClick={() => setActiveTab('inquiries')}
                    className="text-xs text-blue-600 hover:underline font-semibold"
                  >
                    View All
                  </button>
                </div>

                <div className="space-y-3">
                  {inquiries.slice(0, 3).map(inq => (
                    <div key={inq.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-900 text-xs block">{inq.parentName} ({inq.studentName})</span>
                        <span className="text-[11px] text-indigo-700 font-semibold">{inq.currentClass} • {inq.subjectsRequired.join(', ')}</span>
                      </div>
                      <button
                        onClick={() => setSelectedInquiryForMatch(inq)}
                        className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-xs flex items-center gap-1"
                      >
                        Match
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tutors' && (
          <TutorApplicationsList
            tutors={tutors}
            onSelectTutor={(t) => setSelectedTutor(t)}
          />
        )}

        {activeTab === 'inquiries' && (
          <ParentInquiriesList
            inquiries={inquiries}
            onOpenMatchModal={(inq) => setSelectedInquiryForMatch(inq)}
          />
        )}

        {activeTab === 'matching' && (
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-slate-900">Select a Parent Inquiry to Launch Tutor Matching</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {inquiries.map(inq => (
                <div key={inq.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{inq.parentName} ({inq.studentName})</h4>
                    <p className="text-xs text-indigo-700 font-semibold mt-0.5">{inq.currentClass} • {inq.subjectsRequired.join(', ')}</p>
                    <p className="text-[11px] text-emerald-700 font-bold mt-1">Budget: {inq.budgetRange}</p>
                  </div>
                  <button
                    onClick={() => setSelectedInquiryForMatch(inq)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-md"
                  >
                    Run Match
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <FolderLock className="w-8 h-8 text-blue-400" />
              <div>
                <h3 className="text-xl font-extrabold text-white">Private Document Storage Vault</h3>
                <p className="text-xs text-slate-400">Identity proofs and marksheets are encrypted and stored in isolated Supabase storage buckets.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tutors.map(t => (
                <div key={t.id} className="p-4 rounded-2xl bg-slate-800 border border-slate-700 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">{t.fullName}</span>
                    <span className="text-[10px] text-blue-400 font-mono">{t.identityDoc.docType}</span>
                  </div>
                  <p className="text-slate-400 font-mono">Doc #: {t.identityDoc.docNumber}</p>
                  <button
                    onClick={() => setSelectedTutor(t)}
                    className="w-full py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-semibold text-[11px] mt-2"
                  >
                    Inspect File & Marksheets
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm max-w-2xl space-y-6">
            <h3 className="text-xl font-bold text-slate-900">Platform Credentials & Security Settings</h3>
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-400 block uppercase font-bold">Admin Email</span>
                <span className="font-bold text-slate-800 text-sm">{adminEmail || 'admin@tutorconnect.com'}</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-400 block uppercase font-bold">Supabase PostgreSQL Connection</span>
                <span className="font-semibold text-emerald-600">Connected & Operational</span>
              </div>
            </div>
          </div>
        )}

      </main>

      {selectedTutor && (
        <TutorProfileDetailModal
          tutor={selectedTutor}
          onClose={() => setSelectedTutor(null)}
        />
      )}

      {selectedInquiryForMatch && (
        <TutorMatchingModal
          inquiry={selectedInquiryForMatch}
          tutors={tutors}
          onClose={() => setSelectedInquiryForMatch(null)}
          onViewTutorProfile={(t) => {
            setSelectedInquiryForMatch(null);
            setSelectedTutor(t);
          }}
        />
      )}
    </div>
  );
};

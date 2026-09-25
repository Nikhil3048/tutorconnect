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
  ShieldCheck, Trash2, Database, Copy, Check, UserPlus, UserMinus
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigateHome: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigateHome }) => {
  const { tutors, inquiries, logoutAdmin, adminEmail, clearAllData, addToast } = useAuth();
  const [copiedSql, setCopiedSql] = useState<string | null>(null);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [removeAdminEmail, setRemoveAdminEmail] = useState('');

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
          <div className="space-y-6 max-w-4xl">
            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
              <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <Settings className="w-5 h-5 text-blue-600" />
                Platform Credentials & Security Settings
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-slate-400 block uppercase font-bold text-[10px]">Active Admin Session</span>
                  <span className="font-bold text-slate-800 text-sm">{adminEmail || 'admin@tutorconnect.com'}</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-slate-400 block uppercase font-bold text-[10px]">Supabase Database Engine</span>
                  <span className="font-semibold text-emerald-600 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Connected & Operational
                  </span>
                </div>
              </div>

              {/* Data Purge Section */}
              <div className="pt-4 border-t border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <Trash2 className="w-4 h-4 text-rose-500" />
                      Wipe Sample & Dummy Data
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Clear all mock tutors, inquiries, and local test records to start with a 100% clean production database.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to wipe all dummy data?')) {
                        clearAllData();
                      }
                    }}
                    className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 flex-shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                    Wipe Dummy Data
                  </button>
                </div>
              </div>
            </div>

            {/* Supabase Database Admin Tools */}
            <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl space-y-6">
              <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
                <Database className="w-7 h-7 text-emerald-400" />
                <div>
                  <h3 className="text-lg font-extrabold text-white">Supabase Admin & SQL Maintenance Tools</h3>
                  <p className="text-xs text-slate-400">Run these SQL queries in your Supabase SQL Editor (https://supabase.com/dashboard) to create Admins or clean tables.</p>
                </div>
              </div>

              {/* Tool 1: Create Admin SQL */}
              <div className="space-y-3 bg-slate-800/80 p-5 rounded-2xl border border-slate-700">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-emerald-400 flex items-center gap-2">
                    <UserPlus className="w-4 h-4" />
                    1. Create or Grant Admin Role in Supabase
                  </h4>
                  <button
                    onClick={() => {
                      const target = newAdminEmail.trim() || 'admin@tutorconnect.com';
                      const sql = `-- Grant Admin access to user email in Supabase\nUPDATE public.profiles SET role = 'admin' WHERE email = '${target}';\n\n-- Or create admin user profile:\nINSERT INTO public.profiles (id, role, full_name, email)\nVALUES (gen_random_uuid(), 'admin', 'Super Admin', '${target}')\nON CONFLICT (email) DO UPDATE SET role = 'admin';`;
                      navigator.clipboard.writeText(sql);
                      setCopiedSql('admin');
                      addToast('Copied SQL!', 'Create Admin SQL script copied to clipboard', 'success');
                      setTimeout(() => setCopiedSql(null), 2500);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5"
                  >
                    {copiedSql === 'admin' ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedSql === 'admin' ? 'Copied SQL!' : 'Copy Create Admin SQL'}
                  </button>
                </div>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter email to make Admin (e.g., admin@tutorconnect.com)"
                    value={newAdminEmail}
                    onChange={(e) => setNewAdminEmail(e.target.value)}
                    className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <pre className="p-3 bg-slate-950 rounded-xl font-mono text-[11px] text-slate-300 overflow-x-auto leading-relaxed border border-slate-800">
{`-- Execute in Supabase SQL Editor:
UPDATE public.profiles SET role = 'admin' WHERE email = '${newAdminEmail.trim() || 'admin@tutorconnect.com'}';`}
                </pre>
              </div>

              {/* Tool 2: Remove / Revoke Admin SQL */}
              <div className="space-y-3 bg-slate-800/80 p-5 rounded-2xl border border-slate-700">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-amber-400 flex items-center gap-2">
                    <UserMinus className="w-4 h-4" />
                    2. Remove / Revoke Admin Role in Supabase
                  </h4>
                  <button
                    onClick={() => {
                      const target = removeAdminEmail.trim() || 'user@example.com';
                      const sql = `-- Revoke Admin role from user email in Supabase\nUPDATE public.profiles SET role = 'tutor' WHERE LOWER(email) = LOWER('${target}') AND role = 'admin';`;
                      navigator.clipboard.writeText(sql);
                      setCopiedSql('remove_admin');
                      addToast('Copied SQL!', 'Remove Admin SQL script copied to clipboard', 'success');
                      setTimeout(() => setCopiedSql(null), 2500);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center gap-1.5"
                  >
                    {copiedSql === 'remove_admin' ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedSql === 'remove_admin' ? 'Copied SQL!' : 'Copy Remove Admin SQL'}
                  </button>
                </div>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter email to revoke Admin role (e.g., user@example.com)"
                    value={removeAdminEmail}
                    onChange={(e) => setRemoveAdminEmail(e.target.value)}
                    className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <pre className="p-3 bg-slate-950 rounded-xl font-mono text-[11px] text-slate-300 overflow-x-auto leading-relaxed border border-slate-800">
{`-- Execute in Supabase SQL Editor:
UPDATE public.profiles SET role = 'tutor' WHERE LOWER(email) = LOWER('${removeAdminEmail.trim() || 'user@example.com'}') AND role = 'admin';`}
                </pre>
              </div>

              {/* Tool 3: Clean Dummy Data SQL */}
              <div className="space-y-3 bg-slate-800/80 p-5 rounded-2xl border border-slate-700">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-rose-400 flex items-center gap-2">
                    <Trash2 className="w-4 h-4" />
                    3. Clear All Dummy Data in Supabase Database
                  </h4>
                  <button
                    onClick={() => {
                      const sql = `-- Truncate all application data tables in Supabase\nTRUNCATE TABLE public.tutor_matches CASCADE;\nTRUNCATE TABLE public.parent_inquiries CASCADE;\nTRUNCATE TABLE public.tutor_applications CASCADE;`;
                      navigator.clipboard.writeText(sql);
                      setCopiedSql('clean');
                      addToast('Copied SQL!', 'Clean Database SQL script copied to clipboard', 'success');
                      setTimeout(() => setCopiedSql(null), 2500);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5"
                  >
                    {copiedSql === 'clean' ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedSql === 'clean' ? 'Copied SQL!' : 'Copy Clean Tables SQL'}
                  </button>
                </div>
                <pre className="p-3 bg-slate-950 rounded-xl font-mono text-[11px] text-slate-300 overflow-x-auto leading-relaxed border border-slate-800">
{`-- Truncate all application tables in Supabase SQL Editor:
TRUNCATE TABLE public.tutor_matches CASCADE;
TRUNCATE TABLE public.parent_inquiries CASCADE;
TRUNCATE TABLE public.tutor_applications CASCADE;`}
                </pre>
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

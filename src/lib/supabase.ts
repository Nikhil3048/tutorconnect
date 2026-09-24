import { createClient } from '@supabase/supabase-js';
import type { TutorApplication, ParentInquiry, TutorMatch, TutorApplicationStatus, InquiryStatus } from '../types';
import { INITIAL_TUTORS, INITIAL_INQUIRIES, INITIAL_MATCHES } from './seedData';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL || '') as string;
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '') as string;

const isValidSupabaseUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (
    trimmed.includes('your-supabase-project') ||
    trimmed.includes('your-project-id') ||
    trimmed.includes('your-anon-key') ||
    trimmed.includes('YOUR_') ||
    trimmed.includes('example.com') ||
    trimmed.includes('placeholder')
  ) {
    return false;
  }
  try {
    const parsed = new URL(trimmed);
    return (parsed.protocol === 'http:' || parsed.protocol === 'https:') && !parsed.hostname.includes('your-');
  } catch {
    return false;
  }
};

const isValidSupabaseKey = (key: string): boolean => {
  if (!key || typeof key !== 'string') return false;
  const trimmed = key.trim();
  if (
    trimmed.includes('your-anon-key') ||
    trimmed.includes('your-supabase') ||
    trimmed.includes('YOUR_') ||
    trimmed.includes('placeholder')
  ) {
    return false;
  }
  return trimmed.length > 10;
};

export const isSupabaseConfigured = isValidSupabaseUrl(supabaseUrl) && isValidSupabaseKey(supabaseAnonKey);

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

const LOCAL_STORAGE_TUTORS_KEY = 'tutorconnect_tutors_v1';
const LOCAL_STORAGE_INQUIRIES_KEY = 'tutorconnect_inquiries_v1';
const LOCAL_STORAGE_MATCHES_KEY = 'tutorconnect_matches_v1';

const initLocalStorage = () => {
  if (typeof window === 'undefined') return;
  
  if (!localStorage.getItem(LOCAL_STORAGE_TUTORS_KEY)) {
    localStorage.setItem(LOCAL_STORAGE_TUTORS_KEY, JSON.stringify(INITIAL_TUTORS));
  }
  if (!localStorage.getItem(LOCAL_STORAGE_INQUIRIES_KEY)) {
    localStorage.setItem(LOCAL_STORAGE_INQUIRIES_KEY, JSON.stringify(INITIAL_INQUIRIES));
  }
  if (!localStorage.getItem(LOCAL_STORAGE_MATCHES_KEY)) {
    localStorage.setItem(LOCAL_STORAGE_MATCHES_KEY, JSON.stringify(INITIAL_MATCHES));
  }
};

initLocalStorage();

export const getTutors = async (): Promise<TutorApplication[]> => {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('tutor_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data && data.length > 0) {
        return data.map((row) => ({
          id: row.id,
          applicationId: row.application_id,
          userId: row.user_id,
          fullName: row.full_name,
          guardianName: row.guardian_name,
          dob: row.dob,
          gender: row.gender,
          mobile: row.mobile,
          whatsapp: row.whatsapp,
          email: row.email,
          alternateContact: row.alternate_contact,
          photoUrl: row.photo_url,
          photoFileName: row.photo_file_name,
          currentAddress: row.current_address,
          permanentAddress: row.permanent_address,
          sameAsCurrent: row.same_as_current,
          class10: row.class10_details,
          class12: row.class12_details,
          higherEdu: row.higher_edu_details,
          teaching: row.teaching_details,
          identityDoc: row.identity_doc,
          additionalCertificates: row.additional_certificates,
          confirmedCorrect: row.confirmed_correct,
          agreedToTerms: row.agreed_to_terms,
          status: row.status,
          adminNotes: row.admin_notes,
          createdAt: row.created_at,
          updatedAt: row.updated_at,
        }));
      }
    } catch (err) {
      console.warn('Supabase fetch failed, falling back to local storage:', err);
    }
  }

  const stored = localStorage.getItem(LOCAL_STORAGE_TUTORS_KEY);
  return stored ? JSON.parse(stored) : INITIAL_TUTORS;
};

export const submitTutorApplication = async (appData: Omit<TutorApplication, 'id' | 'applicationId' | 'createdAt' | 'updatedAt' | 'status'>): Promise<TutorApplication> => {
  const count = (await getTutors()).length + 1;
  const year = new Date().getFullYear();
  const applicationId = `TUT-${year}-${String(count).padStart(4, '0')}`;
  const now = new Date().toISOString();
  const id = 'tut-' + Math.random().toString(36).substring(2, 9);

  const newApp: TutorApplication = {
    ...appData,
    id,
    applicationId,
    status: 'Submitted',
    createdAt: now,
    updatedAt: now,
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('tutor_applications')
        .insert([{
          application_id: applicationId,
          full_name: appData.fullName,
          guardian_name: appData.guardianName,
          dob: appData.dob,
          gender: appData.gender,
          mobile: appData.mobile,
          whatsapp: appData.whatsapp,
          email: appData.email,
          alternate_contact: appData.alternateContact,
          photo_url: appData.photoUrl,
          photo_file_name: appData.photoFileName,
          current_address: appData.currentAddress,
          permanent_address: appData.permanentAddress,
          same_as_current: appData.sameAsCurrent,
          class10_details: appData.class10,
          class12_details: appData.class12,
          higher_edu_details: appData.higherEdu,
          teaching_details: appData.teaching,
          identity_doc: appData.identityDoc,
          additional_certificates: appData.additionalCertificates || [],
          confirmed_correct: appData.confirmedCorrect,
          agreed_to_terms: appData.agreedToTerms,
          status: 'Submitted'
        }])
        .select()
        .single();

      if (error) console.error('Error inserting to Supabase:', error);
      if (data) {
        newApp.id = data.id;
      }
    } catch (err) {
      console.warn('Supabase insert failed, storing locally:', err);
    }
  }

  const current = await getTutors();
  const updated = [newApp, ...current];
  localStorage.setItem(LOCAL_STORAGE_TUTORS_KEY, JSON.stringify(updated));

  return newApp;
};

export const updateTutorStatus = async (
  tutorId: string, 
  status: TutorApplicationStatus, 
  adminNotes?: string
): Promise<void> => {
  const now = new Date().toISOString();

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase
        .from('tutor_applications')
        .update({ status, admin_notes: adminNotes, updated_at: now })
        .eq('id', tutorId);
    } catch (err) {
      console.warn('Supabase update failed, updating locally:', err);
    }
  }

  const current = await getTutors();
  const updated = current.map(t => {
    if (t.id === tutorId || t.applicationId === tutorId) {
      return { ...t, status, adminNotes: adminNotes ?? t.adminNotes, updatedAt: now };
    }
    return t;
  });
  localStorage.setItem(LOCAL_STORAGE_TUTORS_KEY, JSON.stringify(updated));
};

export const findTutorByAppIdOrEmail = async (query: string): Promise<TutorApplication | null> => {
  const tutors = await getTutors();
  const cleanQuery = query.trim().toLowerCase();
  return tutors.find(
    t => t.applicationId.toLowerCase() === cleanQuery || t.email.toLowerCase() === cleanQuery || t.mobile === cleanQuery
  ) || null;
};

export const getParentInquiries = async (): Promise<ParentInquiry[]> => {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('parent_inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data && data.length > 0) {
        return data.map((row) => ({
          id: row.id,
          inquiryId: row.inquiry_id,
          parentName: row.parent_name,
          mobile: row.mobile,
          whatsapp: row.whatsapp,
          email: row.email,
          studentName: row.student_name,
          studentAge: row.student_age,
          currentClass: row.current_class,
          schoolBoard: row.school_board,
          subjectsRequired: row.subjects_required,
          preferredGender: row.preferred_gender,
          qualificationPreference: row.qualification_preference,
          budgetRange: row.budget_range,
          minBudget: row.min_budget,
          maxBudget: row.max_budget,
          teachingMode: row.teaching_mode,
          address: row.address,
          preferredDays: row.preferred_days,
          preferredTimeSlots: row.preferred_time_slots,
          additionalRequirements: row.additional_requirements,
          status: row.status,
          createdAt: row.created_at,
          updatedAt: row.updated_at,
        }));
      }
    } catch (err) {
      console.warn('Supabase fetch failed, falling back to local storage:', err);
    }
  }

  const stored = localStorage.getItem(LOCAL_STORAGE_INQUIRIES_KEY);
  return stored ? JSON.parse(stored) : INITIAL_INQUIRIES;
};

export const submitParentInquiry = async (inqData: Omit<ParentInquiry, 'id' | 'inquiryId' | 'createdAt' | 'updatedAt' | 'status'>): Promise<ParentInquiry> => {
  const count = (await getParentInquiries()).length + 1;
  const year = new Date().getFullYear();
  const inquiryId = `INQ-${year}-${String(count).padStart(4, '0')}`;
  const now = new Date().toISOString();
  const id = 'inq-' + Math.random().toString(36).substring(2, 9);

  const newInquiry: ParentInquiry = {
    ...inqData,
    id,
    inquiryId,
    status: 'New',
    createdAt: now,
    updatedAt: now,
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from('parent_inquiries')
        .insert([{
          inquiry_id: inquiryId,
          parent_name: inqData.parentName,
          mobile: inqData.mobile,
          whatsapp: inqData.whatsapp,
          email: inqData.email,
          student_name: inqData.studentName,
          student_age: inqData.studentAge,
          current_class: inqData.currentClass,
          school_board: inqData.schoolBoard,
          subjects_required: inqData.subjectsRequired,
          preferred_gender: inqData.preferredGender,
          qualification_preference: inqData.qualificationPreference,
          budget_range: inqData.budgetRange,
          min_budget: inqData.minBudget,
          max_budget: inqData.maxBudget,
          teaching_mode: inqData.teachingMode,
          address: inqData.address,
          preferred_days: inqData.preferredDays,
          preferred_time_slots: inqData.preferredTimeSlots,
          additional_requirements: inqData.additionalRequirements,
          status: 'New'
        }]);

      if (error) {
        console.warn('Supabase insert warning:', error);
      }
    } catch (err) {
      console.warn('Supabase insert failed, saving locally:', err);
    }
  }

  const current = await getParentInquiries();
  const updated = [newInquiry, ...current];
  localStorage.setItem(LOCAL_STORAGE_INQUIRIES_KEY, JSON.stringify(updated));

  return newInquiry;
};

export const updateInquiryStatus = async (
  inquiryId: string, 
  status: InquiryStatus
): Promise<void> => {
  const now = new Date().toISOString();

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase
        .from('parent_inquiries')
        .update({ status, updated_at: now })
        .eq('id', inquiryId);
    } catch (err) {
      console.warn('Supabase inquiry update failed:', err);
    }
  }

  const current = await getParentInquiries();
  const updated = current.map(i => {
    if (i.id === inquiryId || i.inquiryId === inquiryId) {
      return { ...i, status, updatedAt: now };
    }
    return i;
  });
  localStorage.setItem(LOCAL_STORAGE_INQUIRIES_KEY, JSON.stringify(updated));
};

export const getTutorMatches = async (): Promise<TutorMatch[]> => {
  const stored = localStorage.getItem(LOCAL_STORAGE_MATCHES_KEY);
  return stored ? JSON.parse(stored) : INITIAL_MATCHES;
};

export const saveTutorMatch = async (match: Omit<TutorMatch, 'id' | 'createdAt'>): Promise<TutorMatch> => {
  const matches = await getTutorMatches();
  const existing = matches.find(m => m.inquiryId === match.inquiryId && m.tutorId === match.tutorId);
  const now = new Date().toISOString();

  let newMatch: TutorMatch;

  if (existing) {
    newMatch = {
      ...existing,
      ...match,
      createdAt: now,
    };
  } else {
    newMatch = {
      ...match,
      id: 'match-' + Math.random().toString(36).substring(2, 9),
      createdAt: now,
    };
  }

  const filtered = matches.filter(m => !(m.inquiryId === match.inquiryId && m.tutorId === match.tutorId));
  const updated = [newMatch, ...filtered];
  localStorage.setItem(LOCAL_STORAGE_MATCHES_KEY, JSON.stringify(updated));

  return newMatch;
};

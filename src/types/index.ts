export type UserRole = 'admin' | 'tutor' | 'parent';

export type TutorApplicationStatus = 
  | 'Submitted' 
  | 'Under Review' 
  | 'Documents Required' 
  | 'Approved' 
  | 'Rejected';

export type Gender = 'Male' | 'Female' | 'Other';
export type PreferredGender = 'No Preference' | 'Male' | 'Female';

export type TeachingMode = 'Online' | 'Offline' | 'Both';

export type FeeType = 'Per Hour' | 'Per Class' | 'Per Month';

export type LocationPreference = 
  | 'Home Tuition' 
  | "Student's Home" 
  | "Tutor's Home" 
  | 'Online' 
  | 'Coaching/Institute';

export type QualificationPreference = 'Graduate' | 'Postgraduate' | 'Any Qualified Tutor';

export type InquiryStatus = 
  | 'New' 
  | 'Contacted' 
  | 'Matching' 
  | 'Tutor Suggested' 
  | 'Completed' 
  | 'Closed';

export interface Address {
  houseNo: string;
  street: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
}

export interface Class10Education {
  board: string;
  passingYear: string;
  schoolName: string;
  percentage: string;
  marksheetUrl?: string;
  marksheetFileName?: string;
}

export interface Class12Education {
  board: string;
  passingYear: string;
  schoolName: string;
  percentage: string;
  stream: 'Science' | 'Commerce' | 'Arts' | 'Other' | '';
  marksheetUrl?: string;
  marksheetFileName?: string;
}

export interface HigherEducation {
  highestQualification: string;
  degree: string;
  institution: string;
  passingYear: string;
  percentage: string;
  certificateUrl?: string;
  certificateFileName?: string;
  postGraduationDetails?: string;
  otherCertifications?: string;
}

export interface TeachingDetails {
  subjects: string[];
  customSubject?: string;
  classes: string[];
  yearsOfExperience: number;
  previousExperience: string;
  currentOccupation: string;
  teachingMode: TeachingMode;
  preferredLocations: LocationPreference[];
  availableDays: string[];
  availableTimeSlots: ('Morning' | 'Afternoon' | 'Evening')[];
  minFee: number;
  maxFee: number;
  feeType: FeeType;
}

export type IdentityDocType = 
  | 'Aadhaar Card' 
  | 'Voter ID' 
  | 'PAN Card' 
  | 'Driving Licence' 
  | 'Passport' 
  | 'Other';

export interface DocumentUpload {
  id?: string;
  docType: IdentityDocType;
  docNumber: string;
  fileUrl: string;
  fileName: string;
  fileSize?: string;
  uploadedAt: string;
}

export interface TutorApplication {
  id: string;
  applicationId: string; // e.g. TUT-2026-0001
  userId?: string;
  
  // Step 1: Personal Details
  fullName: string;
  guardianName: string;
  dob: string;
  gender: Gender;
  mobile: string;
  whatsapp: string;
  email: string;
  alternateContact?: string;
  photoUrl?: string;
  photoFileName?: string;

  // Step 2: Address
  currentAddress: Address;
  permanentAddress: Address;
  sameAsCurrent: boolean;

  // Step 3: Education
  class10: Class10Education;
  class12: Class12Education;
  higherEdu: HigherEducation;

  // Step 4: Teaching
  teaching: TeachingDetails;

  // Step 5: Documents
  identityDoc: DocumentUpload;
  additionalCertificates?: DocumentUpload[];

  // Step 6: Meta & Status
  confirmedCorrect: boolean;
  agreedToTerms: boolean;
  status: TutorApplicationStatus;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ParentInquiry {
  id: string;
  inquiryId: string; // e.g. INQ-2026-0001
  
  // Parent Details
  parentName: string;
  mobile: string;
  whatsapp: string;
  email: string;
  studentName: string;
  studentAge: number;

  // Student Education
  currentClass: string;
  schoolBoard: string;
  subjectsRequired: string[];

  // Tutor Preference
  preferredGender: PreferredGender;
  qualificationPreference: QualificationPreference;
  
  // Budget
  budgetRange: string;
  minBudget?: number;
  maxBudget?: number;

  // Teaching Mode & Location
  teachingMode: TeachingMode;
  address: Address;

  // Schedule
  preferredDays: string[];
  preferredTimeSlots: ('Morning' | 'Afternoon' | 'Evening')[];

  // Additional Requirements
  additionalRequirements?: string;

  // Status & Meta
  status: InquiryStatus;
  createdAt: string;
  updatedAt: string;
}

export interface TutorMatch {
  id: string;
  inquiryId: string;
  tutorId: string;
  matchScore: number; // 0-100%
  matchReasons: string[];
  matchStatus: 'Suggested' | 'Shortlisted' | 'Assigned' | 'Rejected';
  adminNotes?: string;
  createdAt: string;
}

export interface FilterOptions {
  searchQuery?: string;
  status?: string;
  gender?: string;
  subject?: string;
  qualification?: string;
  location?: string;
  minExperience?: number;
  maxFee?: number;
  teachingMode?: string;
}

import type { TutorApplication, ParentInquiry, TutorMatch } from '../types';

export const INITIAL_TUTORS: TutorApplication[] = [
  {
    id: 'tut-uuid-001',
    applicationId: 'TUT-2026-0001',
    fullName: 'Rahul Kumar',
    guardianName: 'Ramesh Kumar',
    dob: '1995-08-14',
    gender: 'Male',
    mobile: '9876543210',
    whatsapp: '9876543210',
    email: 'rahul.kumar@example.com',
    alternateContact: '9876543211',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    photoFileName: 'rahul_photo.jpg',
    currentAddress: {
      houseNo: '42-B',
      street: 'Green Park Extension',
      city: 'New Delhi',
      district: 'South Delhi',
      state: 'Delhi',
      pincode: '110016'
    },
    permanentAddress: {
      houseNo: '42-B',
      street: 'Green Park Extension',
      city: 'New Delhi',
      district: 'South Delhi',
      state: 'Delhi',
      pincode: '110016'
    },
    sameAsCurrent: true,
    class10: {
      board: 'CBSE',
      passingYear: '2011',
      schoolName: 'Delhi Public School, R.K. Puram',
      percentage: '94.5',
      marksheetFileName: 'class10_rahul.pdf'
    },
    class12: {
      board: 'CBSE',
      passingYear: '2013',
      schoolName: 'Delhi Public School, R.K. Puram',
      percentage: '92.8',
      stream: 'Science',
      marksheetFileName: 'class12_rahul.pdf'
    },
    higherEdu: {
      highestQualification: 'Master of Science (M.Sc.)',
      degree: 'M.Sc. Mathematics',
      institution: 'University of Delhi (Hindu College)',
      passingYear: '2018',
      percentage: '88.2',
      certificateFileName: 'msc_certificate_rahul.pdf',
      otherCertifications: 'B.Ed. in Mathematics Pedagogy'
    },
    teaching: {
      subjects: ['Mathematics', 'Physics'],
      classes: ['Class 9', 'Class 10', 'Class 11', 'Class 12'],
      yearsOfExperience: 6,
      previousExperience: 'Senior Math Tutor at FIITJEE & Private Home Tutor for 5+ years.',
      currentOccupation: 'Full-time Private Tutor',
      teachingMode: 'Both',
      preferredLocations: ['Home Tuition', "Student's Home", 'Online'],
      availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      availableTimeSlots: ['Afternoon', 'Evening'],
      minFee: 4000,
      maxFee: 7000,
      feeType: 'Per Month'
    },
    identityDoc: {
      docType: 'Aadhaar Card',
      docNumber: 'XXXX-XXXX-4921',
      fileUrl: '#preview-aadhaar',
      fileName: 'aadhaar_rahul.pdf',
      uploadedAt: '2026-09-10T10:30:00Z'
    },
    confirmedCorrect: true,
    agreedToTerms: true,
    status: 'Approved',
    adminNotes: 'Verified all educational marksheets and Aadhaar card. Highly recommended for Senior Mathematics.',
    createdAt: '2026-09-10T10:30:00Z',
    updatedAt: '2026-09-11T14:20:00Z'
  },
  {
    id: 'tut-uuid-002',
    applicationId: 'TUT-2026-0002',
    fullName: 'Priya Singh',
    guardianName: 'Sanjay Singh',
    dob: '1998-03-22',
    gender: 'Female',
    mobile: '9811223344',
    whatsapp: '9811223344',
    email: 'priya.singh@example.com',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    photoFileName: 'priya_profile.png',
    currentAddress: {
      houseNo: '108',
      street: 'Vasant Kunj Sector C',
      city: 'New Delhi',
      district: 'South West Delhi',
      state: 'Delhi',
      pincode: '110070'
    },
    permanentAddress: {
      houseNo: '108',
      street: 'Vasant Kunj Sector C',
      city: 'New Delhi',
      district: 'South West Delhi',
      state: 'Delhi',
      pincode: '110070'
    },
    sameAsCurrent: true,
    class10: {
      board: 'ICSE',
      passingYear: '2014',
      schoolName: 'St. Xavier High School',
      percentage: '91.0'
    },
    class12: {
      board: 'ISC',
      passingYear: '2016',
      schoolName: 'St. Xavier High School',
      percentage: '93.5',
      stream: 'Arts'
    },
    higherEdu: {
      highestQualification: 'Master of Arts (M.A.)',
      degree: 'M.A. English Literature',
      institution: 'Lady Shri Ram College for Women (LSR)',
      passingYear: '2021',
      percentage: '84.0',
      otherCertifications: 'CELTA Certified English Educator'
    },
    teaching: {
      subjects: ['English', 'Social Science'],
      classes: ['Class 6–8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'],
      yearsOfExperience: 4,
      previousExperience: 'Lecturer at Oxford Convent School & online IELTS/English tutor.',
      currentOccupation: 'School Teacher & Tutor',
      teachingMode: 'Online',
      preferredLocations: ['Online'],
      availableDays: ['Monday', 'Wednesday', 'Friday', 'Sunday'],
      availableTimeSlots: ['Evening'],
      minFee: 3500,
      maxFee: 5500,
      feeType: 'Per Month'
    },
    identityDoc: {
      docType: 'Passport',
      docNumber: 'Z8921043',
      fileUrl: '#preview-passport',
      fileName: 'passport_priya.pdf',
      uploadedAt: '2026-09-12T11:15:00Z'
    },
    confirmedCorrect: true,
    agreedToTerms: true,
    status: 'Approved',
    adminNotes: 'Verified CELTA certification and LSR degree. Excellent communications skills.',
    createdAt: '2026-09-12T11:15:00Z',
    updatedAt: '2026-09-13T09:00:00Z'
  },
  {
    id: 'tut-uuid-003',
    applicationId: 'TUT-2026-0003',
    fullName: 'Amit Kumar',
    guardianName: 'Mahesh Kumar',
    dob: '1996-11-05',
    gender: 'Male',
    mobile: '9711889900',
    whatsapp: '9711889900',
    email: 'amit.physics@example.com',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    photoFileName: 'amit_photo.jpg',
    currentAddress: {
      houseNo: 'B-14',
      street: 'Janakpuri Block B',
      city: 'New Delhi',
      district: 'West Delhi',
      state: 'Delhi',
      pincode: '110058'
    },
    permanentAddress: {
      houseNo: 'B-14',
      street: 'Janakpuri Block B',
      city: 'New Delhi',
      district: 'West Delhi',
      state: 'Delhi',
      pincode: '110058'
    },
    sameAsCurrent: true,
    class10: {
      board: 'CBSE',
      passingYear: '2012',
      schoolName: 'Kendriya Vidyalaya',
      percentage: '89.0'
    },
    class12: {
      board: 'CBSE',
      passingYear: '2014',
      schoolName: 'Kendriya Vidyalaya',
      percentage: '91.2',
      stream: 'Science'
    },
    higherEdu: {
      highestQualification: 'Bachelor of Technology (B.Tech)',
      degree: 'B.Tech Mechanical Engineering',
      institution: 'IIT Delhi',
      passingYear: '2018',
      percentage: '82.5'
    },
    teaching: {
      subjects: ['Physics', 'Chemistry', 'Mathematics'],
      classes: ['Class 11', 'Class 12', 'College'],
      yearsOfExperience: 5,
      previousExperience: 'Ex-Aakash Faculty for JEE Physics & Chemistry.',
      currentOccupation: 'Private Physics Consultant',
      teachingMode: 'Both',
      preferredLocations: ['Home Tuition', "Student's Home", 'Online'],
      availableDays: ['Tuesday', 'Thursday', 'Saturday', 'Sunday'],
      availableTimeSlots: ['Morning', 'Evening'],
      minFee: 6000,
      maxFee: 10000,
      feeType: 'Per Month'
    },
    identityDoc: {
      docType: 'PAN Card',
      docNumber: 'ABCDE1234F',
      fileUrl: '#preview-pan',
      fileName: 'pan_amit.pdf',
      uploadedAt: '2026-09-15T14:40:00Z'
    },
    confirmedCorrect: true,
    agreedToTerms: true,
    status: 'Submitted',
    adminNotes: 'Application received. Pending initial academic document review.',
    createdAt: '2026-09-15T14:40:00Z',
    updatedAt: '2026-09-15T14:40:00Z'
  },
  {
    id: 'tut-uuid-004',
    applicationId: 'TUT-2026-0004',
    fullName: 'Sunita Sharma',
    guardianName: 'Kishore Sharma',
    dob: '1994-07-19',
    gender: 'Female',
    mobile: '9899112233',
    whatsapp: '9899112233',
    email: 'sunita.bio@example.com',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    photoFileName: 'sunita_photo.jpg',
    currentAddress: {
      houseNo: '56',
      street: 'Model Town III',
      city: 'New Delhi',
      district: 'North Delhi',
      state: 'Delhi',
      pincode: '110009'
    },
    permanentAddress: {
      houseNo: '56',
      street: 'Model Town III',
      city: 'New Delhi',
      district: 'North Delhi',
      state: 'Delhi',
      pincode: '110009'
    },
    sameAsCurrent: true,
    class10: {
      board: 'CBSE',
      passingYear: '2010',
      schoolName: 'DAV Public School',
      percentage: '92.0'
    },
    class12: {
      board: 'CBSE',
      passingYear: '2012',
      schoolName: 'DAV Public School',
      percentage: '94.0',
      stream: 'Science'
    },
    higherEdu: {
      highestQualification: 'Master of Science (M.Sc.)',
      degree: 'M.Sc. Biotechnology',
      institution: 'Jawaharlal Nehru University (JNU)',
      passingYear: '2017',
      percentage: '86.4'
    },
    teaching: {
      subjects: ['Biology', 'Science', 'Chemistry'],
      classes: ['Class 9', 'Class 10', 'Class 11', 'Class 12'],
      yearsOfExperience: 7,
      previousExperience: 'NEET Biology Specialist for 6 years.',
      currentOccupation: 'Senior Biology Educator',
      teachingMode: 'Both',
      preferredLocations: ['Home Tuition', "Student's Home", 'Online'],
      availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      availableTimeSlots: ['Afternoon', 'Evening'],
      minFee: 5000,
      maxFee: 8500,
      feeType: 'Per Month'
    },
    identityDoc: {
      docType: 'Voter ID',
      docNumber: 'STU1234567',
      fileUrl: '#preview-voter',
      fileName: 'voterid_sunita.pdf',
      uploadedAt: '2026-09-18T09:20:00Z'
    },
    confirmedCorrect: true,
    agreedToTerms: true,
    status: 'Documents Required',
    adminNotes: 'Please upload a clearer Class 12 marksheet showing subject-wise break-up.',
    createdAt: '2026-09-18T09:20:00Z',
    updatedAt: '2026-09-19T10:10:00Z'
  },
  {
    id: 'tut-uuid-005',
    applicationId: 'TUT-2026-0005',
    fullName: 'Vikas Verma',
    guardianName: 'Satish Verma',
    dob: '1999-01-12',
    gender: 'Male',
    mobile: '9654321876',
    whatsapp: '9654321876',
    email: 'vikas.verma@example.com',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    photoFileName: 'vikas_photo.jpg',
    currentAddress: {
      houseNo: '78',
      street: 'Lajpat Nagar II',
      city: 'New Delhi',
      district: 'South Delhi',
      state: 'Delhi',
      pincode: '110024'
    },
    permanentAddress: {
      houseNo: '78',
      street: 'Lajpat Nagar II',
      city: 'New Delhi',
      district: 'South Delhi',
      state: 'Delhi',
      pincode: '110024'
    },
    sameAsCurrent: true,
    class10: {
      board: 'CBSE',
      passingYear: '2015',
      schoolName: 'Balvantray Mehta Vidya Bhawan',
      percentage: '72.0'
    },
    class12: {
      board: 'CBSE',
      passingYear: '2017',
      schoolName: 'Balvantray Mehta Vidya Bhawan',
      percentage: '68.5',
      stream: 'Commerce'
    },
    higherEdu: {
      highestQualification: 'Bachelor of Commerce (B.Com)',
      degree: 'B.Com Pass',
      institution: 'Ignou',
      passingYear: '2021',
      percentage: '58.0'
    },
    teaching: {
      subjects: ['Accountancy', 'Economics', 'Business Studies'],
      classes: ['Class 11', 'Class 12'],
      yearsOfExperience: 1,
      previousExperience: 'Part-time teaching to junior neighborhood students.',
      currentOccupation: 'Student',
      teachingMode: 'Offline',
      preferredLocations: ["Student's Home"],
      availableDays: ['Saturday', 'Sunday'],
      availableTimeSlots: ['Morning'],
      minFee: 2000,
      maxFee: 3500,
      feeType: 'Per Month'
    },
    identityDoc: {
      docType: 'Driving Licence',
      docNumber: 'DL-0420180012345',
      fileUrl: '#preview-dl',
      fileName: 'dl_vikas.pdf',
      uploadedAt: '2026-09-20T16:00:00Z'
    },
    confirmedCorrect: true,
    agreedToTerms: true,
    status: 'Under Review',
    adminNotes: 'Reviewing teaching credentials and experience history.',
    createdAt: '2026-09-20T16:00:00Z',
    updatedAt: '2026-09-21T08:30:00Z'
  }
];

export const INITIAL_INQUIRIES: ParentInquiry[] = [
  {
    id: 'inq-uuid-001',
    inquiryId: 'INQ-2026-0001',
    parentName: 'Mrs. Ananya Roy',
    mobile: '9810998877',
    whatsapp: '9810998877',
    email: 'ananya.roy@example.com',
    studentName: 'Aarav Roy',
    studentAge: 15,
    currentClass: 'Class 10',
    schoolBoard: 'CBSE',
    subjectsRequired: ['Mathematics', 'Physics'],
    preferredGender: 'No Preference',
    qualificationPreference: 'Graduate',
    budgetRange: '₹4,000–₹6,000/month',
    minBudget: 4000,
    maxBudget: 6000,
    teachingMode: 'Both',
    address: {
      houseNo: 'C-12',
      street: 'South Extension Part 2',
      city: 'New Delhi',
      district: 'South Delhi',
      state: 'Delhi',
      pincode: '110049'
    },
    preferredDays: ['Monday', 'Wednesday', 'Friday'],
    preferredTimeSlots: ['Evening'],
    additionalRequirements: 'Aarav needs strong focus on NCERT math concepts & sample papers for board exams.',
    status: 'New',
    createdAt: '2026-09-21T11:00:00Z',
    updatedAt: '2026-09-21T11:00:00Z'
  },
  {
    id: 'inq-uuid-002',
    inquiryId: 'INQ-2026-0002',
    parentName: 'Dr. Sunir Malhotra',
    mobile: '9818001122',
    whatsapp: '9818001122',
    email: 'sunir.malhotra@example.com',
    studentName: 'Rhea Malhotra',
    studentAge: 17,
    currentClass: 'Class 12',
    schoolBoard: 'CBSE',
    subjectsRequired: ['Biology', 'Chemistry'],
    preferredGender: 'Female',
    qualificationPreference: 'Postgraduate',
    budgetRange: '₹6,000–₹10,000/month',
    minBudget: 6000,
    maxBudget: 10000,
    teachingMode: 'Both',
    address: {
      houseNo: 'E-45',
      street: 'Greater Kailash 1',
      city: 'New Delhi',
      district: 'South Delhi',
      state: 'Delhi',
      pincode: '110048'
    },
    preferredDays: ['Tuesday', 'Thursday', 'Saturday'],
    preferredTimeSlots: ['Afternoon', 'Evening'],
    additionalRequirements: 'Targeting NEET UG preparation. Tutor should have solid medical/biotech background.',
    status: 'Matching',
    createdAt: '2026-09-22T14:30:00Z',
    updatedAt: '2026-09-22T16:00:00Z'
  },
  {
    id: 'inq-uuid-003',
    inquiryId: 'INQ-2026-0003',
    parentName: 'Vikram Mehta',
    mobile: '9971004455',
    whatsapp: '9971004455',
    email: 'vikram.mehta@example.com',
    studentName: 'Kabir Mehta',
    studentAge: 13,
    currentClass: 'Class 8',
    schoolBoard: 'ICSE',
    subjectsRequired: ['English', 'Social Science'],
    preferredGender: 'Female',
    qualificationPreference: 'Postgraduate',
    budgetRange: '₹4,000–₹6,000/month',
    minBudget: 4000,
    maxBudget: 6000,
    teachingMode: 'Online',
    address: {
      houseNo: 'Flat 402',
      street: 'Vasant Vihar Block A',
      city: 'New Delhi',
      district: 'South West Delhi',
      state: 'Delhi',
      pincode: '110057'
    },
    preferredDays: ['Monday', 'Wednesday', 'Friday'],
    preferredTimeSlots: ['Evening'],
    additionalRequirements: 'Improve ICSE grammar, creative writing, and history essay writing techniques.',
    status: 'Tutor Suggested',
    createdAt: '2026-09-22T09:15:00Z',
    updatedAt: '2026-09-23T10:00:00Z'
  }
];

export const INITIAL_MATCHES: TutorMatch[] = [
  {
    id: 'match-001',
    inquiryId: 'inq-uuid-003',
    tutorId: 'tut-uuid-002',
    matchScore: 95,
    matchReasons: [
      '100% Subject Match (English, Social Science)',
      'Class 8 grade range match',
      'Preferred Female tutor matched',
      'Online teaching mode matched',
      'Postgraduate degree (M.A. English LSR) matched'
    ],
    matchStatus: 'Suggested',
    adminNotes: 'Suggested Priya Singh for Kabir Mehta ICSE English.',
    createdAt: '2026-09-23T10:00:00Z'
  }
];

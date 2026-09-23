import type { TutorApplication, ParentInquiry } from '../types';

export interface MatchResult {
  tutor: TutorApplication;
  score: number;
  reasons: string[];
  breakdown: {
    subjectScore: number;
    classScore: number;
    genderScore: number;
    budgetScore: number;
    modeScore: number;
    locationScore: number;
  };
}

export const calculateTutorMatch = (inquiry: ParentInquiry, tutor: TutorApplication): MatchResult => {
  let totalScore = 0;
  const reasons: string[] = [];

  const tutorSubjectsLower = tutor.teaching.subjects.map(s => s.toLowerCase());
  if (tutor.teaching.customSubject) {
    tutorSubjectsLower.push(tutor.teaching.customSubject.toLowerCase());
  }
  
  const inquirySubjects = inquiry.subjectsRequired.map(s => s.toLowerCase());
  const matchedSubjects = inquirySubjects.filter(sub => 
    tutorSubjectsLower.some(ts => ts.includes(sub) || sub.includes(ts))
  );

  let subjectScore = 0;
  if (inquirySubjects.length > 0) {
    const ratio = matchedSubjects.length / inquirySubjects.length;
    subjectScore = Math.round(ratio * 30);
    if (matchedSubjects.length > 0) {
      reasons.push(`Matched ${matchedSubjects.length}/${inquirySubjects.length} subjects (${matchedSubjects.join(', ')})`);
    }
  } else {
    subjectScore = 15;
  }
  totalScore += subjectScore;

  let classScore = 0;
  const inquiryClass = inquiry.currentClass.toLowerCase();
  const tutorClassesLower = tutor.teaching.classes.map(c => c.toLowerCase());
  
  const isClassMatch = tutorClassesLower.some(tc => {
    if (tc === inquiryClass) return true;
    if (tc.includes('1–5') && (inquiryClass.includes('1') || inquiryClass.includes('2') || inquiryClass.includes('3') || inquiryClass.includes('4') || inquiryClass.includes('5'))) return true;
    if (tc.includes('6–8') && (inquiryClass.includes('6') || inquiryClass.includes('7') || inquiryClass.includes('8'))) return true;
    return tc.includes(inquiryClass) || inquiryClass.includes(tc);
  });

  if (isClassMatch) {
    classScore = 20;
    reasons.push(`Teaches grade level: ${inquiry.currentClass}`);
  } else {
    classScore = 5;
  }
  totalScore += classScore;

  let genderScore = 0;
  if (inquiry.preferredGender === 'No Preference' || inquiry.preferredGender === tutor.gender) {
    genderScore = 15;
    if (inquiry.preferredGender !== 'No Preference') {
      reasons.push(`Preferred ${tutor.gender} tutor matched`);
    }
  } else {
    genderScore = 0;
  }
  totalScore += genderScore;

  let budgetScore = 0;
  const tutorMin = tutor.teaching.minFee || 0;
  const tutorMax = tutor.teaching.maxFee || 10000;
  const inqMin = inquiry.minBudget || 0;
  const inqMax = inquiry.maxBudget || 10000;

  const overlap = Math.max(0, Math.min(tutorMax, inqMax) - Math.max(tutorMin, inqMin));
  if (overlap > 0 || (tutorMin <= inqMax && tutorMax >= inqMin)) {
    budgetScore = 15;
    reasons.push(`Fee range (₹${tutorMin}-₹${tutorMax}/mo) fits parent budget (₹${inqMin}-₹${inqMax}/mo)`);
  } else {
    const diff = Math.abs(tutorMin - inqMax);
    if (diff <= 1500) {
      budgetScore = 8;
      reasons.push(`Fee range slightly above budget (diff ~₹${diff})`);
    } else {
      budgetScore = 2;
    }
  }
  totalScore += budgetScore;

  let modeScore = 0;
  if (tutor.teaching.teachingMode === 'Both' || inquiry.teachingMode === 'Both' || tutor.teaching.teachingMode === inquiry.teachingMode) {
    modeScore = 10;
    reasons.push(`Mode match (${inquiry.teachingMode})`);
  } else {
    modeScore = 2;
  }
  totalScore += modeScore;

  let locationScore = 0;
  if (inquiry.address.city && tutor.currentAddress.city) {
    if (inquiry.address.city.toLowerCase() === tutor.currentAddress.city.toLowerCase()) {
      locationScore += 5;
      if (inquiry.address.district && tutor.currentAddress.district && 
          inquiry.address.district.toLowerCase() === tutor.currentAddress.district.toLowerCase()) {
        locationScore += 5;
        reasons.push(`Same District (${inquiry.address.district})`);
      } else {
        reasons.push(`Same City (${inquiry.address.city})`);
      }
    }
  } else {
    locationScore = 5;
  }
  totalScore += locationScore;

  return {
    tutor,
    score: Math.min(100, totalScore),
    reasons,
    breakdown: {
      subjectScore,
      classScore,
      genderScore,
      budgetScore,
      modeScore,
      locationScore
    }
  };
};

export const getRankedTutorMatches = (inquiry: ParentInquiry, tutors: TutorApplication[]): MatchResult[] => {
  const eligibleTutors = tutors.filter(t => t.status === 'Approved' || t.status === 'Submitted' || t.status === 'Under Review');
  const matches = eligibleTutors.map(tutor => calculateTutorMatch(inquiry, tutor));
  return matches.sort((a, b) => b.score - a.score);
};

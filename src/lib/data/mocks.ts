// Mock implementations. Same names and signatures as src/lib/api.ts.
import { DEMO_CREDS } from '@/lib/data/demo-creds';
import type {
  ActionItem,
  AdminSchemeInput,
  Application,
  ApplicationStatus,
  ChecklistItem,
  ChecklistProgress,
  Dashboard,
  EligibilityResult,
  EligibilityRule,
  MatchItem,
  Me,
  SavedScheme,
  Scheme,
  SchemeDeadline,
  SchemeDetail,
  SchemeDocument,
  SchemeQuery,
  StudentProfile,
  ViewedScheme,
} from '@/lib/types';

const delay = <T>(value: T): Promise<T> => new Promise((r) => setTimeout(() => r(value), 150));

export const SCHEMES: Scheme[] = [
  {
    id: 'sch-nmms-0142',
    code: 'SCH-NMMS-0142',
    name: 'National Means-cum-Merit Scholarship',
    department: 'Ministry of Education',
    category: 'Merit-based scholarship',
    level: 'Central',
    state: 'All India',
    educationLevel: 'Secondary and higher secondary',
    description:
      'Financial support for meritorious students from economically weaker families to continue higher secondary education.',
    status: 'active',
    verificationStatus: 'Verified from official source',
    lastVerified: '2025-01-12',
    officialUrl: 'https://scholarships.gov.in',
  },
  {
    id: 'sch-yas-0877',
    code: 'SCH-YAS-0877',
    name: 'PM YASASVI Scholarship for OBC Students',
    department: 'Ministry of Social Justice and Empowerment',
    category: 'Category-based scholarship',
    level: 'Central',
    state: 'All India',
    educationLevel: 'Post-matric and higher',
    description:
      'Merit-cum-means scholarships for students from Other Backward Classes studying at post-matric and higher levels.',
    status: 'active',
    verificationStatus: 'Information incomplete',
    lastVerified: '2025-02-03',
    officialUrl: 'https://yet.nta.ac.in',
  },
  {
    id: 'sch-ap-0231',
    code: 'SCH-AP-0231',
    name: 'State Merit Scholarship for Professional Courses',
    department: 'Department of Higher Education, State Government',
    category: 'Tuition support',
    level: 'State',
    state: 'Andhra Pradesh',
    educationLevel: 'Undergraduate',
    description:
      'Tuition-linked support for undergraduate engineering students domiciled in the state with qualifying marks.',
    status: 'active',
    verificationStatus: 'Deadline not confirmed',
    lastVerified: '2024-11-28',
    officialUrl: 'https://example.gov.in/state-merit',
  },
  {
    id: 'sch-pms-0455',
    code: 'SCH-PMS-0455',
    name: 'Post Matric Scholarship for Students from Scheduled Castes',
    department: 'Ministry of Social Justice and Empowerment',
    category: 'Category-based scholarship',
    level: 'Central',
    state: 'All India',
    educationLevel: 'Post-matric',
    description:
      'Scholarship support for students from Scheduled Castes pursuing post-matric education at recognised institutions.',
    status: 'uncertain',
    verificationStatus: 'Requires re-verification',
    lastVerified: '2024-08-15',
    officialUrl: 'https://scholarships.gov.in',
  },
];

const DETAILS: Record<string, Omit<SchemeDetail, keyof Scheme>> = {
  'sch-nmms-0142': {
    benefits: 'Annual scholarship amount paid through the state education department.',
    informationGaps: ['Institution eligibility not yet confirmed for the 2025 cycle.'],
    rules: [
      { id: 'r1', type: 'mandatory', label: 'Class VIII pass with qualifying marks', officialRuleRef: 'NMMS Guidelines §3.1' },
      { id: 'r2', type: 'mandatory', label: 'Family income within the notified limit', officialRuleRef: 'NMMS Guidelines §3.2' },
      { id: 'r3', type: 'exclusion', label: 'Studying in a non-recognised institution', officialRuleRef: 'NMMS Guidelines §4.1' },
    ],
    documents: [
      { id: 'd1', name: 'Income certificate', mandatory: true, appliesWhen: 'always', explanation: 'Proves family income is within the limit.' },
      { id: 'd2', name: 'Academic marksheet', mandatory: true, appliesWhen: 'always', explanation: 'Shows qualifying marks.' },
    ],
    deadlines: [{ id: 'dl1', label: 'Application window', date: null, verified: false, verifiedDate: null }],
    faqs: [{ question: 'Is the deadline confirmed?', answer: 'Not confirmed for the 2025 cycle. Check the official portal.' }],
  },
  'sch-yas-0877': {
    benefits: 'Post-matric scholarship amount as notified by the ministry.',
    informationGaps: ['Category certificate needed to confirm eligibility.'],
    rules: [
      { id: 'r1', type: 'mandatory', label: 'Belongs to an OBC category', officialRuleRef: 'PM YASASVI Scheme Notification §2' },
      { id: 'r2', type: 'mandatory', label: 'Family income within the notified limit', officialRuleRef: 'PM YASASVI Scheme Notification §2' },
    ],
    documents: [
      { id: 'd1', name: 'Category certificate', mandatory: true, appliesWhen: 'category is OBC', explanation: 'Confirms OBC status.' },
      { id: 'd2', name: 'Income certificate', mandatory: true, appliesWhen: 'always', explanation: 'Proves family income.' },
    ],
    deadlines: [{ id: 'dl1', label: 'Portal opens', date: '2025-08-01', verified: true, verifiedDate: '2025-02-03' }],
    faqs: [{ question: 'Do I need a category certificate?', answer: 'Yes, if you claim OBC status.' }],
  },
  'sch-ap-0231': {
    benefits: 'Tuition-linked support for eligible professional course students.',
    informationGaps: ['Deadline for the current academic year has not been verified.'],
    rules: [
      { id: 'r1', type: 'mandatory', label: 'Domicile of the state', officialRuleRef: 'State Scholarship Order §5' },
      { id: 'r2', type: 'mandatory', label: 'Enrolled in an undergraduate engineering course', officialRuleRef: 'State Scholarship Order §6' },
    ],
    documents: [
      { id: 'd1', name: 'Domicile certificate', mandatory: true, appliesWhen: 'always', explanation: 'Proves state residence.' },
      { id: 'd2', name: 'Admission certificate', mandatory: true, appliesWhen: 'always', explanation: 'Confirms current enrolment.' },
    ],
    deadlines: [{ id: 'dl1', label: 'Application window', date: null, verified: false, verifiedDate: null }],
    faqs: [],
  },
  'sch-pms-0455': {
    benefits: 'Post-matric maintenance and tuition support.',
    informationGaps: ['Scheme guidelines are being re-verified.'],
    rules: [{ id: 'r1', type: 'mandatory', label: 'Belongs to a Scheduled Caste category', officialRuleRef: 'PMS-SC Guidelines §2' }],
    documents: [{ id: 'd1', name: 'Caste certificate', mandatory: true, appliesWhen: 'always', explanation: 'Confirms SC status.' }],
    deadlines: [{ id: 'dl1', label: 'Application window', date: null, verified: false, verifiedDate: null }],
    faqs: [],
  },
};

const PROFILE_ANSWERS: Record<string, string> = {
  state: 'Andhra Pradesh',
  educationLevel: 'Undergraduate',
  course: 'B.Tech',
  academicYear: 'Second year',
  annualIncome: '150000',
  previousScore: '85',
};

let profile: StudentProfile = {
  answers: { ...PROFILE_ANSWERS },
  isConfirmed: false,
  profileSource: 'questionnaire',
  completion: 72,
};
let me: Me = { name: 'Asha Rao', email: DEMO_CREDS.email, preferredLanguage: 'en' };
let saved: SavedScheme[] = [
  { id: 'ss-1', schemeId: 'sch-ap-0231', schemeName: SCHEMES[2].name, applicationStatus: 'Preparing documents', lastUpdated: '2025-03-10' },
  { id: 'ss-2', schemeId: 'sch-nmms-0142', schemeName: SCHEMES[0].name, applicationStatus: 'Interested', lastUpdated: '2025-03-02' },
];
let actions: ActionItem[] = [
  { id: 'ai-1', title: 'Provide your annual family income certificate', schemeId: 'sch-ap-0231', status: 'open', dueDate: '2025-05-30' },
  { id: 'ai-2', title: 'Confirm your institution eligibility', schemeId: 'sch-nmms-0142', status: 'open', dueDate: null },
];
let checklist: ChecklistItem[] = [
  { id: 'ci-1', documentName: 'Domicile certificate', status: 'prepared', explanation: 'Proves you live in the state.' },
  { id: 'ci-2', documentName: 'Admission certificate', status: 'pending', explanation: 'Confirms your current enrolment.' },
];
const views: ViewedScheme[] = [
  { schemeId: 'sch-yas-0877', schemeName: SCHEMES[1].name, viewedAt: '2025-03-12T10:00:00Z' },
];

export async function recordSchemeView(schemeId: string): Promise<{ ok: true }> {
  views.unshift({ schemeId, schemeName: SCHEMES.find((s) => s.id === schemeId)?.name ?? schemeId, viewedAt: new Date().toISOString() });
  return delay({ ok: true as const });
}
export async function updateActionItem(actionItemId: string, status: 'done' | 'dismissed'): Promise<ActionItem> {
  actions = actions.map((a) => (a.id === actionItemId ? { ...a, status } : a));
  return delay(actions.find((a) => a.id === actionItemId) ?? actions[0]);
}
export async function adminUpdateScheme(schemeId: string, body: AdminSchemeInput): Promise<SchemeDetail> {
  const base = SCHEMES.find((s) => s.id === schemeId) ?? SCHEMES[0];
  return delay({ ...base, ...body, id: base.id, officialUrl: base.officialUrl, ...DETAILS[base.id] } as SchemeDetail);
}
export async function adminSaveRules(_schemeId: string, rules: EligibilityRule[]): Promise<EligibilityRule[]> {
  return delay(rules);
}
export async function adminSaveDeadlines(_schemeId: string, deadlines: SchemeDeadline[]): Promise<SchemeDeadline[]> {
  return delay(deadlines);
}
export async function signup(input: { name: string; email: string; password: string }): Promise<Me> {
  me = { name: input.name, email: input.email, preferredLanguage: 'en' };
  return delay(me);
}
export async function login(input: { email: string; password: string }): Promise<Me> {
  if (input.email !== DEMO_CREDS.email || input.password !== DEMO_CREDS.password)
    throw new Error('Email or password is incorrect.');
  return delay(me);
}
export async function logout(): Promise<{ ok: true }> {
  return delay({ ok: true as const });
}
export async function forgotPassword(_email: string): Promise<{ ok: true }> {
  return delay({ ok: true as const });
}
export async function resetPassword(_input: { token: string; password: string }): Promise<{ ok: true }> {
  return delay({ ok: true as const });
}
export async function getMe(): Promise<Me> {
  return delay(me);
}
export async function updateMe(input: Partial<Me> & { password?: string }): Promise<Me> {
  me = { ...me, ...input, password: undefined } as Me;
  return delay(me);
}
export async function deleteMyData(): Promise<{ ok: true }> {
  saved = [];
  profile = { answers: {}, isConfirmed: false, profileSource: null, completion: 0 };
  return delay({ ok: true as const });
}
export async function getMyProfile(): Promise<StudentProfile> {
  return delay(profile);
}
export async function saveMyProfile(input: { answers: Record<string, string>; finish?: boolean }): Promise<StudentProfile> {
  profile = {
    answers: { ...profile.answers, ...input.answers },
    isConfirmed: input.finish ?? profile.isConfirmed,
    profileSource: input.finish ? 'questionnaire' : profile.profileSource,
    completion: input.finish ? 100 : profile.completion,
  };
  return delay(profile);
}
export async function getEligibility(schemeId: string): Promise<EligibilityResult> {
  const rules = DETAILS[schemeId]?.rules ?? [];
  return delay({
    schemeId,
    status: schemeId === 'sch-yas-0877' ? 'Needs More Information' : 'Likely eligible',
    satisfied: rules.slice(0, 1).map((r) => r.label),
    unmet: [],
    missing: rules.slice(1).map((r) => r.label),
    officialRuleRef: rules[0]?.officialRuleRef ?? 'Official scheme notification',
    nextStep: 'Confirm the remaining conditions on the official portal before applying.',
  });
}
export async function getMyMatches(): Promise<MatchItem[]> {
  return delay(
    SCHEMES.map((scheme, i) => ({
      scheme,
      status: i === 1 ? 'Needs More Information' : 'Likely eligible',
      keyRequirements: (DETAILS[scheme.id]?.rules ?? []).map((r) => r.label),
    })),
  );
}
export async function getSchemes(query: SchemeQuery = {}): Promise<Scheme[]> {
  const q = query.q?.toLowerCase().trim();
  return delay(
    SCHEMES.filter(
      (s) =>
        (!q || s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q)) &&
        (!query.level || s.level === query.level) &&
        (!query.category || s.category === query.category) &&
        (!query.status || s.status === query.status),
    ),
  );
}
export async function getScheme(schemeId: string): Promise<SchemeDetail> {
  const base = SCHEMES.find((s) => s.id === schemeId) ?? SCHEMES[0];
  return delay({ ...base, ...DETAILS[base.id] });
}
export async function getSavedSchemes(): Promise<SavedScheme[]> {
  return delay(saved);
}
export async function saveScheme(schemeId: string): Promise<SavedScheme> {
  const item: SavedScheme = {
    id: `ss-${saved.length + 1}`,
    schemeId,
    schemeName: SCHEMES.find((s) => s.id === schemeId)?.name ?? schemeId,
    applicationStatus: 'Interested',
    lastUpdated: new Date().toISOString().slice(0, 10),
  };
  saved = [...saved, item];
  return delay(item);
}
export async function removeSavedScheme(savedSchemeId: string): Promise<{ ok: true }> {
  saved = saved.filter((s) => s.id !== savedSchemeId);
  return delay({ ok: true as const });
}
export async function getSchemeChecklist(_schemeId: string): Promise<ChecklistItem[]> {
  return delay(checklist);
}
export async function updateChecklistItem(itemId: string, status: 'prepared' | 'pending'): Promise<ChecklistItem> {
  checklist = checklist.map((c) => (c.id === itemId ? { ...c, status } : c));
  return delay(checklist.find((c) => c.id === itemId) ?? checklist[0]);
}
export async function getMyChecklists(): Promise<ChecklistProgress[]> {
  return delay(
    saved.map((s) => ({
      schemeId: s.schemeId,
      schemeName: s.schemeName,
      prepared: checklist.filter((c) => c.status === 'prepared').length,
      total: checklist.length,
    })),
  );
}
export async function getMyApplications(): Promise<SavedScheme[]> {
  return delay(saved);
}
export async function getApplication(savedSchemeId: string): Promise<Application> {
  const s = saved.find((x) => x.id === savedSchemeId) ?? saved[0];
  return delay({
    savedSchemeId: s.id,
    schemeName: s.schemeName,
    applicationStatus: s.applicationStatus,
    referenceNumber: '',
    notes: '',
    lastUpdated: s.lastUpdated,
    updates: [{ id: 'u1', status: s.applicationStatus, at: s.lastUpdated }],
  });
}
export async function updateApplication(
  savedSchemeId: string,
  input: { applicationStatus?: ApplicationStatus; referenceNumber?: string; notes?: string },
): Promise<Application> {
  saved = saved.map((s) =>
    s.id === savedSchemeId ? { ...s, applicationStatus: input.applicationStatus ?? s.applicationStatus } : s,
  );
  return getApplication(savedSchemeId).then((a) => ({ ...a, referenceNumber: input.referenceNumber ?? '', notes: input.notes ?? '' }));
}
export async function getActionItems(): Promise<ActionItem[]> {
  return delay(actions.filter((a) => a.status === 'open'));
}
export async function getDashboard(): Promise<Dashboard> {
  return delay({
    welcomeName: me.name.split(' ')[0],
    profileCompletion: profile.completion,
    likelyCount: 3,
    needsInfoCount: 1,
    savedSchemes: saved,
    pendingChecklistItems: checklist.filter((c) => c.status === 'pending').length,
    upcomingDeadlines: [{ schemeName: SCHEMES[1].name, label: 'Portal opens', date: '2025-08-01' }],
    applicationProgress: 35,
    nextActions: actions.filter((a) => a.status === 'open'),
  });
}
export async function getRecentlyViewed(): Promise<ViewedScheme[]> {
  return delay(views);
}
export async function adminListSchemes(): Promise<Scheme[]> {
  return delay(SCHEMES);
}
export async function adminGetScheme(schemeId: string): Promise<SchemeDetail> {
  return getScheme(schemeId);
}
export async function adminSaveDocuments(_schemeId: string, documents: SchemeDocument[]): Promise<SchemeDocument[]> {
  return delay(documents);
}
export async function adminCreateScheme(input: AdminSchemeInput): Promise<Scheme> {
  return delay({ ...input, id: `sch-${input.code.toLowerCase()}`, officialUrl: '', } as Scheme);
}

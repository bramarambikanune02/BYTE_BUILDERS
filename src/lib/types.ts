// Shared domain types for the AVASAR AI student and admin UI.

export const APPLICATION_STATUSES = [
  'Interested',
  'Eligibility reviewed',
  'Preparing documents',
  'Ready to apply',
  'Application submitted',
  'Awaiting result',
  'Approved',
  'Rejected',
] as const;
export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export type EligibilityStatus = 'Likely eligible' | 'Needs More Information' | 'Does Not Match';

export type VerificationStatus =
  | 'Verified from official source'
  | 'Requires re-verification'
  | 'Deadline not confirmed'
  | 'Application currently closed'
  | 'Information incomplete';

export type SchemeLevel = 'Central' | 'State';
export type SchemeStatus = 'active' | 'closed' | 'uncertain' | 'outdated';

export interface Scheme {
  id: string;
  code: string;
  name: string;
  department: string;
  category: string;
  level: SchemeLevel;
  state: string;
  educationLevel: string;
  description: string;
  status: SchemeStatus;
  verificationStatus: VerificationStatus;
  lastVerified: string | null;
  officialUrl: string;
}

export interface EligibilityRule {
  id: string;
  type: 'mandatory' | 'exclusion';
  label: string;
  officialRuleRef: string;
}

export interface SchemeDocument {
  id: string;
  name: string;
  mandatory: boolean;
  appliesWhen: string;
  explanation: string;
}

export interface SchemeDeadline {
  id: string;
  label: string;
  date: string | null;
  verified: boolean;
  verifiedDate: string | null;
}

export interface SchemeFaq {
  question: string;
  answer: string;
}

export interface SchemeDetail extends Scheme {
  benefits: string;
  informationGaps: string[];
  rules: EligibilityRule[];
  documents: SchemeDocument[];
  deadlines: SchemeDeadline[];
  faqs: SchemeFaq[];
}

export interface EligibilityResult {
  schemeId: string;
  status: EligibilityStatus;
  satisfied: string[];
  unmet: string[];
  missing: string[];
  officialRuleRef: string;
  nextStep: string;
}

export interface MatchItem {
  scheme: Scheme;
  status: EligibilityStatus;
  keyRequirements: string[];
}

export interface StudentProfile {
  answers: Record<string, string>;
  isConfirmed: boolean;
  profileSource: string | null;
  completion: number;
}

export interface Me {
  name: string;
  email: string;
  preferredLanguage: string;
}

export interface SavedScheme {
  id: string;
  schemeId: string;
  schemeName: string;
  applicationStatus: ApplicationStatus;
  lastUpdated: string;
}

export interface ChecklistItem {
  id: string;
  documentName: string;
  status: 'prepared' | 'pending';
  explanation: string;
}

export interface ChecklistProgress {
  schemeId: string;
  schemeName: string;
  prepared: number;
  total: number;
}

export interface ActionItem {
  id: string;
  title: string;
  schemeId: string | null;
  status: 'open' | 'done' | 'dismissed';
  dueDate: string | null;
}

export interface ApplicationUpdate {
  id: string;
  status: ApplicationStatus;
  at: string;
}

export interface Application {
  savedSchemeId: string;
  schemeName: string;
  applicationStatus: ApplicationStatus;
  referenceNumber: string;
  notes: string;
  lastUpdated: string;
  updates: ApplicationUpdate[];
}

export interface UpcomingDeadline {
  schemeName: string;
  label: string;
  date: string;
}

export interface Dashboard {
  welcomeName: string;
  profileCompletion: number;
  likelyCount: number;
  needsInfoCount: number;
  savedSchemes: SavedScheme[];
  pendingChecklistItems: number;
  upcomingDeadlines: UpcomingDeadline[];
  applicationProgress: number;
  nextActions: ActionItem[];
}

export interface ViewedScheme {
  schemeId: string;
  schemeName: string;
  viewedAt: string;
}

export interface SchemeQuery {
  q?: string;
  level?: SchemeLevel;
  category?: string;
  status?: SchemeStatus;
}

export interface AdminSchemeInput {
  code: string;
  name: string;
  department: string;
  category: string;
  level: SchemeLevel;
  state: string;
  educationLevel: string;
  description: string;
  status: SchemeStatus;
  verificationStatus: VerificationStatus;
  lastVerified: string | null;
  informationGaps: string[];
  faqs: SchemeFaq[];
}

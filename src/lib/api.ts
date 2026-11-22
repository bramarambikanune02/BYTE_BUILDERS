// Real API client. Pages are Client Components, so every call uses a
// relative same-origin path. No absolute host is ever written here.
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
  Me,
  MatchItem,
  SavedScheme,
  Scheme,
  SchemeDeadline,
  SchemeDetail,
  SchemeDocument,
  SchemeQuery,
  StudentProfile,
  ViewedScheme,
} from '@/lib/types';

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

async function request<T>(method: Method, path: string, body?: unknown): Promise<T> {
  const res = await fetch(path, {
    method,
    credentials: 'same-origin',
    headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(data.error ?? `Request failed (${res.status})`);
  }
  return (await res.json()) as T;
}

const enc = encodeURIComponent;

export function recordSchemeView(schemeId: string): Promise<{ ok: true }> {
  return request('POST', `/api/schemes/${enc(schemeId)}/views`);
}
export function updateActionItem(
  actionItemId: string,
  status: 'done' | 'dismissed',
): Promise<ActionItem> {
  return request('PATCH', `/api/action-items/${enc(actionItemId)}`, { status });
}
export function adminUpdateScheme(schemeId: string, body: AdminSchemeInput): Promise<SchemeDetail> {
  return request('PUT', `/api/admin/schemes/${enc(schemeId)}`, body);
}
export function adminSaveRules(schemeId: string, rules: EligibilityRule[]): Promise<EligibilityRule[]> {
  return request('PUT', `/api/admin/schemes/${enc(schemeId)}/rules`, { rules });
}
export function adminSaveDeadlines(
  schemeId: string,
  deadlines: SchemeDeadline[],
): Promise<SchemeDeadline[]> {
  return request('PUT', `/api/admin/schemes/${enc(schemeId)}/deadlines`, { deadlines });
}
export function signup(input: { name: string; email: string; password: string }): Promise<Me> {
  return request('POST', '/api/auth/signup', input);
}
export function login(input: { email: string; password: string }): Promise<Me> {
  return request('POST', '/api/auth/login', input);
}
export function logout(): Promise<{ ok: true }> {
  return request('POST', '/api/auth/logout');
}
export function forgotPassword(email: string): Promise<{ ok: true }> {
  return request('POST', '/api/auth/forgot-password', { email });
}
export function resetPassword(input: { token: string; password: string }): Promise<{ ok: true }> {
  return request('POST', '/api/auth/reset-password', input);
}
export function getMe(): Promise<Me> {
  return request('GET', '/api/me');
}
export function updateMe(input: Partial<Me> & { password?: string }): Promise<Me> {
  return request('PATCH', '/api/me', input);
}
export function deleteMyData(): Promise<{ ok: true }> {
  return request('DELETE', '/api/me/data');
}
export function getMyProfile(): Promise<StudentProfile> {
  return request('GET', '/api/me/profile');
}
export function saveMyProfile(input: {
  answers: Record<string, string>;
  finish?: boolean;
}): Promise<StudentProfile> {
  return request('PUT', '/api/me/profile', input);
}
export function getEligibility(schemeId: string): Promise<EligibilityResult> {
  return request('GET', `/api/schemes/${enc(schemeId)}/eligibility`);
}
export function getMyMatches(): Promise<MatchItem[]> {
  return request('GET', '/api/me/matches');
}
export function getSchemes(query: SchemeQuery = {}): Promise<Scheme[]> {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([k, v]) => {
    if (v) params.set(k, String(v));
  });
  const qs = params.toString();
  return request('GET', qs ? `/api/schemes?${qs}` : '/api/schemes');
}
export function getScheme(schemeId: string): Promise<SchemeDetail> {
  return request('GET', `/api/schemes/${enc(schemeId)}`);
}
export function getSavedSchemes(): Promise<SavedScheme[]> {
  return request('GET', '/api/me/saved-schemes');
}
export function saveScheme(schemeId: string): Promise<SavedScheme> {
  return request('POST', '/api/saved-schemes', { schemeId });
}
export function removeSavedScheme(savedSchemeId: string): Promise<{ ok: true }> {
  return request('DELETE', `/api/saved-schemes/${enc(savedSchemeId)}`);
}
export function getSchemeChecklist(schemeId: string): Promise<ChecklistItem[]> {
  return request('GET', `/api/schemes/${enc(schemeId)}/checklist`);
}
export function updateChecklistItem(
  itemId: string,
  status: 'prepared' | 'pending',
): Promise<ChecklistItem> {
  return request('PATCH', `/api/document-checklist-items/${enc(itemId)}`, { status });
}
export function getMyChecklists(): Promise<ChecklistProgress[]> {
  return request('GET', '/api/me/checklists');
}
export function getMyApplications(): Promise<SavedScheme[]> {
  return request('GET', '/api/me/applications');
}
export function getApplication(savedSchemeId: string): Promise<Application> {
  return request('GET', `/api/applications/${enc(savedSchemeId)}`);
}
export function updateApplication(
  savedSchemeId: string,
  input: { applicationStatus?: ApplicationStatus; referenceNumber?: string; notes?: string },
): Promise<Application> {
  return request('PATCH', `/api/applications/${enc(savedSchemeId)}`, input);
}
export function getActionItems(): Promise<ActionItem[]> {
  return request('GET', '/api/me/action-items');
}
export function getDashboard(): Promise<Dashboard> {
  return request('GET', '/api/me/dashboard');
}
export function getRecentlyViewed(): Promise<ViewedScheme[]> {
  return request('GET', '/api/me/recently-viewed');
}
export function adminListSchemes(): Promise<Scheme[]> {
  return request('GET', '/api/admin/schemes');
}
export function adminGetScheme(schemeId: string): Promise<SchemeDetail> {
  return request('GET', `/api/admin/schemes/${enc(schemeId)}`);
}
export function adminSaveDocuments(schemeId: string, documents: SchemeDocument[]): Promise<SchemeDocument[]> {
  return request('PUT', `/api/admin/schemes/${enc(schemeId)}/documents`, { documents });
}
export function adminCreateScheme(input: AdminSchemeInput): Promise<Scheme> {
  return request('POST', '/api/admin/schemes', input);
}

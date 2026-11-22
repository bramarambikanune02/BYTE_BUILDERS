// The single import point for components.
// Set NEXT_PUBLIC_MOCK_MODE=true (or MOCK_MODE=true) to use mocks.ts instead
// of the real api.ts. /strip-mocks removes this branch plus mocks.ts and
// demo-creds.ts after the user accepts the preview.
import * as real from '@/lib/api';
import * as mock from './mocks';

const USE_MOCKS =
  process.env.NEXT_PUBLIC_MOCK_MODE === 'true' || process.env.MOCK_MODE === 'true';

const impl = USE_MOCKS ? mock : real;

export const {
  recordSchemeView,
  updateActionItem,
  adminUpdateScheme,
  adminSaveRules,
  adminSaveDeadlines,
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getMe,
  updateMe,
  deleteMyData,
  getMyProfile,
  saveMyProfile,
  getEligibility,
  getMyMatches,
  getSchemes,
  getScheme,
  getSavedSchemes,
  saveScheme,
  removeSavedScheme,
  getSchemeChecklist,
  updateChecklistItem,
  getMyChecklists,
  getMyApplications,
  getApplication,
  updateApplication,
  getActionItems,
  getDashboard,
  getRecentlyViewed,
  adminListSchemes,
  adminGetScheme,
  adminSaveDocuments,
  adminCreateScheme,
} = impl;

export const COOKIE_CONSENT_KEY = "ftk-cookie-consent";
export const COOKIE_CONSENT_VERSION = 1;
export const OPEN_COOKIE_PREFERENCES_EVENT = "ftk:open-cookie-preferences";

export type CookiePreferences = {
  essential: true;
  analytics: boolean;
  advertising: boolean;
};

export type CookieConsentStatus = "accepted" | "rejected" | "custom";

export type StoredCookieConsent = {
  version: number;
  status: CookieConsentStatus;
  preferences: CookiePreferences;
  savedAt: string;
};

export const defaultCookiePreferences: CookiePreferences = {
  essential: true,
  analytics: false,
  advertising: false,
};

export function readCookieConsent(): StoredCookieConsent | null {
  try {
    const rawConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!rawConsent) return null;
    const parsed = JSON.parse(rawConsent) as Partial<StoredCookieConsent> & { consent?: string };

    if (parsed.version === COOKIE_CONSENT_VERSION && parsed.preferences) {
      return parsed as StoredCookieConsent;
    }

    if (parsed.consent === "accepted" || parsed.consent === "rejected") {
      const enabled = parsed.consent === "accepted";
      return {
        version: COOKIE_CONSENT_VERSION,
        status: enabled ? "accepted" : "rejected",
        preferences: { essential: true, analytics: enabled, advertising: enabled },
        savedAt: typeof parsed.savedAt === "string" ? parsed.savedAt : new Date().toISOString(),
      };
    }
  } catch {
    localStorage.removeItem(COOKIE_CONSENT_KEY);
  }
  return null;
}

export function writeCookieConsent(status: CookieConsentStatus, preferences: CookiePreferences) {
  const consent: StoredCookieConsent = {
    version: COOKIE_CONSENT_VERSION,
    status,
    preferences: { ...preferences, essential: true },
    savedAt: new Date().toISOString(),
  };
  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
}

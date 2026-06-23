"use client";

import { OPEN_COOKIE_PREFERENCES_EVENT } from "@/lib/cookies";

export function CookiePreferencesButton() {
  return <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_PREFERENCES_EVENT))} className="rounded-sm text-left text-xs text-white/65 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">Cookie preferences</button>;
}

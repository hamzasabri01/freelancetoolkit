"use client";

import Link from "next/link";
import { Cookie, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  defaultCookiePreferences,
  OPEN_COOKIE_PREFERENCES_EVENT,
  readCookieConsent,
  writeCookieConsent,
  type CookieConsentStatus,
  type CookiePreferences,
} from "@/lib/cookies";

const categoryDescriptions = {
  essential: "Required for security and remembering your privacy choices.",
  analytics: "Helps us understand anonymous site usage when analytics is added.",
  advertising: "Allows advertising personalization when an ad provider is added.",
} as const;

export function CookieConsent() {
  const [bannerVisible, setBannerVisible] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultCookiePreferences);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      const storedConsent = readCookieConsent();
      if (storedConsent) setPreferences(storedConsent.preferences);
      else setBannerVisible(true);
    });

    const openPreferences = () => {
      const currentConsent = readCookieConsent();
      setPreferences(currentConsent?.preferences ?? defaultCookiePreferences);
      setPanelOpen(true);
    };
    window.addEventListener(OPEN_COOKIE_PREFERENCES_EVENT, openPreferences);
    return () => {
      active = false;
      window.removeEventListener(OPEN_COOKIE_PREFERENCES_EVENT, openPreferences);
    };
  }, []);

  useEffect(() => {
    if (!panelOpen) return;
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const handleKeyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPanelOpen(false);
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled])'));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyboard);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyboard);
      previousFocusRef.current?.focus();
    };
  }, [panelOpen]);

  const save = (status: CookieConsentStatus, nextPreferences: CookiePreferences) => {
    writeCookieConsent(status, nextPreferences);
    setPreferences(nextPreferences);
    setBannerVisible(false);
    setPanelOpen(false);
  };

  const acceptAll = () => save("accepted", { essential: true, analytics: true, advertising: true });
  const rejectOptional = () => save("rejected", defaultCookiePreferences);

  return <>
    {bannerVisible && <section className="fixed inset-x-3 bottom-3 z-[70] mx-auto max-h-[calc(100dvh-1.5rem)] max-w-3xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-4 pr-10 shadow-[0_18px_60px_rgba(15,23,42,.18)] sm:bottom-6 sm:flex sm:items-center sm:gap-4 sm:p-5" aria-label="Cookie consent">
      <div className="flex flex-1 gap-3"><span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand"><Cookie size={18} aria-hidden="true" /></span><div><h2 className="text-sm font-bold text-ink">Your privacy, your choice</h2><p className="mt-1 text-xs leading-5 text-ink-muted">We use essential storage to remember your choice. Optional analytics and advertising remain off unless you allow them. Read our <Link href="/privacy-policy" className="rounded-sm font-semibold text-brand underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">privacy policy</Link>.</p><button type="button" className="mt-1 rounded text-xs font-semibold text-ink-muted underline underline-offset-2 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand" onClick={() => setPanelOpen(true)}>Manage preferences</button></div></div>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-0 sm:flex sm:shrink-0"><button type="button" onClick={rejectOptional} className="min-h-11 rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold text-ink-soft transition hover:border-slate-400 hover:bg-surface-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">Reject</button><button type="button" onClick={acceptAll} className="min-h-11 rounded-lg bg-brand px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">Accept</button></div>
      <button type="button" onClick={() => setBannerVisible(false)} className="absolute right-2 top-2 rounded p-1 text-slate-400 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:hidden" aria-label="Close cookie notice"><X size={16} aria-hidden="true" /></button>
    </section>}

    {panelOpen && <div className="fixed inset-0 z-[80] grid place-items-center overflow-y-auto bg-ink/55 p-3 backdrop-blur-sm sm:p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) setPanelOpen(false); }}>
      <section ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="cookie-preferences-title" aria-describedby="cookie-preferences-description" className="relative max-h-[calc(100dvh-1.5rem)] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_24px_80px_rgba(15,23,42,.28)] sm:p-7">
        <button ref={closeButtonRef} type="button" onClick={() => setPanelOpen(false)} className="absolute right-4 top-4 grid size-9 place-items-center rounded-lg text-ink-muted transition hover:bg-surface-soft hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand" aria-label="Close cookie preferences"><X size={18} aria-hidden="true" /></button>
        <div className="pr-10"><p className="section-kicker">Privacy controls</p><h2 id="cookie-preferences-title" className="font-display text-xl font-bold text-ink">Cookie preferences</h2><p id="cookie-preferences-description" className="mt-2 text-sm leading-6 text-ink-muted">Choose which optional categories you allow. No analytics or advertising scripts are currently installed.</p></div>
        <div className="mt-6 space-y-3">
          <PreferenceRow id="essential-cookies" title="Essential" description={categoryDescriptions.essential} checked disabled onChange={() => undefined} />
          <PreferenceRow id="analytics-cookies" title="Analytics" description={categoryDescriptions.analytics} checked={preferences.analytics} onChange={(checked) => setPreferences((current) => ({ ...current, analytics: checked }))} />
          <PreferenceRow id="advertising-cookies" title="Advertising" description={categoryDescriptions.advertising} checked={preferences.advertising} onChange={(checked) => setPreferences((current) => ({ ...current, advertising: checked }))} />
        </div>
        <div className="mt-7 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"><button type="button" onClick={rejectOptional} className="min-h-11 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-ink-soft transition hover:border-slate-400 hover:bg-surface-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">Reject optional</button><button type="button" onClick={() => save("custom", preferences)} className="min-h-11 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">Save preferences</button></div>
      </section>
    </div>}
  </>;
}

function PreferenceRow({ id, title, description, checked, disabled = false, onChange }: { id: string; title: string; description: string; checked: boolean; disabled?: boolean; onChange: (checked: boolean) => void }) {
  return <div className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 p-4"><div><label htmlFor={id} className="text-sm font-bold text-ink">{title}</label><p className="mt-1 text-xs leading-5 text-ink-muted">{description}</p></div><input id={id} type="checkbox" checked={checked} disabled={disabled} onChange={(event) => onChange(event.target.checked)} className="mt-1 size-5 shrink-0 rounded border-slate-300 text-brand focus:ring-brand disabled:cursor-not-allowed disabled:opacity-60" /></div>;
}

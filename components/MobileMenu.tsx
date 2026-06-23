"use client";

import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { primaryNavigation } from "@/data/navigation";

function isCurrentRoute(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function MobileMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) firstLinkRef.current?.focus();

    const handleKeyboard = (event: KeyboardEvent) => {
      if (!open) return;
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
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
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyboard);
    };
  }, [open]);

  return <div className="md:hidden">
    <button ref={triggerRef} type="button" onClick={() => setOpen((value) => !value)} className="grid size-10 place-items-center rounded-lg border border-slate-200 bg-white text-ink-soft shadow-sm transition duration-200 hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close navigation" : "Open navigation"}>
      {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
    </button>
    {open && <div className="fixed inset-0 top-16 z-40 bg-ink/25 backdrop-blur-[2px]" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
      <div ref={panelRef} id="mobile-navigation" role="dialog" aria-modal="true" aria-label="Mobile navigation menu" className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-slate-200 bg-white px-4 py-5 shadow-lift sm:px-6">
        <nav className="mx-auto flex max-w-7xl flex-col gap-1" aria-label="Mobile navigation">
          {primaryNavigation.map((link, index) => {
            const active = isCurrentRoute(pathname, link.href);
            return <Link ref={index === 0 ? firstLinkRef : undefined} key={link.href} href={link.href} aria-current={active ? "page" : undefined} onClick={() => setOpen(false)} className={`rounded-lg px-4 py-3 text-base font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${active ? "bg-brand-soft text-brand" : "text-ink-soft hover:bg-surface-soft hover:text-ink"}`}>{link.label}</Link>;
          })}
          <Link href="/tools/freelance-hourly-rate-calculator" onClick={() => setOpen(false)} className="mt-3 inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-4 py-3 text-center font-semibold text-white shadow-sm transition hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">Try a calculator <ArrowRight size={16} aria-hidden="true" /></Link>
        </nav>
      </div>
    </div>}
  </div>;
}

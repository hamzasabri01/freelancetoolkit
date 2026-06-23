type Position = "top" | "sidebar" | "in-content" | "bottom" | "mobile";
const visibility: Record<Position, string> = {
  top: "block",
  sidebar: "hidden lg:block",
  "in-content": "block lg:hidden",
  bottom: "hidden lg:block",
  mobile: "block lg:hidden",
};

export function AdSlot({ position }: { position: Position }) { return <aside className={`${visibility[position]} overflow-hidden rounded-lg border border-dashed border-slate-300/80 bg-surface-soft/70 px-4 text-center text-[10px] font-medium uppercase tracking-[.14em] text-slate-400 ${position === "sidebar" ? "py-14" : "py-4 sm:py-5"}`} aria-label={`${position} advertisement area`} data-ad-position={position}>Advertisement</aside>; }

import Link from "next/link";
import { ChevronRight } from "lucide-react";
export type Crumb = { label: string; href?: string };
export function Breadcrumbs({ items }: { items: Crumb[] }) { return <nav aria-label="Breadcrumb"><ol className="flex flex-wrap items-center gap-1.5 text-xs text-ink-muted">{items.map((item, index) => <li key={item.label} className="flex items-center gap-1.5">{index > 0 && <ChevronRight size={12} aria-hidden="true" />}{item.href ? <Link href={item.href} className="rounded hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">{item.label}</Link> : <span aria-current="page" className="font-medium text-ink-soft">{item.label}</span>}</li>)}</ol></nav>; }

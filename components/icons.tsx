import { CalendarClock, Cloud, FileText, Home, Landmark, ReceiptText, Scale, TrendingUp, WalletCards, BriefcaseBusiness } from "lucide-react";
import type { Tool } from "@/data/tools";

const icons = { trend: TrendingUp, wallet: WalletCards, compare: Scale, clock: CalendarClock, briefcase: BriefcaseBusiness, invoice: FileText, home: Home, cloud: Cloud, calendar: Landmark, receipt: ReceiptText };
export function ToolIcon({ name, size = 22 }: { name: Tool["icon"]; size?: number }) { const Icon = icons[name]; return <Icon size={size} strokeWidth={1.9} aria-hidden="true" />; }

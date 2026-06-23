import Image from "next/image";
import type { Tool } from "@/data/tools";
import { getToolIllustration } from "@/lib/visuals";

export function ToolVisual({ tool }: { tool: Tool }) {
  const illustration = getToolIllustration(tool.slug);

  return (
    <div className="relative hidden overflow-hidden rounded-2xl border border-blue-100 bg-[radial-gradient(circle_at_top_right,#dbeafe,transparent_55%),linear-gradient(135deg,#f8fafc,#eff6ff)] p-5 md:block">
      <div className="absolute right-5 top-5 h-16 w-16 rounded-full bg-blue-200/30 blur-xl" aria-hidden="true" />
      <Image src={illustration.src} alt={illustration.alt} width={420} height={280} className="relative mx-auto h-auto w-full max-w-xs" />
    </div>
  );
}

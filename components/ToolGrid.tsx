import { tools, type Tool } from "@/data/tools";
import { ToolCard } from "@/components/ToolCard";

export function ToolGrid({ items = tools }: { items?: Tool[] }) { return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">{items.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}</div>; }

import { Bot, FileText, Mic, ShieldCheck, TrendingUp, Boxes, Newspaper } from "lucide-react";

const iconByTag: Record<string, typeof Bot> = {
  "AI Agents": Bot,
  "OCR & Documents": FileText,
  "Voice AI": Mic,
  Security: ShieldCheck,
  "Case Studies": TrendingUp,
  Product: Boxes,
};

/* Brand-family gradients used as a fallback cover when a post has no image. */
const GRADIENTS: { from: string; to: string }[] = [
  { from: "hsl(224 84% 30%)", to: "hsl(196 92% 32%)" },
  { from: "hsl(214 92% 30%)", to: "hsl(224 84% 22%)" },
  { from: "hsl(199 90% 32%)", to: "hsl(214 92% 26%)" },
  { from: "hsl(210 90% 30%)", to: "hsl(196 92% 28%)" },
  { from: "hsl(224 84% 26%)", to: "hsl(200 90% 28%)" },
];

/** Deterministically map a tag string to a brand gradient (stable across renders/SSR). */
export function gradientForTag(tag?: string): { from: string; to: string } {
  if (!tag) return GRADIENTS[0];
  let sum = 0;
  for (let i = 0; i < tag.length; i++) sum += tag.charCodeAt(i);
  return GRADIENTS[sum % GRADIENTS.length];
}

/** Gradient cover with a category icon watermark — no stock photography. */
export function PostCover({
  tag,
  from,
  to,
  className = "",
  large = false,
}: {
  tag: string;
  from: string;
  to: string;
  className?: string;
  large?: boolean;
}) {
  const Icon = iconByTag[tag] ?? Newspaper;
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
    >
      {/* grid + glow overlays */}
      <div className="absolute inset-0 bg-grid opacity-[0.18]" />
      <div className="absolute -right-8 -top-10 h-40 w-40 rounded-full bg-white/15 blur-3xl" />
      {/* watermark icon */}
      <Icon
        className={`absolute -bottom-6 -right-4 text-white/15 ${large ? "h-52 w-52" : "h-32 w-32"}`}
        strokeWidth={1.25}
      />
      {/* tag chip */}
      <div className="absolute left-4 top-4">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-black/20 px-3 py-1 font-mono text-[0.62rem] font-medium uppercase tracking-wider text-white backdrop-blur">
          <Icon size={12} />
          {tag}
        </span>
      </div>
    </div>
  );
}

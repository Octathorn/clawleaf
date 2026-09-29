import { useRef, type ReactNode, type MouseEvent } from "react";

/**
 * Card with a cursor-following spotlight glow + gradient hairline on hover.
 * Pure CSS variables updated on pointer move — no re-renders.
 */
export function SpotlightCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={`group relative overflow-hidden rounded-3xl border border-white/[0.07] bg-[hsl(var(--card))] transition-all duration-500 hover:border-white/15 hover:-translate-y-1 hover:shadow-glow ${className}`}
    >
      {/* spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(340px circle at var(--mx, 50%) var(--my, 0%), hsl(var(--primary) / 0.14), transparent 62%)",
        }}
        aria-hidden
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

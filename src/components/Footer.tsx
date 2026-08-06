import { Link } from "react-router-dom";
import { Linkedin, Twitter, MessageCircle, ArrowUpRight, MapPin } from "lucide-react";
import logoImage from "../assets/logo-mark.svg";
import { OFFICE_ADDRESS, getWhatsAppChatUrl } from "@/config/contact";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Platform Overview", href: "/product" },
      { label: "Features", href: "/product" },
      { label: "Pricing", href: "/pricing" },
      { label: "Security", href: "/security" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Use Cases", href: "/use-cases" },
      { label: "AI Agents & Custom Tools", href: "/request-tool" },
      { label: "Integrations", href: "/product" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/about" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "HIPAA Compliance", href: "/security" },
    ],
  },
];

const socials = [
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/" },
  { icon: Twitter, label: "X / Twitter", href: "https://twitter.com/clawleaf" },
  { icon: MessageCircle, label: "WhatsApp", href: getWhatsAppChatUrl() },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-surface">
      {/* top hairline glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />

      <div className="container-wide relative section-padding !py-16 md:!py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_2.5fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <Link to="/" className="flex items-center gap-2.5">
              <img src={logoImage} alt="Clawleaf" className="h-9 w-9 object-contain" width={36} height={36} />
              <span className="text-[1.35rem] font-semibold lowercase tracking-tight text-foreground">
                clawleaf
              </span>
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Healthcare AI agents & agentic automation for modern hospitals, clinics, and care teams — secure by design.
            </p>
            <div className="mt-6 flex items-start gap-2.5 text-sm text-muted-foreground">
              <MapPin size={16} className="mt-0.5 shrink-0 text-primary" />
              <span className="max-w-xs leading-relaxed">{OFFICE_ADDRESS}</span>
            </div>
            <div className="mt-6 flex items-center gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-muted-foreground transition-all duration-300 hover:border-primary/40 hover:text-foreground hover:shadow-glow"
                >
                  <s.icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.2em] text-foreground/50">
                  {col.title}
                </h4>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                        <ArrowUpRight
                          size={13}
                          className="opacity-0 -translate-x-1 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">© 2026 Clawleaf AI. All rights reserved.</p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="flex h-2 w-2 items-center justify-center">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_hsl(150_80%_50%)]" />
            </span>
            Built for healthcare. Secured by design.
          </div>
        </div>
      </div>
    </footer>
  );
}

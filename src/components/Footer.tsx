import { Link } from "react-router-dom";
import logoImage from "../assets/nav_logo.svg";
import { OFFICE_ADDRESS } from "@/config/contact";
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
      { label: "Custom AI Tools", href: "/request-tool" },
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

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container-narrow section-padding pb-12">
        <div className="grid md:grid-cols-5 gap-10">
          <div className="md:col-span-1">
            <Link to="/" className="text-xl font-bold tracking-tight text-foreground">
              {/* clawleaf<span className="text-gradient">.ai</span> */}
                 <img src={logoImage} alt="Clawleaf Logo"  />
            </Link>
            <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
              Enterprise AI automation for modern healthcare organizations.
            </p>
            <p className="text-xs text-muted-foreground mt-4 leading-relaxed max-w-xs text-pretty">
              {OFFICE_ADDRESS}
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-foreground mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground animate-settle">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">© 2026 Clawleaf AI. All rights reserved.</p>
          <p className="text-xs text-muted-foreground">Built for healthcare. Secured by design.</p>
        </div>
      </div>
    </footer>
  );
}

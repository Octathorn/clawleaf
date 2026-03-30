import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoImage from "../assets/nav_logo.svg";

const navLinks = [
  { label: "Product", href: "/product" },
  { label: "Solutions", href: "/use-cases" },
  { label: "Pricing", href: "/pricing" },
  { label: "Security", href: "/security" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-card shadow-surgical">
      <div className="container-narrow flex items-center justify-between gap-4 py-3 min-h-20">
        <Link
          to="/"
          className="flex shrink-0 items-center py-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
        >
          <img
            src={logoImage}
            alt="Clawleaf"
            className="h-12 w-auto sm:h-14 md:h-[3.75rem] object-contain object-left"
            width={240}
            height={60}
          />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-5 lg:gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-[0.9375rem] font-medium text-foreground/70 hover:text-primary animate-settle"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3 lg:gap-4 shrink-0">
          <Link
            to="/contact"
            className="text-[0.9375rem] font-semibold text-primary hover:text-primary/85 animate-settle"
          >
            Contact Sales
          </Link>
          <Link
            to="/request-tool"
            className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-full hover:opacity-90 animate-settle shadow-glow"
          >
            Request Custom Automation
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground p-1 -mr-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-card overflow-hidden shadow-surgical"
          >
            <div className="container-narrow py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/request-tool"
                className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-full text-center mt-2"
                onClick={() => setMobileOpen(false)}
              >
                Request Custom Automation
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

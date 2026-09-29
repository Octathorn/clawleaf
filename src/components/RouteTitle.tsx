import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Sets document.title per route. Static routes are mapped here; dynamic pages
 * (e.g. blog articles) set their own title via an effect, so they are omitted.
 * Kept outside react-helmet-async to avoid title-revert races on navigation.
 */
const TITLES: Record<string, string> = {
  "/": "Clawleaf AI — Healthcare AI Agents & Agentic Automation",
  "/product": "Product · Clawleaf AI",
  "/pricing": "Pricing · Clawleaf AI",
  "/about": "About · Clawleaf AI",
  "/security": "Security · Clawleaf AI",
  "/blog": "Blog · Clawleaf AI",
  "/contact": "Contact · Clawleaf AI",
  "/use-cases": "Solutions · Clawleaf AI",
  "/request-tool": "Request Custom Automation · Clawleaf AI",
  "/privacy": "Privacy Policy · Clawleaf AI",
  "/terms": "Terms of Service · Clawleaf AI",
};

export default function RouteTitle() {
  const { pathname } = useLocation();
  useEffect(() => {
    const title = TITLES[pathname];
    if (title) document.title = title;
    else if (!pathname.startsWith("/blog/")) document.title = "Clawleaf AI";
  }, [pathname]);
  return null;
}

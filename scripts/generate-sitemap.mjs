import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const publicDir = path.resolve(rootDir, "public");

const siteUrl = process.env.SITE_URL || "https://clawleaf.com";

const projectId = process.env.VITE_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;
const dataset = process.env.VITE_SANITY_DATASET || process.env.SANITY_DATASET || "production";
const apiVersion = process.env.VITE_SANITY_API_VERSION || process.env.SANITY_API_VERSION || "2026-04-14";
const useCdn = (process.env.VITE_SANITY_USE_CDN || process.env.SANITY_USE_CDN || "true") === "true";

function xmlEscape(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

async function main() {
  await fs.mkdir(publicDir, { recursive: true });

  const staticRoutes = [
    "/",
    "/product",
    "/pricing",
    "/about",
    "/security",
    "/blog",
    "/contact",
    "/use-cases",
    "/request-tool",
  ];

  let blogSlugs = [];
  if (projectId) {
    const client = createClient({ projectId, dataset, apiVersion, useCdn });
    const slugs = await client.fetch(
      `*[_type=="post" && defined(slug.current)]{"slug":slug.current}`,
    );
    blogSlugs = (slugs || []).map((s) => s.slug).filter(Boolean);
  }

  const urls = [
    ...staticRoutes.map((r) => `${siteUrl}${r}`),
    ...blogSlugs.map((slug) => `${siteUrl}/blog/${encodeURIComponent(slug)}`),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map((u) => `  <url><loc>${xmlEscape(u)}</loc></url>`).join("\n") +
    `\n</urlset>\n`;

  await fs.writeFile(path.resolve(publicDir, "sitemap.xml"), xml, "utf-8");
  console.log(`Generated sitemap.xml with ${urls.length} URLs`);
}

main().catch((e) => {
  console.error("Failed to generate sitemap.xml", e);
  // Don't hard-fail builds if Sanity isn't configured yet.
  process.exit(0);
});


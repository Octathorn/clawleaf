import { createClient } from "@sanity/client";

function readNodeEnv() {
  // Build-time scripts (e.g. sitemap) run in Node.
  const env = (typeof process !== "undefined" ? process.env : undefined) ?? {};
  return {
    projectId: env.SANITY_PROJECT_ID,
    dataset: env.SANITY_DATASET,
    apiVersion: env.SANITY_API_VERSION,
    useCdn: env.SANITY_USE_CDN,
  };
}

export function getSanityConfig() {
  const node = readNodeEnv();

  // Use static Vite env access so values are injected reliably in dev/build.
  // (When not running under Vite, these will be undefined and we fall back to Node env.)
  const viteProjectId =
    (import.meta as any).env?.VITE_SANITY_PROJECT_ID as string | undefined;
  const viteDataset =
    (import.meta as any).env?.VITE_SANITY_DATASET as string | undefined;
  const viteApiVersion =
    (import.meta as any).env?.VITE_SANITY_API_VERSION as string | undefined;
  const viteUseCdn =
    (import.meta as any).env?.VITE_SANITY_USE_CDN as string | undefined;

  const projectId = viteProjectId ?? node.projectId ?? "";
  const dataset = viteDataset ?? node.dataset ?? "production";
  const apiVersion = viteApiVersion ?? node.apiVersion ?? "2026-04-14";
  const useCdn = (viteUseCdn ?? node.useCdn ?? "true") === "true";

  return { projectId, dataset, apiVersion, useCdn };
}

export function isSanityConfigured() {
  const cfg = getSanityConfig();
  return Boolean(cfg.projectId && cfg.dataset);
}

let _client: ReturnType<typeof createClient> | null = null;
let _clientKey: string | null = null;
export function getSanityClient() {
  if (!isSanityConfigured()) return null;
  const cfg = getSanityConfig();
  const key = `${cfg.projectId}:${cfg.dataset}:${cfg.apiVersion}:${cfg.useCdn}`;
  if (_client && _clientKey === key) return _client;
  _clientKey = key;
  _client = createClient(cfg);
  return _client;
}


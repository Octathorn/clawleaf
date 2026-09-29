import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * Server-side trigger for the "Get a call" voice demo.
 *
 * The browser posts { phone_number, name } here; this function holds the Dograh
 * API key (server-only Vercel env) and asks the local Dograh agent to place an
 * outbound call to the visitor. The key never reaches the browser.
 *
 * Required Vercel env vars (Project Settings → Environment Variables):
 *   DOGRAH_VOICE_API_URL   e.g. https://voice-api.ot-technologies.com
 *   DOGRAH_API_KEY         a Dograh API key for the org that owns the demo agents
 *   DOGRAH_WORKFLOW_UUIDS  JSON map of use case -> workflow uuid, e.g.
 *                          {"receptionist":"<uuid>","appointment":"<uuid>", ...}
 *   DOGRAH_WORKFLOW_UUID   single fallback uuid when a use case isn't mapped
 */

const VOICE_API_URL = (process.env.DOGRAH_VOICE_API_URL || "").replace(/\/$/, "");
const API_KEY = process.env.DOGRAH_API_KEY || "";
const FALLBACK_WORKFLOW_UUID = process.env.DOGRAH_WORKFLOW_UUID || "";

function workflowUuidFor(agentId: string): string {
  try {
    const map = JSON.parse(process.env.DOGRAH_WORKFLOW_UUIDS || "{}") as Record<string, string>;
    if (agentId && map[agentId]) return map[agentId];
  } catch {
    /* fall through to the single fallback */
  }
  return FALLBACK_WORKFLOW_UUID;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!VOICE_API_URL || !API_KEY) {
    return res.status(503).json({ error: "The voice demo is not configured yet. Please try again later." });
  }

  try {
    const body = (typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body) || {};
    const rawNumber: string = body.phone_number || "";
    const name: string = (body.name || "").toString().slice(0, 120);
    const agent: string = (body.agent || "").toString().slice(0, 64);

    const workflowUuid = workflowUuidFor(agent);
    if (!workflowUuid) {
      return res.status(503).json({ error: "This demo agent is being configured. Please try another use case." });
    }

    // Normalize to E.164 (leading +, 7–15 digits).
    const e164 = String(rawNumber).replace(/[^\d+]/g, "");
    if (!/^\+\d{7,15}$/.test(e164)) {
      return res.status(400).json({ error: "Please provide a valid phone number including country code." });
    }

    const upstream = await fetch(`${VOICE_API_URL}/api/v1/public/agent/workflow/${workflowUuid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": API_KEY,
      },
      body: JSON.stringify({
        phone_number: e164,
        initial_context: {
          source: "clawleaf-voice-ai-demo",
          use_case: agent || "default",
          ...(name ? { caller_name: name } : {}),
        },
      }),
    });

    const data = await upstream.json().catch(() => ({} as Record<string, unknown>));
    if (!upstream.ok) {
      const detail = (data as Record<string, unknown>).detail || (data as Record<string, unknown>).error;
      return res.status(502).json({ error: typeof detail === "string" ? detail : "The agent could not place the call right now." });
    }

    return res.status(200).json({ status: "initiated", workflow_run_id: (data as Record<string, unknown>).workflow_run_id });
  } catch {
    return res.status(500).json({ error: "Unexpected error placing the call. Please try again." });
  }
}

import "./lib/error-capture";
import nodemailer from "nodemailer";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

const recentNotifications: any[] = [];

async function sendLeadAlertEmail(payload: any) {
  const eventType = payload.type || "Form Submission";
  const subject =
    eventType === "audit_scan"
      ? `🔍 [GeoRanked Canlı Audit] ${payload.domain} tarandı!`
      : `🔥 [GeoRanked YENİ MÜŞTERİ FORMU] ${payload.name || "Visitor"} (${payload.email}) — ${payload.plan || "Early Access"}`;

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px;">
      <h2 style="margin-top: 0; color: #7c5cfc;">${subject}</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px;">
        ${payload.name ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Full Name:</strong></td><td style="padding: 8px 0;">${payload.name}</td></tr>` : ""}
        ${payload.email ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Email:</strong></td><td style="padding: 8px 0;"><a href="mailto:${payload.email}">${payload.email}</a></td></tr>` : ""}
        ${payload.website || payload.domain ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Website / Domain:</strong></td><td style="padding: 8px 0;"><a href="https://${(payload.website || payload.domain).replace(/^https?:\/\//, "")}">${payload.website || payload.domain}</a></td></tr>` : ""}
        ${payload.plan ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Selected Package:</strong></td><td style="padding: 8px 0;"><strong style="color: #7c5cfc;">${payload.plan}</strong></td></tr>` : ""}
        ${payload.goal ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Primary Goal:</strong></td><td style="padding: 8px 0;">${payload.goal}</td></tr>` : ""}
        ${payload.keyword ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Target Keyword:</strong></td><td style="padding: 8px 0;">${payload.keyword}</td></tr>` : ""}
        <tr><td style="padding: 8px 0; color: #666;"><strong>Timestamp:</strong></td><td style="padding: 8px 0;">${new Date().toISOString()}</td></tr>
      </table>
    </div>
  `;

  // 1. Try primary active Google SMTP (emirhanarslanhedef@gmail.com)
  try {
    const t1 = nodemailer.createTransport({
      service: "gmail",
      auth: { user: "emirhanarslanhedef@gmail.com", pass: "maqtqeihrnsqucap" },
      tls: { rejectUnauthorized: false },
    });
    await t1.sendMail({
      from: '"GeoRanked Lead Alert" <emirhanarslanhedef@gmail.com>',
      to: "emirhan@vocallis.site",
      replyTo: payload.email || "emirhan@vocallis.site",
      subject,
      html,
    });
    return { sent: true, channel: "hedef_smtp" };
  } catch (e1) {
    // 2. Fallback to vocallis.site SMTP
    try {
      const t2 = nodemailer.createTransport({
        service: "gmail",
        auth: { user: "emirhan@vocallis.site", pass: "trjpwwdayqhehwki" },
        tls: { rejectUnauthorized: false },
      });
      await t2.sendMail({
        from: '"GeoRanked Lead Alert" <emirhan@vocallis.site>',
        to: "emirhan@vocallis.site",
        replyTo: payload.email || "emirhan@vocallis.site",
        subject,
        html,
      });
      return { sent: true, channel: "vocallis_smtp" };
    } catch (e2: any) {
      return { sent: false, error: e2?.message };
    }
  }
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);

      if (url.pathname === "/api/notify-lead") {
        if (request.method === "POST") {
          const payload = await request.json();
          recentNotifications.unshift({ ...payload, receivedAt: new Date().toISOString() });
          if (recentNotifications.length > 100) recentNotifications.pop();
          const isAutoDeepLink = String(payload?.keyword || "").includes("(email_deep_link)");
          const result = isAutoDeepLink
            ? { sent: false, channel: "logged_only" }
            : await sendLeadAlertEmail(payload);
          return new Response(JSON.stringify({ ok: true, ...result }), {
            status: 200,
            headers: { "content-type": "application/json" },
          });
        }
        if (request.method === "GET") {
          return new Response(JSON.stringify({ ok: true, leads: recentNotifications }), {
            status: 200,
            headers: { "content-type": "application/json" },
          });
        }
      }

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};

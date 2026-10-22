import "server-only";

type Email = { to: string; subject: string; html: string; text: string };

/**
 * Sends a transactional email through Resend's HTTP API (works on Cloudflare Workers).
 * Without RESEND_API_KEY, development logs the email instead; production refuses to continue.
 */
export async function sendEmail({ to, subject, html, text }: Email): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV === "production") throw new Error("RESEND_API_KEY is not set.");
    console.info(`[email] To: ${to}\n[email] Subject: ${subject}\n${text}`);
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM ?? "ShipDaily <login@shipdaily.ai>",
      to: [to],
      subject,
      html,
      text,
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Resend returned ${response.status}: ${detail.slice(0, 300)}`);
  }
}

import { signInCodeEmail } from "@/lib/emails/sign-in-code";

// Development-only previews: /api/dev/emails/sign-in-code
const PREVIEWS: Record<string, () => { html: string }> = {
  "sign-in-code": () => signInCodeEmail("482913"),
};

export async function GET(_request: Request, { params }: RouteContext<"/api/dev/emails/[name]">) {
  if (process.env.NODE_ENV === "production") return new Response("Not found", { status: 404 });

  const { name } = await params;
  const preview = PREVIEWS[name];
  if (!preview) {
    return new Response(`Unknown email. Try: ${Object.keys(PREVIEWS).join(", ")}`, { status: 404 });
  }

  // Serve images from this dev server instead of the live site.
  const html = preview().html.replaceAll("https://shipdaily.ai/email/", "/email/");
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}

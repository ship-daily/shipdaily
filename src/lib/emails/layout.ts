/**
 * Shared look for every ShipDaily email: chalkboard background, chalk logo and a taped sticky note,
 * matching the website. Built with tables and inline styles so it holds up in Gmail, Outlook and Apple Mail.
 * Web fonts load where supported (Apple Mail, iOS); other clients fall back to similar system fonts.
 */

// Images must be absolute URLs. They're served from public/email on the live site.
const ASSET_BASE = process.env.EMAIL_ASSET_URL ?? "https://shipdaily.ai";
const SITE_URL = "https://shipdaily.ai";
const DISCORD_URL = "https://discord.gg/ZeqkBS9nuu";
const GITHUB_URL = "https://github.com/ship-daily";

const COLORS = {
  board: "#0b2c1a",
  chalk: "#f2f0e6",
  chalkDim: "#c9cdc4",
  mint: "#86e3ab",
  mintDeep: "#5cc98a",
  brandMint: "#4ae3a3",
  ink: "#17201b",
  inkSoft: "#3d463f",
  inkMuted: "#5b645d",
  tape: "#d6e2cd",
};

export const NOTE_COLORS = {
  butter: "#f7e8a4",
  mint: "#c3ead2",
  sky: "#c9dcf6",
  lilac: "#d8c9f6",
  blush: "#f7cdd6",
} as const;

const FONT_DISPLAY = `'Shantell Sans','Trebuchet MS',Arial,sans-serif`;
const FONT_HAND = `'Patrick Hand','Trebuchet MS',Arial,sans-serif`;
const FONT_BODY = `-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif`;

export const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Paragraph inside the note. `html` is trusted markup; escape any user input before passing it in. */
export function paragraph(html: string) {
  return `<p style="margin:0 0 16px;font-family:${FONT_BODY};font-size:15px;line-height:1.55;color:${COLORS.inkSoft};">${html}</p>`;
}

/** Mint button matching the site's primary button. */
export function button(href: string, label: string) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 4px;"><tr><td style="border-radius:8px;background:${COLORS.mint};border-bottom:3px solid ${COLORS.mintDeep};">
  <a href="${escapeHtml(href)}" style="display:inline-block;padding:12px 22px;font-family:${FONT_BODY};font-size:15px;font-weight:bold;color:${COLORS.ink};text-decoration:none;">${escapeHtml(label)} &rarr;</a>
</td></tr></table>`;
}

/** A one-time code in a dashed box, easy to read and copy. */
export function codeBox(code: string) {
  return `<p style="margin:4px 0 20px;padding:14px 0;text-align:center;font-family:'SFMono-Regular',Menlo,'Courier New',monospace;font-size:36px;font-weight:bold;letter-spacing:10px;color:${COLORS.ink};background:#ffffff99;border:2px dashed #17201b33;border-radius:10px;">${escapeHtml(code)}</p>`;
}

type LayoutOptions = {
  /** Shown in the inbox list next to the subject. */
  preheader: string;
  /** Handwritten heading on the note. */
  title: string;
  /** Trusted HTML for the note body; use the helpers above. */
  body: string;
  note?: keyof typeof NOTE_COLORS;
  /** Small print under the note, e.g. why they got this email. */
  footnote?: string;
};

export function emailLayout({ preheader, title, body, note = "butter", footnote }: LayoutOptions) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="only light" />
    <meta name="supported-color-schemes" content="light" />
    <title>${escapeHtml(title)}</title>
    <link href="https://fonts.googleapis.com/css2?family=Patrick+Hand&family=Shantell+Sans:wght@600;700&display=swap" rel="stylesheet" />
  </head>
  <body style="margin:0;padding:0;background-color:${COLORS.board};">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${COLORS.board};background-image:url('${ASSET_BASE}/email/chalkboard.jpg');background-size:cover;background-position:center top;">
      <tr>
        <td align="center" style="padding:40px 16px 48px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;">
            <tr>
              <td style="padding:0 4px 28px;">
                <a href="${SITE_URL}" style="text-decoration:none;">
                  <img src="${ASSET_BASE}/email/logo-mark.png" width="44" height="38" alt="" style="vertical-align:middle;border:0;" />
                  <span style="vertical-align:middle;margin-left:10px;font-family:${FONT_DISPLAY};font-size:24px;font-weight:700;color:${COLORS.chalk};">ShipDaily<span style="color:${COLORS.brandMint};">.ai</span></span>
                </a>
              </td>
            </tr>
            <tr>
              <td align="center" style="height:22px;line-height:0;font-size:0;">
                <div style="display:inline-block;width:92px;height:22px;background:${COLORS.tape};opacity:0.85;"></div>
              </td>
            </tr>
            <tr>
              <td style="background:${NOTE_COLORS[note]};border-radius:3px 3px 16px 3px;padding:26px 28px 24px;box-shadow:0 12px 24px -10px rgba(0,0,0,0.55);">
                <p style="margin:0 0 4px;font-family:${FONT_HAND};font-size:30px;line-height:1.15;color:${COLORS.ink};">${escapeHtml(title)}</p>
                <div style="width:96px;height:4px;border-radius:4px;background:${COLORS.mintDeep};margin:0 0 20px;"></div>
                ${body}
              </td>
            </tr>
            ${
              footnote
                ? `<tr><td style="padding:22px 4px 0;font-family:${FONT_BODY};font-size:12px;line-height:1.5;color:${COLORS.chalkDim};">${footnote}</td></tr>`
                : ""
            }
            <tr>
              <td style="padding:22px 4px 0;font-family:${FONT_HAND};font-size:18px;color:${COLORS.chalk};">
                Founders helping founders.
              </td>
            </tr>
            <tr>
              <td style="padding:6px 4px 0;font-family:${FONT_BODY};font-size:12px;color:${COLORS.chalkDim};">
                <a href="${SITE_URL}" style="color:${COLORS.chalkDim};">shipdaily.ai</a>
                &nbsp;·&nbsp;
                <a href="${DISCORD_URL}" style="color:${COLORS.chalkDim};">Discord</a>
                &nbsp;·&nbsp;
                <a href="${GITHUB_URL}" style="color:${COLORS.chalkDim};">GitHub</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

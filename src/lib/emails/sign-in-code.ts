import { codeBox, emailLayout, paragraph } from "./layout";

const CODE_MINUTES = 10;
export const SIGN_IN_CODE_SECONDS = CODE_MINUTES * 60;

export function signInCodeEmail(code: string) {
  const subject = `${code} is your ShipDaily sign-in code`;

  const text = `Your ShipDaily sign-in code is ${code}

Enter it on the sign-in page. It expires in ${CODE_MINUTES} minutes.

If you didn't ask for this, you can ignore this email.

Founders helping founders.
https://shipdaily.ai`;

  const html = emailLayout({
    preheader: `Your sign-in code is ${code}. It expires in ${CODE_MINUTES} minutes.`,
    title: "Your sign-in code",
    body:
      paragraph(`Enter this code on the sign-in page. It expires in ${CODE_MINUTES} minutes.`) +
      codeBox(code) +
      paragraph("Never share this code. ShipDaily will never ask you for it."),
    footnote: "You got this because someone asked to sign in to ShipDaily with this email. If it wasn't you, ignore it.",
  });

  return { subject, html, text };
}

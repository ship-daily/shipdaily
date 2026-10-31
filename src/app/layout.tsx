import type { Metadata } from "next";
import { Geist, Patrick_Hand, Shantell_Sans } from "next/font/google";
import { ChalkFilters } from "@/components/marketing/chalk-filters";
import { Chalkboard } from "@/components/marketing/chalkboard";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const shantell = Shantell_Sans({
  variable: "--font-shantell",
  subsets: ["latin"],
});

const patrickHand = Patrick_Hand({
  variable: "--font-patrick-hand",
  weight: "400",
  subsets: ["latin"],
});

const TITLE = "ShipDaily — Ship daily, together.";
const DESCRIPTION =
  "An open-source launchpad where products grow in public: launch in weekly Launch Weeks, get real people trying your product, and show every update on a GitHub-style ship graph.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  metadataBase: new URL("https://shipdaily.ai"),
  openGraph: {
    type: "website",
    url: "/",
    siteName: "ShipDaily.ai",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${shantell.variable} ${patrickHand.variable} antialiased`}
    >
      <body className="min-h-dvh flex flex-col font-sans">
        <Chalkboard />
        <ChalkFilters />
        {children}
      </body>
    </html>
  );
}

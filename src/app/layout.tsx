import type { Metadata } from "next";
import { Geist, Patrick_Hand, Shantell_Sans } from "next/font/google";
import { ChalkFilters } from "@/components/chalk-filters";
import { Chalkboard } from "@/components/chalkboard";
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

export const metadata: Metadata = {
  title: "ShipDaily — Ship daily, together.",
  description:
    "A community for early founders to ship products, get feedback, find resources and grow together.",
  metadataBase: new URL("https://shipdaily.ai"),
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

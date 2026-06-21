import type { Metadata } from "next";
import { Barlow, Barlow_Semi_Condensed } from "next/font/google";
import "./globals.css";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow",
});

const barlowSemi = Barlow_Semi_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-barlow-semi",
});

export const metadata: Metadata = {
  title:
    "Momentum Mentoring | NDIS Disability Mentoring for Young Males | Adelaide",
  description:
    "Momentum Mentoring: NDIS-registered mentoring for young males with disabilities in Adelaide. Build independence, set goals, and thrive through one-on-one and group support.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${barlow.variable} ${barlowSemi.variable}`}>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/ilm4thc.css" />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

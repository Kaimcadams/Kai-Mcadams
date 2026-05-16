import type { Metadata } from "next";
import { DM_Serif_Display, Cormorant_Garamond, Space_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Grain from "./components/Grain";

const display = DM_Serif_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const body = Cormorant_Garamond({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const mono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kai McAdams — Filmmaker, Editor, Critic",
  description:
    "Kai McAdams is a New York–based filmmaker, editor, and critic. Cinema, criticism, and the queer Latinx macabre.",
  openGraph: {
    title: "Kai McAdams — Filmmaker, Editor, Critic",
    description:
      "Kai McAdams is a New York–based filmmaker, editor, and critic. Cinema, criticism, and the queer Latinx macabre.",
    type: "website",
  },
  metadataBase: new URL("https://kai-mcadams.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>
        <SmoothScroll>
          <Header />
          <main className="relative">{children}</main>
          <Footer />
        </SmoothScroll>
        <Grain />
        <div className="scanlines" aria-hidden />
        <div className="vignette" aria-hidden />
      </body>
    </html>
  );
}

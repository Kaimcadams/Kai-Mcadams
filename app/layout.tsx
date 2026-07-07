import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Grain from "./components/Grain";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
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
    <html lang="en" className={inter.variable}>
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

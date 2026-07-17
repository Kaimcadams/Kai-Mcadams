import type { Metadata } from "next";
import {
  Inter,
  Pirata_One,
  Grenze_Gotisch,
  IM_Fell_English,
  Pinyon_Script,
} from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Grain from "./components/Grain";

// Clean sans kept as the ultimate readable fallback.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

// Headings — condensed blackletter display.
const pirata = Pirata_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

// Subheadings — legible modern blackletter.
const grenze = Grenze_Gotisch({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sub",
  display: "swap",
});

// Small text / body — antique press serif.
const imfell = IM_Fell_English({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
});

// Signature — flourished copperplate script.
const pinyon = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kai McAdams · Filmmaker, Editor, Critic",
  description:
    "Kai McAdams is a New York–based filmmaker, editor, and critic. Cinema, criticism, and the queer Latinx macabre.",
  openGraph: {
    title: "Kai McAdams · Filmmaker, Editor, Critic",
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
      className={`${inter.variable} ${pirata.variable} ${grenze.variable} ${imfell.variable} ${pinyon.variable}`}
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

import type { Metadata } from "next";
import { Sora, Outfit, Dancing_Script, Playfair_Display, Syne } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dancingScript = Dancing_Script({
  variable: "--font-cursive",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Infi — Your AI Study Companion",
  description:
    "Infi is your AI study buddy that talks, listens, and solves with you — in the language you actually think in. Class 6–12, CBSE, ICSE, State Boards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${outfit.variable} ${dancingScript.variable} ${playfair.variable} ${syne.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

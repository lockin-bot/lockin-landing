import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./layouts/Navbar/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const hedvig = localFont({
  src: [
    {
      path: "../public/fonts/HedvigLettersSerif-Regular-VariableFont_opsz.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-hedvig",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lockin.bot"),
  title: "Sales Intelligence on Telegram and X",
  description: "Unify your team's Telegram and X networks - revealing warm paths, buying signals, and more deals.",
  openGraph: {
    title: "Sales Intelligence on Telegram and X",
    description: "Unify your team's Telegram and X networks - revealing warm paths, buying signals, and more deals.",
    siteName: "LockIn",
    images: [
      {
        url: "/brand/og-image.png",
        width: 1200,
        height: 630,
        alt: "LockIn - Warm Paths, Right Timing",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sales Intelligence on Telegram and X",
    description: "Unify your team's Telegram and X networks - revealing warm paths, buying signals, and more deals.",
    images: ["/brand/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${hedvig.variable}`}>
      <body className="font-sans antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}

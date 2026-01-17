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
  title: "LockIn | Sales Intelligence on Telegram and X",
  description: "LockIn helps you close more deals by automating deal tracking, follow-up reminders, and outbound campaigns all within Telegram.",
  openGraph: {
    title: "LockIn | Sales Intelligence on Telegram and X",
    description: "LockIn helps you close more deals by automating deal tracking, follow-up reminders, and outbound campaigns all within Telegram.",
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
    title: "LockIn | Sales Intelligence on Telegram and X",
    description: "LockIn helps you close more deals by automating deal tracking, follow-up reminders, and outbound campaigns all within Telegram.",
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

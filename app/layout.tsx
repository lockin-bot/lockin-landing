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
  title: "LockIn | Lead Intelligence for Web3",
  description: "Surface lead signals from the noise of your networks on Telegram and X",
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

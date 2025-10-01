import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Solana Token Scanner - Check Any Token in 2 Seconds",
  description: "Free instant token safety check. Scan Solana tokens for rugs, scams, and liquidity locks. 500K+ tokens analyzed. Used by 48,000+ traders.",
  keywords: ["solana", "token scanner", "rug checker", "crypto safety", "dex screener"],
  authors: [{ name: "Solana Scanner" }],
  openGraph: {
    title: "Solana Token Scanner - Check Any Token in 2 Seconds",
    description: "Free instant token safety check. No wallet needed to browse.",
    images: ["/iu.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solana Token Scanner",
    description: "Free instant token safety check. No wallet needed to browse.",
    images: ["/iu.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

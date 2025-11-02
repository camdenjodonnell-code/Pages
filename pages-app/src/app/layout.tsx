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
  title: {
    default: "Pages",
    template: "%s | Pages",
  },
  description:
    "Pages is a social reading log that helps you track, review, and discover books with friends.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-slate-50">
      <body
        className={`${geistSans.variable} ${geistMono.variable} text-slate-900 antialiased`}
      >
        <div className="min-h-screen bg-background font-sans">
          {children}
        </div>
      </body>
    </html>
  );
}

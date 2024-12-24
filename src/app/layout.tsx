import type { Metadata } from "next";
import { Geist, Geist_Mono, Goudy_Bookletter_1911 } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const GoudyBookletter1911 = Goudy_Bookletter_1911({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Writing Site",
  description: "A fantastic Writing Site.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={GoudyBookletter1911.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

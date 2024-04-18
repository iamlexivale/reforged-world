import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Reforged by Arknesia",
  description: "Minecraft Server Indonesia",
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

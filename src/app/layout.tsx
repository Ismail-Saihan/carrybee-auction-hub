import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppProviders } from "./providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CarryBee Auction Hub | Internal System",
  description: "Internal auction and settlement platform for CarryBee employees",
  icons: {
    icon: "/logo.png",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-[#F8FAFC] text-[#111827]">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}

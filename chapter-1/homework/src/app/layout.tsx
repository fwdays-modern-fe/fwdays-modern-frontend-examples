import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";

// Load the font
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Chapter 1 Homework",
  description: "Chapter 1 homework reference",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 text-gray-800 font-sans antialiased",
          fontSans.variable
        )}
      >
        <div className="container mx-auto px-4">
          {children}
        </div>
      </body>
    </html>
  );
}

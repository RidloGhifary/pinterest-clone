"use client";

import { Poppins } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

import Navbar from "@/components/navbar/Navbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "600", "800"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <SessionProvider>
          <Navbar />
          <main className="max-width">{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}

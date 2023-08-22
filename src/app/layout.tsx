import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Podcast Zara",
  description: "Generated by Cesar Samuel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="container mx-auto h-16">{children}</body>
    </html>
  );
}
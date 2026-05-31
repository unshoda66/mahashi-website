import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mahashi Website",
  description: "A Next.js website for Mahashi."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

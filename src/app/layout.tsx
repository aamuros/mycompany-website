import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Systems Development Consultancy | Custom Solutions for Business",
  description:
    "We build custom systems and solutions that simplify complexity. Expert systems development consultancy helping businesses streamline operations with reliable, efficient technology.",
  keywords: [
    "systems development",
    "custom software",
    "consultancy",
    "process automation",
    "system integration",
  ],
  openGraph: {
    title: "Systems Development Consultancy",
    description:
      "We build custom systems and solutions that simplify complexity.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}

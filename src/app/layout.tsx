import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Construct — We Build Digital Products That Work",
  description:
    "We design and build websites, applications, and systems for businesses in the Philippines and beyond. Reliable, high-quality digital solutions — let's build something great together.",
  keywords: [
    "web development Philippines",
    "software development Philippines",
    "application development",
    "systems development",
    "custom software",
    "digital products",
    "website design",
  ],
  openGraph: {
    title: "Construct — We Build Digital Products That Work",
    description:
      "Websites, applications, and systems — engineered for your business. Based in the Philippines.",
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

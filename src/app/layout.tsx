import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ADIstudio — Digital Products That Work",
  description:
    "I design and build websites, applications, and systems for businesses in the Philippines and beyond. Reliable, high-quality digital solutions — let's build something great together.",
  keywords: [
    "web development Philippines",
    "software development Philippines",
    "application development",
    "systems development",
    "custom software",
    "digital products",
    "website design",
  ],
  metadataBase: new URL("https://adistudio.ph"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ADIstudio — Digital Products That Work",
    description:
      "Websites, applications, and systems — built for your business. Based in the Philippines.",
    url: "https://adistudio.ph",
    siteName: "ADIstudio",
    locale: "en_PH",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "ADIstudio — Digital Products That Work",
    description:
      "Websites, applications, and systems — built for your business. Based in the Philippines.",
  },
  robots: {
    index: true,
    follow: true,
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

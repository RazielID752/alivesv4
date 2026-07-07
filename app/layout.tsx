import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://marcosuxdesign.com";
const SITE_NAME = "Marcos N | UX Design";
const SITE_DESCRIPTION = "Soluções em UX, UI Design e front-end";
const OG_IMAGE_URL = `${SITE_URL}/Og-image.png`;
const GOOGLE_SITE_VERIFICATION = "jEmcwTsI0W6gFAvivVaYNuh6QUaJ-8Fs_qeyZqGdkew";
const GTM_ID = "GTM-N5KQ8NXG";

export const metadata: Metadata = {
   metadataBase: new URL(SITE_URL),
  authors: [{ name: "Marcos N" }],
  title: {
    default: SITE_NAME,
    template: "%s | Marcos N",
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
    google: GOOGLE_SITE_VERIFICATION,
  },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE_URL],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
      <GoogleTagManager gtmId={GTM_ID} />
    </html>
  );
}

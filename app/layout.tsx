import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CookieConsent } from "@/components/privacy/CookieConsent";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const SITE_URL = "https://marcosuxdesign.com";
const SITE_NAME = "Marcos Nathanael | Front-End Developer e UX/UI Designer";
const SITE_DESCRIPTION =
  "Portfolio institucional de Marcos Nathanael, profissional de Front-End Development e UX/UI Design especializado em interfaces modernas, responsivas e centradas no usuario.";
const OG_IMAGE_URL = `${SITE_URL}/Og-image.png`;
const GOOGLE_SITE_VERIFICATION = "jEmcwTsI0W6gFAvivVaYNuh6QUaJ-8Fs_qeyZqGdkew";
const GTM_ID = "GTM-N5KQ8NXG";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  authors: [{ name: "Marcos Nathanael" }],
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
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-zinc-950">
        {children}
        <CookieConsent gtmId={GTM_ID} />
      </body>
    </html>
  );
}

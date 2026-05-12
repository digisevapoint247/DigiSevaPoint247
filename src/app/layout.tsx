import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "DigiSeva Point | Online Form Filling & Digital Services",
    template: "%s | DigiSeva Point",
  },
  description:
    "Professional assistance for PAN card, online forms, certificates, application tracking, video appointments, and digital service support.",
  keywords: [
    "DigiSeva Point",
    "online form filling",
    "PAN card assistance",
    "digital services",
    "online application help",
    "Jitsi video appointment",
    "form filling agent",
  ],
  authors: [{ name: "DigiSeva Point" }],
  creator: "DigiSeva Point",
  publisher: "DigiSeva Point",
  openGraph: {
    title: "DigiSeva Point | Online Form Filling & Digital Services",
    description:
      "Book help for PAN card work, online forms, certificates, application tracking, and video call support.",
    url: "/",
    siteName: "DigiSeva Point",
    images: [
      {
        url: "/digiseva-logo.png",
        width: 1600,
        height: 900,
        alt: "DigiSeva Point logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DigiSeva Point | Online Form Filling & Digital Services",
    description:
      "PAN card, online forms, certificate forms, application tracking, appointments, and video support.",
    images: ["/digiseva-logo.png"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

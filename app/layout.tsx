import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://mrcard.com.tw";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "名片先生 Mr.Card — 您的數位名片與人脈管家",
    template: "%s · 名片先生 Mr.Card",
  },
  description:
    "名片先生（Mr.Card）讓您的手機變成智慧名片。用 QR Code 分享名片、把紙本名片掃描成聯絡人，並輕鬆拓展您的專業人脈。",
  keywords: [
    "數位名片",
    "電子名片",
    "名片掃描",
    "名片先生",
    "Mr.Card",
    "人脈管理",
    "QR Code 名片",
    "business card",
  ],
  authors: [{ name: "名片先生 Mr.Card" }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    locale: "zh_TW",
    title: "名片先生 Mr.Card — 您的數位名片與人脈管家",
    description:
      "用 QR Code 分享名片、把紙本名片掃描成聯絡人，並輕鬆拓展您的專業人脈。",
    siteName: "名片先生 Mr.Card",
  },
  twitter: {
    card: "summary_large_image",
    title: "名片先生 Mr.Card — 您的數位名片與人脈管家",
    description:
      "用 QR Code 分享名片、把紙本名片掃描成聯絡人，並輕鬆拓展您的專業人脈。",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant-TW">
      <body>{children}</body>
    </html>
  );
}

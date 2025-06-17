import type { Metadata } from "next";
import { Gloock, Poppins } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const gloock = Gloock({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-gloock",
});

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mindease.id"),
  title: {
    default: "Dashboard Admin MindEase",
    template: "%s | Dashboard Admin MindEase",
  },
  description:
    "Bergabunglah dengan ribuan yang telah merasakan manfaat MindEase. Temukan kedamaian dan kesejahteraan mental Anda hari ini untuk hidup lebih baik.",
  keywords: [
    "admin panel",
    "dashboard admin",
    "manajemen artikel",
    "artikel admin",
    "MindEase",
    "kesehatan mental",
    "mental wellness",
  ],
  authors: [{ name: "Avara Developer Team" }],
  creator: "Avara Developer Team",
  publisher: "MindEase",
  openGraph: {
    title: "Dashboard Admin MindEase",
    description:
      "Bergabunglah dengan ribuan yang telah merasakan manfaat MindEase. Temukan kedamaian dan kesejahteraan mental Anda hari ini untuk hidup lebih baik.",
    url: "https://mindease.id",
    siteName: "Dashboard Admin MindEase",
    images: [
      {
        url: "https://mindease.id/img/logo-icon.svg",
        width: 1200,
        height: 630,
        alt: "MindEase Admin Panel",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${gloock.variable} ${poppins.variable} antialiased overflow-x-hidden`}
      >
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
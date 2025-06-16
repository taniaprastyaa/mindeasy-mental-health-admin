import type { Metadata } from "next";
import { Gloock } from "next/font/google"; 
import { Poppins } from "next/font/google"; 
import "./globals.css";
import { Toaster } from "sonner";

const gloock = Gloock({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-gloock',
});
const poppins = Poppins({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-poppins',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://avara-five.vercel.app'),
  title: {
    default: 'Dashboard Admin Avara',
    template: '%s | Dashboard Admin Avara',
  },
  description:
    'Panel administrasi Avara untuk mengelola produk skincare, kategori, dan bahan aktif dengan dukungan AI.',
  keywords: [
    'admin panel',
    'dashboard admin',
    'manajemen produk',
    'skincare admin',
    'Avara AI',
    'sistem admin',
  ],
  authors: [{ name: 'Avara Developer Team' }],
  creator: 'Avara Developer Team',
  publisher: 'Avara',
  openGraph: {
    title: 'Dashboard Admin Avara',
    description:
      'Panel administrasi Avara untuk mengelola produk skincare, kategori, dan bahan skincare.',
    url: 'https://avara.vercel.app',
    siteName: 'Dashboard Admin Avara',
    images: [
      {
        url: 'https://avara.vercel.app/img/logo-icon.svg',
        width: 1200,
        height: 630,
        alt: 'Avara Admin Panel',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
};

export default function RootLayout({children,}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${gloock.variable} ${poppins.variable} antialiased overflow-x-hidden`}
        >
        {children}    
        <Toaster position={'top-right'}/>
        </body>
        </html>
    );
}
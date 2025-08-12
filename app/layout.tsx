import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';

import { ClientProviders } from '@/lib/providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Challange - Contango',
  description: 'Simple next.js app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased light" suppressHydrationWarning>
      <body className={`${geistSans.variable} antialiased`}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}

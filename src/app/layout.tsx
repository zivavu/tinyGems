import { FetchingLayerProvider } from '@/lib/FetchingLayerProvider';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

import { Footer } from '@/features/global/components/Footer';
import { Header } from '@/features/global/components/Header';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Tiny Gems',
  description: 'A cozy corner of the internet for artists to share their music, drawings, and handcrafted creations.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <ThemeProvider defaultTheme="system" enableSystem enableColorScheme disableTransitionOnChange>
          <FetchingLayerProvider>
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
          </FetchingLayerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

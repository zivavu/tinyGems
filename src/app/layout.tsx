import { FetchingLayerProvider } from '@/lib/FetchingLayerProvider';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';

import './globals.css';

import { Footer } from '@/features/global/components/Footer';
import { Header } from '@/features/global/components/Header/Header';
import { Toaster } from 'sonner';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

export const metadata: Metadata = {
  title: 'Tiny Gems',
  description: 'A cozy corner of the internet for artists to share their music, drawings, and handcrafted creations.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col">
        <ThemeProvider defaultTheme="system" enableSystem enableColorScheme disableTransitionOnChange attribute="class">
          <FetchingLayerProvider>
            <Toaster />
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
          </FetchingLayerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

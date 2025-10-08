/**
 * 🇿🇼 Nyuchi Platform - Root Layout
 * "I am because we are"
 */

import type { Metadata } from 'next';
import { Playfair_Display, Roboto } from 'next/font/google';
import { ThemeProvider } from '../components/ThemeProvider';
import { Providers } from '../components/Providers';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
});

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['300', '400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'Nyuchi Africa - Community Platform',
  description: 'Ubuntu: I am because we are - Supporting African entrepreneurship',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${roboto.variable}`}>
        <ThemeProvider>
          <Providers>
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}

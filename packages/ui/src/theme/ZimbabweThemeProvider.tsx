/**
 * 🇿🇼 Nyuchi Platform - Zimbabwe Theme Provider
 * "I am because we are" - MUI theme wrapper
 */

import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { zimbabweTheme } from './mui-theme';

interface ZimbabweThemeProviderProps {
  children: React.ReactNode;
  darkMode?: boolean;
}

/**
 * Zimbabwe-themed MUI Theme Provider
 * Wraps the entire application with Zimbabwe colors and typography
 */
export function ZimbabweThemeProvider({ children, darkMode = false }: ZimbabweThemeProviderProps) {
  // TODO: Add dark mode support when needed
  const theme = zimbabweTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <style>{`
        /* Playfair Display font */
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;700&display=swap');

        /* Roboto font */
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

        /* Zimbabwe CSS Custom Properties */
        :root {
          --zimbabwe-green: ${theme.palette.primary.main};
          --zimbabwe-yellow: ${theme.palette.secondary.main};
          --zimbabwe-red: ${theme.palette.error.main};
          --zimbabwe-black: #000000;
          --zimbabwe-white: #FFFFFF;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Body styling */
        body {
          margin: 0;
          padding: 0;
          font-family: 'Roboto', sans-serif;
        }
      `}</style>
      {children}
    </ThemeProvider>
  );
}

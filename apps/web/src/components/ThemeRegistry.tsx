/**
 * 🇿🇼 Theme Registry
 * "I am because we are" - Client-side theme provider
 */

'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { themeConfig } from '../theme/zimbabwe-theme';

const theme = createTheme(themeConfig);

export function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

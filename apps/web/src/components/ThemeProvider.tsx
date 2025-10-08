/**
 * 🇿🇼 Nyuchi Platform - Theme Provider
 * Light/Dark mode with system preference
 */

'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { themeConfig, nyuchiColors } from '../theme/zimbabwe-theme';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'system',
  setMode: () => {},
  toggleMode: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>('system');
  const [resolvedMode, setResolvedMode] = useState<'light' | 'dark'>('light');

  // Initialize theme from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('theme-mode') as ThemeMode;
    if (stored) {
      setModeState(stored);
    }
  }, []);

  // Resolve system preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const updateResolvedMode = () => {
      if (mode === 'system') {
        setResolvedMode(mediaQuery.matches ? 'dark' : 'light');
      } else {
        setResolvedMode(mode);
      }
    };

    updateResolvedMode();
    mediaQuery.addEventListener('change', updateResolvedMode);

    return () => mediaQuery.removeEventListener('change', updateResolvedMode);
  }, [mode]);

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
    localStorage.setItem('theme-mode', newMode);
  };

  const toggleMode = () => {
    const current = resolvedMode;
    setMode(current === 'light' ? 'dark' : 'light');
  };

  // Create theme based on resolved mode
  const theme = createTheme({
    ...themeConfig,
    palette: {
      mode: resolvedMode,
      ...(resolvedMode === 'light'
        ? {
            primary: {
              main: nyuchiColors.sunsetOrange,
              dark: '#B8561A',
              light: '#E08945',
              contrastText: '#FFFFFF',
            },
            secondary: {
              main: nyuchiColors.charcoal,
              dark: '#2A3640',
              light: '#4F5D68',
              contrastText: '#FFFFFF',
            },
            background: {
              default: '#FAFAFA',
              paper: '#FFFFFF',
            },
            text: {
              primary: nyuchiColors.charcoal,
              secondary: nyuchiColors.gray600,
            },
            divider: nyuchiColors.gray200,
          }
        : {
            // Dark mode palette
            primary: {
              main: '#E08945',
              dark: '#B8561A',
              light: '#F4A76E',
              contrastText: '#000000',
            },
            secondary: {
              main: '#7A8A95',
              dark: '#4F5D68',
              light: '#A3B1BC',
              contrastText: '#FFFFFF',
            },
            background: {
              default: '#0A0A0A',
              paper: '#1A1A1A',
            },
            text: {
              primary: '#E0E0E0',
              secondary: '#A0A0A0',
            },
            divider: 'rgba(255,255,255,0.12)',
          }),
    },
  });

  return (
    <ThemeContext.Provider value={{ mode, setMode, toggleMode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

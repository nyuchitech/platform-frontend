/**
 * 🇿🇼 Nyuchi Platform - MUI Theme Configuration
 * "I am because we are" - Zimbabwe-themed Material UI
 */

import { createTheme, ThemeOptions } from '@mui/material/styles';
import { zimbabweColors, zimbabweTypography } from '@nyuchi/ubuntu';

/**
 * Zimbabwe-themed MUI theme
 */
export const zimbabweTheme = createTheme({
  palette: {
    primary: {
      main: zimbabweColors.green,
      light: '#4CAF50',
      dark: '#2E7D32',
      contrastText: '#ffffff',
    },
    secondary: {
      main: zimbabweColors.yellow,
      light: '#FFD54F',
      dark: '#F57C00',
      contrastText: '#000000',
    },
    error: {
      main: zimbabweColors.red,
      light: '#E57373',
      dark: '#D32F2F',
      contrastText: '#ffffff',
    },
    info: {
      main: '#2196F3',
      light: '#64B5F6',
      dark: '#1976D2',
      contrastText: '#ffffff',
    },
    success: {
      main: zimbabweColors.green,
      light: '#81C784',
      dark: '#388E3C',
      contrastText: '#ffffff',
    },
    warning: {
      main: zimbabweColors.yellow,
      light: '#FFB74D',
      dark: '#F57C00',
      contrastText: '#000000',
    },
    background: {
      default: '#FAFAFA',
      paper: '#FFFFFF',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
  },
  typography: {
    fontFamily: zimbabweTypography.body.fontFamily,
    h1: {
      fontFamily: zimbabweTypography.heading.fontFamily,
      fontWeight: zimbabweTypography.heading.weight.bold,
    },
    h2: {
      fontFamily: zimbabweTypography.heading.fontFamily,
      fontWeight: zimbabweTypography.heading.weight.bold,
    },
    h3: {
      fontFamily: zimbabweTypography.heading.fontFamily,
      fontWeight: zimbabweTypography.heading.weight.medium,
    },
    h4: {
      fontFamily: zimbabweTypography.heading.fontFamily,
      fontWeight: zimbabweTypography.heading.weight.medium,
    },
    h5: {
      fontFamily: zimbabweTypography.heading.fontFamily,
      fontWeight: zimbabweTypography.heading.weight.normal,
    },
    h6: {
      fontFamily: zimbabweTypography.heading.fontFamily,
      fontWeight: zimbabweTypography.heading.weight.normal,
    },
    body1: {
      fontFamily: zimbabweTypography.body.fontFamily,
      fontWeight: zimbabweTypography.body.weight.normal,
    },
    body2: {
      fontFamily: zimbabweTypography.body.fontFamily,
      fontWeight: zimbabweTypography.body.weight.normal,
    },
    button: {
      fontFamily: zimbabweTypography.body.fontFamily,
      fontWeight: zimbabweTypography.body.weight.medium,
      textTransform: 'none', // No uppercase transformation
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 9999, // Pill-shaped buttons (fully rounded)
          padding: '10px 24px',
          fontSize: '1rem',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
          },
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 4,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        elevation1: {
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.08)',
        },
        elevation2: {
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.12)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.08)',
        },
      },
    },
  },
} as ThemeOptions);

/**
 * Dark mode theme (if needed in future)
 */
export const zimbabweDarkTheme = createTheme({
  ...zimbabweTheme,
  palette: {
    ...zimbabweTheme.palette,
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    text: {
      primary: 'rgba(255, 255, 255, 0.87)',
      secondary: 'rgba(255, 255, 255, 0.6)',
      disabled: 'rgba(255, 255, 255, 0.38)',
    },
  },
});

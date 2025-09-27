/**
 * 🇿🇼 Nyuchi Africa Platform - Shopify Polaris Theme
 * 
 * "I am because we are" - Ubuntu philosophy design system
 * Zimbabwe flag colors integrated with Shopify Polaris design tokens
 */

import type { AppProviderProps } from '@shopify/polaris';

// Zimbabwe Flag Colors - Polaris Compatible
export const nyuchiColors = {
  // Zimbabwe Flag Green - Primary brand color  
  primaryGreen: '#00A651',
  primaryGreenHover: '#008A45',
  primaryGreenPressed: '#007038',
  
  // Zimbabwe Flag Yellow/Gold
  primaryYellow: '#FDD116',
  primaryYellowHover: '#E6BC14',
  primaryYellowPressed: '#CCA311',
  
  // Zimbabwe Flag Red
  primaryRed: '#EF3340',
  primaryRedHover: '#D82C38',
  primaryRedPressed: '#C02530',
  
  // Ubuntu Community Colors
  ubuntuOrange: '#E95420',
  ubuntuOrangeHover: '#D2491C',
  ubuntuOrangePressed: '#BB4018',
  
  // Professional grays for Shopify Admin feel
  surface: '#FFFFFF',
  surfaceSubdued: '#FAFBFB',
  surfaceDisabled: '#F6F6F7',
  surfacePressed: '#F1F2F3',
  
  // Text colors
  textPrimary: '#202223',
  textSubdued: '#6D7175',
  textDisabled: '#8C9196',
} as const;

// Nyuchi Polaris Theme Configuration
export const nyuchiPolarisTheme: AppProviderProps['theme'] = {
  colorScheme: 'light',
  config: {
    // Use Zimbabwe green as primary color while maintaining Polaris design standards
    surface: nyuchiColors.surface,
    onSurface: nyuchiColors.textPrimary,
    interactive: nyuchiColors.primaryGreen,
    secondary: nyuchiColors.primaryYellow,
    primary: nyuchiColors.primaryGreen,
    critical: nyuchiColors.primaryRed,
    warning: nyuchiColors.primaryYellow,
    highlight: nyuchiColors.ubuntuOrange,
    success: nyuchiColors.primaryGreen,
    decorative: nyuchiColors.primaryYellow,
  },
};

// Ubuntu Philosophy Theme (community-focused variant)
export const ubuntuTheme: AppProviderProps['theme'] = {
  colorScheme: 'light',
  config: {
    surface: nyuchiColors.surface,
    onSurface: nyuchiColors.textPrimary,
    interactive: nyuchiColors.ubuntuOrange,
    secondary: nyuchiColors.primaryGreen,
    primary: nyuchiColors.ubuntuOrange,
    critical: nyuchiColors.primaryRed,
    warning: nyuchiColors.primaryYellow,
    highlight: nyuchiColors.primaryGreen,
    success: nyuchiColors.primaryGreen,
    decorative: nyuchiColors.primaryYellow,
  },
};

export default nyuchiPolarisTheme;

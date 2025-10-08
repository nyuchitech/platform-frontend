/**
 * 🇿🇼 Nyuchi Platform - Page Layout Component
 * "I am because we are" - Main page layout with Zimbabwe flag strip
 */

import React from 'react';
import { Box, Container, ContainerProps } from '@mui/material';
import { ZimbabweFlagStrip } from './ZimbabweFlagStrip';

interface PageLayoutProps {
  /** Page content */
  children: React.ReactNode;
  /** Show Zimbabwe flag strip (default: true) */
  showFlagStrip?: boolean;
  /** Maximum width (default: 'lg') */
  maxWidth?: ContainerProps['maxWidth'];
  /** Add padding (default: true) */
  padding?: boolean;
  /** Full width (no container) */
  fullWidth?: boolean;
  /** Background color */
  backgroundColor?: string;
}

/**
 * Main page layout component
 * Includes Zimbabwe flag strip and proper spacing
 */
export function PageLayout({
  children,
  showFlagStrip = true,
  maxWidth = 'lg',
  padding = true,
  fullWidth = false,
  backgroundColor,
}: PageLayoutProps) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: backgroundColor || 'background.default',
        // Add left padding to account for flag strip
        paddingLeft: showFlagStrip ? '8px' : 0,
      }}
    >
      {/* Zimbabwe flag strip */}
      {showFlagStrip && <ZimbabweFlagStrip />}

      {/* Page content */}
      {fullWidth ? (
        <Box sx={{ padding: padding ? 3 : 0 }}>{children}</Box>
      ) : (
        <Container
          maxWidth={maxWidth}
          sx={{
            paddingTop: padding ? 4 : 0,
            paddingBottom: padding ? 4 : 0,
          }}
        >
          {children}
        </Container>
      )}
    </Box>
  );
}

/**
 * Centered page layout (for login, etc.)
 */
export function CenteredPageLayout({
  children,
  maxWidth = 'sm',
}: Omit<PageLayoutProps, 'fullWidth' | 'padding'>) {
  return (
    <PageLayout maxWidth={maxWidth} padding={false}>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 3,
        }}
      >
        {children}
      </Box>
    </PageLayout>
  );
}

/**
 * 🇿🇼 Nyuchi Platform - Zimbabwe Flag Strip Component
 * "I am because we are" - 8px vertical flag strip
 */

import React from 'react';
import { Box } from '@mui/material';
import { zimbabweColors } from '@nyuchi/ubuntu';

interface ZimbabweFlagStripProps {
  /** Hide on mobile devices (default: false) */
  hideMobile?: boolean;
  /** Position (default: 'fixed') */
  position?: 'fixed' | 'absolute';
}

/**
 * Zimbabwe Flag Strip - 8px vertical strip on left side
 * Displays the four colors of the Zimbabwe flag
 *
 * Must appear on EVERY page of the platform
 */
export function ZimbabweFlagStrip({
  hideMobile = false,
  position = 'fixed'
}: ZimbabweFlagStripProps) {
  return (
    <Box
      sx={{
        position: position,
        left: 0,
        top: 0,
        width: '8px',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 9999,
        // Hide on mobile if requested
        ...(hideMobile && {
          '@media (max-width: 768px)': {
            display: 'none',
          },
        }),
      }}
      aria-label="Zimbabwe flag colors"
    >
      {/* Green - Agriculture, growth, fertility */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: zimbabweColors.green,
        }}
      />

      {/* Yellow - Mineral wealth, bright future */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: zimbabweColors.yellow,
        }}
      />

      {/* Red - Blood shed for independence, heritage */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: zimbabweColors.red,
        }}
      />

      {/* Black - The African people */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: zimbabweColors.black,
        }}
      />
    </Box>
  );
}

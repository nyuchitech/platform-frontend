/**
 * 🇿🇼 Nyuchi Platform - Zimbabwe Card Component
 * "I am because we are" - Card with Zimbabwe flag accent
 */

import React from 'react';
import { Card, CardProps, CardContent, CardHeader, Box } from '@mui/material';
import { zimbabweColors } from '@nyuchi/ubuntu';

interface ZimbabweCardProps extends CardProps {
  /** Accent color from Zimbabwe flag (default: green) */
  accentColor?: 'green' | 'yellow' | 'red' | 'black';
  /** Show flag accent bar (default: true) */
  showAccent?: boolean;
  /** Card header title */
  title?: string;
  /** Card header subtitle */
  subtitle?: string;
  /** Card header action */
  headerAction?: React.ReactNode;
}

/**
 * Card component with Zimbabwe flag color accent
 */
export function ZimbabweCard({
  accentColor = 'green',
  showAccent = true,
  title,
  subtitle,
  headerAction,
  children,
  ...props
}: ZimbabweCardProps) {
  const getAccentColor = () => {
    switch (accentColor) {
      case 'green':
        return zimbabweColors.green;
      case 'yellow':
        return zimbabweColors.yellow;
      case 'red':
        return zimbabweColors.red;
      case 'black':
        return zimbabweColors.black;
      default:
        return zimbabweColors.green;
    }
  };

  return (
    <Card
      {...props}
      sx={{
        position: 'relative',
        overflow: 'visible',
        ...props.sx,
      }}
    >
      {/* Zimbabwe flag accent bar */}
      {showAccent && (
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '4px',
            height: '100%',
            backgroundColor: getAccentColor(),
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,
          }}
        />
      )}

      {/* Card content with padding for accent bar */}
      <Box sx={{ paddingLeft: showAccent ? '8px' : 0 }}>
        {title && (
          <CardHeader
            title={title}
            subheader={subtitle}
            action={headerAction}
            titleTypography={{ variant: 'h6', fontFamily: 'Playfair Display, serif' }}
          />
        )}
        <CardContent>{children}</CardContent>
      </Box>
    </Card>
  );
}

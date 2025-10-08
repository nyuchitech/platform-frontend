/**
 * 🇿🇼 Nyuchi Platform - Pill Button Component
 * "I am because we are" - Pill-shaped buttons (rounded-full)
 */

import React from 'react';
import { Button, ButtonProps } from '@mui/material';

/**
 * Pill-shaped button component
 * All buttons in the platform MUST be pill-shaped (fully rounded)
 *
 * This is a core Zimbabwe design system requirement
 */
export function PillButton(props: ButtonProps) {
  return (
    <Button
      {...props}
      sx={{
        borderRadius: 9999, // Pill-shaped (fully rounded)
        textTransform: 'none',
        ...props.sx,
      }}
    />
  );
}

/**
 * Primary button (Zimbabwe Green)
 */
export function PrimaryButton(props: ButtonProps) {
  return <PillButton variant="contained" color="primary" {...props} />;
}

/**
 * Secondary button (Zimbabwe Yellow)
 */
export function SecondaryButton(props: ButtonProps) {
  return <PillButton variant="contained" color="secondary" {...props} />;
}

/**
 * Outlined button
 */
export function OutlinedButton(props: ButtonProps) {
  return <PillButton variant="outlined" color="primary" {...props} />;
}

/**
 * Text button
 */
export function TextButton(props: ButtonProps) {
  return <PillButton variant="text" color="primary" {...props} />;
}

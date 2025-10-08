/**
 * 🇿🇼 Nyuchi Platform - Ubuntu Banner Component
 * "I am because we are" - Display Ubuntu philosophy messages
 */

import React from 'react';
import { Alert, AlertTitle, AlertProps } from '@mui/material';
import { getUbuntuMessage, ubuntuMessages } from '@nyuchi/ubuntu';

interface UbuntuBannerProps extends Omit<AlertProps, 'severity'> {
  /** Ubuntu message context */
  messageType?: keyof typeof ubuntuMessages;
  /** Custom message (overrides messageType) */
  customMessage?: string;
  /** Custom philosophy text */
  customPhilosophy?: string;
  /** Show title (default: true) */
  showTitle?: boolean;
}

/**
 * Ubuntu philosophy banner component
 * Displays Ubuntu messages with appropriate styling
 */
export function UbuntuBanner({
  messageType = 'welcome',
  customMessage,
  customPhilosophy,
  showTitle = true,
  ...props
}: UbuntuBannerProps) {
  const ubuntuMsg = getUbuntuMessage(messageType);

  const message = customMessage || ubuntuMsg.message;
  const philosophy = customPhilosophy || ubuntuMsg.philosophy;

  // Map Ubuntu message types to MUI severity
  const getSeverity = (): AlertProps['severity'] => {
    switch (ubuntuMsg.type) {
      case 'success':
        return 'success';
      case 'error':
        return 'error';
      case 'loading':
        return 'info';
      case 'contribution':
      case 'collaboration':
        return 'success';
      default:
        return 'info';
    }
  };

  return (
    <Alert
      severity={getSeverity()}
      {...props}
      sx={{
        borderRadius: 2,
        ...props.sx,
      }}
    >
      {showTitle && philosophy && <AlertTitle>{philosophy}</AlertTitle>}
      {message}
    </Alert>
  );
}

/**
 * Welcome banner
 */
export function WelcomeBanner(props: Omit<UbuntuBannerProps, 'messageType'>) {
  return <UbuntuBanner messageType="welcome" {...props} />;
}

/**
 * Contribution success banner
 */
export function ContributionBanner(props: Omit<UbuntuBannerProps, 'messageType'>) {
  return <UbuntuBanner messageType="contentPublished" {...props} />;
}

/**
 * Error banner with Ubuntu philosophy
 */
export function ErrorBanner(props: Omit<UbuntuBannerProps, 'messageType'>) {
  return <UbuntuBanner messageType="error" {...props} />;
}

/**
 * Loading banner
 */
export function LoadingBanner(props: Omit<UbuntuBannerProps, 'messageType'>) {
  return <UbuntuBanner messageType="loading" {...props} />;
}

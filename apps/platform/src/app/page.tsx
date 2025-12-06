/**
 * Nyuchi Platform - Landing Page
 * Built with React Native Paper + Brand V5
 * Mobile-first responsive design
 * "I am because we are" - Ubuntu Philosophy
 */

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Text, Button, Card, useTheme, Surface } from 'react-native-paper';
import { useAuth } from '@/lib/auth-context';
import { useThemeMode } from '@/components/PaperProvider';
import { ZimbabweFlagStrip } from '@/components/ZimbabweFlagStrip';
import { nyuchiColors, spacing, borderRadius, shadows } from '@/theme/nyuchi-theme';

const communityFeatures = [
  {
    emoji: '👥',
    title: 'Community Directory',
    description: 'Discover and connect with African entrepreneurs and businesses.',
    href: '/community/directory',
  },
  {
    emoji: '✈️',
    title: 'Travel Directory',
    description: 'Explore travel businesses and destinations across Africa.',
    href: '/community/travel-directory',
  },
  {
    emoji: '🏆',
    title: 'Ubuntu Leaderboard',
    description: 'Celebrate community contributors and their impact.',
    href: '/community/leaderboard',
  },
  {
    emoji: '🤝',
    title: 'Get Involved',
    description: 'Join our community as a volunteer, partner, or contributor.',
    href: '/get-involved',
  },
];

function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}

export default function LandingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const theme = useTheme();
  const { isDark } = useThemeMode();
  const width = useWindowWidth();

  const isDesktop = width >= 768;
  const isTablet = width >= 480 && width < 768;
  const isMobile = width < 480;

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (user && !loading) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  const logoSrc = isDark
    ? 'https://assets.nyuchi.com/logos/nyuchi/Nyuchi_Africa_Logo_dark.svg'
    : 'https://assets.nyuchi.com/logos/nyuchi/Nyuchi_Africa_Logo_light.svg';

  return (
    <View style={[styles.container, webStyles.container as unknown as object]}>
      {!isMobile && <ZimbabweFlagStrip />}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Surface
          style={[
            styles.header,
            { backgroundColor: theme.colors.surface },
            isMobile && styles.headerMobile
          ]}
          elevation={0}
        >
          <View style={[styles.headerContent, isMobile && styles.headerContentMobile]}>
            <View style={styles.logoContainer}>
              <Image
                src={logoSrc}
                alt="Nyuchi Africa"
                width={isMobile ? 120 : 140}
                height={isMobile ? 34 : 40}
                style={{ objectFit: 'contain' }}
              />
            </View>

            <View style={[styles.headerButtons, isMobile && styles.headerButtonsMobile]}>
              <Link href="/sign-in" style={{ textDecoration: 'none' }}>
                <Button
                  mode="outlined"
                  style={styles.headerButton}
                  labelStyle={[styles.buttonLabel, isMobile && styles.buttonLabelMobile]}
                  contentStyle={[styles.buttonContent, isMobile && styles.buttonContentMobile]}
                  compact={isMobile}
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up" style={{ textDecoration: 'none' }}>
                <Button
                  mode="contained"
                  style={[styles.headerButton, { backgroundColor: nyuchiColors.sunsetDeep }]}
                  labelStyle={[styles.buttonLabel, styles.buttonLabelWhite, isMobile && styles.buttonLabelMobile]}
                  contentStyle={[styles.buttonContent, isMobile && styles.buttonContentMobile]}
                  compact={isMobile}
                >
                  Get Started
                </Button>
              </Link>
            </View>
          </View>
        </Surface>

        {/* Hero Section */}
        <View style={[styles.heroSection, { backgroundColor: nyuchiColors.navy }]}>
          <View style={[
            styles.heroContent,
            isDesktop && styles.heroContentDesktop,
            isMobile && styles.heroContentMobile
          ]}>
            {/* Text Content */}
            <View style={[
              styles.heroText,
              isDesktop && styles.heroTextDesktop,
              isMobile && styles.heroTextMobile
            ]}>
              <Text
                style={[
                  styles.heroTitle,
                  {
                    fontSize: isDesktop ? 48 : isTablet ? 36 : 28,
                    lineHeight: isDesktop ? 58 : isTablet ? 44 : 36,
                  },
                ]}
              >
                Platform for African Entrepreneurs
              </Text>

              <Text style={[styles.ubuntuTagline, isMobile && styles.ubuntuTaglineMobile]}>
                &quot;I am because we are&quot;
              </Text>

              <Text style={[styles.heroDescription, isMobile && styles.heroDescriptionMobile]}>
                Join a thriving community of African entrepreneurs. Connect, collaborate,
                and grow together with Ubuntu philosophy at our core.
              </Text>

              <View style={[styles.heroButtons, isMobile && styles.heroButtonsMobile]}>
                <Link href="/sign-up" style={{ textDecoration: 'none', width: isMobile ? '100%' : 'auto' }}>
                  <Button
                    mode="contained"
                    style={[styles.ctaButton, { backgroundColor: nyuchiColors.green }, isMobile && styles.ctaButtonMobile]}
                    labelStyle={[styles.buttonLabel, styles.buttonLabelWhite]}
                    contentStyle={[styles.ctaButtonContent, isMobile && styles.ctaButtonContentMobile]}
                    icon="arrow-right"
                  >
                    Join the Community
                  </Button>
                </Link>
                <Link href="/community" style={{ textDecoration: 'none', width: isMobile ? '100%' : 'auto' }}>
                  <Button
                    mode="outlined"
                    style={[styles.ctaButton, styles.outlinedButton, isMobile && styles.ctaButtonMobile]}
                    labelStyle={[styles.buttonLabel, styles.buttonLabelWhite]}
                    contentStyle={[styles.ctaButtonContent, isMobile && styles.ctaButtonContentMobile]}
                  >
                    Explore Community
                  </Button>
                </Link>
              </View>
            </View>

            {/* Hero Image - Desktop only */}
            {isDesktop && (
              <View style={styles.heroImageContainer}>
                <View style={styles.heroImageWrapper}>
                  <Image
                    src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=800"
                    alt="Victoria Falls, Zimbabwe - The Smoke That Thunders"
                    width={500}
                    height={400}
                    style={{
                      objectFit: 'cover',
                      borderRadius: borderRadius.card,
                    }}
                    priority
                  />
                  <View style={styles.imageCaption}>
                    <Text style={styles.captionText}>
                      Victoria Falls - Mosi-oa-Tunya &quot;The Smoke That Thunders&quot;
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>

        {/* Community Features Section */}
        <View style={[
          styles.featuresSection,
          { backgroundColor: theme.colors.background },
          isMobile && styles.featuresSectionMobile
        ]}>
          <View style={[styles.sectionHeader, isMobile && styles.sectionHeaderMobile]}>
            <Text style={[styles.sectionLabel, { color: nyuchiColors.green }]}>
              UBUNTU PHILOSOPHY
            </Text>
            <Text style={[
              styles.sectionTitle,
              { color: theme.colors.onBackground },
              isMobile && styles.sectionTitleMobile
            ]}>
              Community Features - Always Free
            </Text>
            <Text style={[styles.sectionDescription, { color: theme.colors.onSurfaceVariant }]}>
              Explore our community without any barriers. Because we believe in collective growth.
            </Text>
          </View>

          <View style={[
            styles.featuresGrid,
            isDesktop && styles.featuresGridDesktop,
            isTablet && styles.featuresGridTablet
          ]}>
            {communityFeatures.map((feature) => (
              <Link
                key={feature.title}
                href={feature.href}
                style={{
                  textDecoration: 'none',
                  flex: isDesktop ? 1 : undefined,
                  width: isTablet ? '48%' : '100%',
                }}
              >
                <Pressable>
                  {({ pressed }) => (
                    <Card
                      style={[
                        styles.featureCard,
                        {
                          backgroundColor: theme.colors.surface,
                          opacity: pressed ? 0.9 : 1,
                        },
                      ]}
                      mode="elevated"
                    >
                      <Card.Content style={[styles.featureCardContent, isMobile && styles.featureCardContentMobile]}>
                        <View style={styles.featureIconContainer}>
                          <Text style={styles.featureEmoji}>{feature.emoji}</Text>
                        </View>
                        <Text
                          style={[styles.featureTitle, { color: theme.colors.onSurface }]}
                        >
                          {feature.title}
                        </Text>
                        <Text
                          style={[styles.featureDescription, { color: theme.colors.onSurfaceVariant }]}
                        >
                          {feature.description}
                        </Text>
                        <View style={[styles.freeBadge, { backgroundColor: nyuchiColors.green + '20' }]}>
                          <Text style={[styles.freeBadgeText, { color: nyuchiColors.green }]}>
                            Always Free
                          </Text>
                        </View>
                      </Card.Content>
                    </Card>
                  )}
                </Pressable>
              </Link>
            ))}
          </View>
        </View>

        {/* CTA Section */}
        <View style={[
          styles.ctaSection,
          { backgroundColor: nyuchiColors.navy },
          isMobile && styles.ctaSectionMobile
        ]}>
          <Text style={[styles.ctaSectionTitle, isMobile && styles.ctaSectionTitleMobile]}>
            Ready to grow with us?
          </Text>
          <Text style={styles.ctaSectionDescription}>
            Create your free account and start connecting with the African entrepreneur community.
          </Text>
          <Link href="/sign-up" style={{ textDecoration: 'none', width: isMobile ? '100%' : 'auto' }}>
            <Button
              mode="contained"
              style={[styles.ctaButton, { backgroundColor: nyuchiColors.sunsetDeep }, isMobile && styles.ctaButtonMobile]}
              labelStyle={[styles.buttonLabel, styles.buttonLabelWhite]}
              contentStyle={[styles.ctaButtonContent, isMobile && styles.ctaButtonContentMobile]}
            >
              Create Free Account
            </Button>
          </Link>
        </View>

        {/* Footer */}
        <Surface style={[styles.footer, { backgroundColor: theme.colors.surface }]} elevation={0}>
          <Text style={[styles.footerText, { color: theme.colors.onSurfaceVariant }]}>
            &copy; {new Date().getFullYear()} Nyuchi Africa. Built with Ubuntu philosophy.
          </Text>
          <Text style={[styles.footerTagline, { color: nyuchiColors.sunsetDeep }]}>
            &quot;I am because we are&quot;
          </Text>
        </Surface>
      </ScrollView>
    </View>
  );
}

// Web-specific styles that extend RN styles
const webStyles = {
  container: {
    minHeight: '100vh',
  } as React.CSSProperties,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: nyuchiColors.light.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },

  // Header
  header: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: nyuchiColors.light.border,
  },
  headerMobile: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: 1200,
    marginHorizontal: 'auto',
    width: '100%',
  },
  headerContentMobile: {
    gap: spacing.sm,
  },
  logoContainer: {
    height: 40,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  headerButtonsMobile: {
    gap: spacing.xs,
  },
  headerButton: {
    borderRadius: borderRadius.button,
  },
  buttonLabel: {
    fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif',
    fontWeight: '600',
    fontSize: 14,
  },
  buttonLabelMobile: {
    fontSize: 12,
  },
  buttonLabelWhite: {
    color: '#FFFFFF',
  },
  buttonContent: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  buttonContentMobile: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },

  // Hero Section
  heroSection: {
    paddingVertical: spacing['3xl'],
    paddingHorizontal: spacing.lg,
  },
  heroContent: {
    maxWidth: 1200,
    marginHorizontal: 'auto',
    width: '100%',
  },
  heroContentDesktop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['2xl'],
  },
  heroContentMobile: {
    paddingHorizontal: 0,
  },
  heroText: {
    flex: 1,
    alignItems: 'center',
  },
  heroTextDesktop: {
    alignItems: 'flex-start',
  },
  heroTextMobile: {
    paddingHorizontal: spacing.xs,
  },
  heroTitle: {
    fontFamily: 'Noto Serif, Georgia, serif',
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  ubuntuTagline: {
    fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif',
    fontSize: 20,
    fontStyle: 'italic',
    color: nyuchiColors.sunsetDeep,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  ubuntuTaglineMobile: {
    fontSize: 18,
  },
  heroDescription: {
    fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif',
    fontSize: 16,
    lineHeight: 24,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: spacing.xl,
    maxWidth: 500,
    textAlign: 'center',
  },
  heroDescriptionMobile: {
    fontSize: 14,
    lineHeight: 22,
    paddingHorizontal: spacing.sm,
  },
  heroButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    justifyContent: 'center',
  },
  heroButtonsMobile: {
    flexDirection: 'column',
    width: '100%',
    gap: spacing.sm,
  },
  ctaButton: {
    borderRadius: borderRadius.button,
  },
  ctaButtonMobile: {
    width: '100%',
  },
  ctaButtonContent: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
  },
  ctaButtonContentMobile: {
    paddingVertical: spacing.md,
  },
  outlinedButton: {
    borderColor: '#FFFFFF',
    borderWidth: 1,
  },
  heroImageContainer: {
    flex: 1,
    alignItems: 'center',
  },
  heroImageWrapper: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: borderRadius.card,
  },
  imageCaption: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.md,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  captionText: {
    fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
  },

  // Features Section
  featuresSection: {
    paddingVertical: spacing['3xl'],
    paddingHorizontal: spacing.lg,
  },
  featuresSectionMobile: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing['2xl'],
  },
  sectionHeader: {
    alignItems: 'center',
    marginBottom: spacing['2xl'],
    maxWidth: 600,
    marginHorizontal: 'auto',
  },
  sectionHeaderMobile: {
    marginBottom: spacing.xl,
  },
  sectionLabel: {
    fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontFamily: 'Noto Serif, Georgia, serif',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  sectionTitleMobile: {
    fontSize: 24,
    lineHeight: 32,
  },
  sectionDescription: {
    fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  featuresGrid: {
    maxWidth: 1200,
    marginHorizontal: 'auto',
    width: '100%',
    gap: spacing.lg,
  },
  featuresGridDesktop: {
    flexDirection: 'row',
  },
  featuresGridTablet: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    borderRadius: borderRadius.card,
    marginBottom: spacing.md,
    ...shadows.card,
  },
  featureCardContent: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  featureCardContentMobile: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  featureIconContainer: {
    marginBottom: spacing.md,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: nyuchiColors.green + '15',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureEmoji: {
    fontSize: 28,
  },
  featureTitle: {
    fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  featureDescription: {
    fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  freeBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.badge,
  },
  freeBadgeText: {
    fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif',
    fontSize: 12,
    fontWeight: '600',
  },

  // CTA Section
  ctaSection: {
    paddingVertical: spacing['3xl'],
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
  ctaSectionMobile: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing['2xl'],
  },
  ctaSectionTitle: {
    fontFamily: 'Noto Serif, Georgia, serif',
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  ctaSectionTitleMobile: {
    fontSize: 24,
    lineHeight: 32,
  },
  ctaSectionDescription: {
    fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif',
    fontSize: 16,
    lineHeight: 24,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: spacing.xl,
    textAlign: 'center',
    maxWidth: 500,
  },

  // Footer
  footer: {
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: nyuchiColors.light.border,
  },
  footerText: {
    fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif',
    fontSize: 14,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  footerTagline: {
    fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif',
    fontSize: 14,
    fontStyle: 'italic',
  },
});

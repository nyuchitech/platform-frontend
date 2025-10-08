/**
 * 🇿🇼 Nyuchi Platform - Dashboard Home
 * Shopify-style admin interface with proper spacing
 */

'use client';

import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
} from '@mui/material';
import {
  Business as DirectoryIcon,
  Article as ContentIcon,
  EmojiEvents as UbuntuIcon,
  People as PeopleIcon,
} from '@mui/icons-material';
import { useAuth } from '../../lib/auth-context';
import { nyuchiColors } from '../../theme/zimbabwe-theme';

export default function DashboardPage() {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Directory Listings',
      value: '0',
      icon: DirectoryIcon,
      color: nyuchiColors.sunsetOrange,
      description: 'Active businesses',
    },
    {
      title: 'Content',
      value: '0',
      icon: ContentIcon,
      color: nyuchiColors.charcoal,
      description: 'Published articles',
    },
    {
      title: 'Members',
      value: '1',
      icon: PeopleIcon,
      color: nyuchiColors.zimbabweGreen,
      description: 'Community members',
    },
    {
      title: 'Ubuntu Score',
      value: user?.ubuntu_score?.toString() || '0',
      icon: UbuntuIcon,
      color: nyuchiColors.zimbabweYellow,
      description: 'Your contribution',
    },
  ];

  return (
    <Box sx={{ p: 4 }}>
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            mb: 0.5,
            color: 'text.primary',
          }}
        >
          Welcome back, {user?.email?.split('@')[0]}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's what's happening with your platform today
        </Typography>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Grid item xs={12} sm={6} lg={3} key={stat.title}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  borderRadius: 2,
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{
                          color: 'text.secondary',
                          fontWeight: 500,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          fontSize: '0.75rem',
                        }}
                      >
                        {stat.title}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 1.5,
                        bgcolor: `${stat.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon sx={{ color: stat.color, fontSize: 20 }} />
                    </Box>
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      mb: 0.5,
                      color: 'text.primary',
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Content Grid */}
      <Grid container spacing={3}>
        {/* Quick Actions */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              height: '100%',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Quick Actions
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    bgcolor: nyuchiColors.sunsetOrange,
                  }}
                />
                <Typography variant="body2" color="text.secondary">
                  Add a new business to the directory
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    bgcolor: nyuchiColors.sunsetOrange,
                  }}
                />
                <Typography variant="body2" color="text.secondary">
                  Submit content or article
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    bgcolor: nyuchiColors.sunsetOrange,
                  }}
                />
                <Typography variant="body2" color="text.secondary">
                  View Ubuntu leaderboard
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    bgcolor: nyuchiColors.sunsetOrange,
                  }}
                />
                <Typography variant="body2" color="text.secondary">
                  Update your profile
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Ubuntu Philosophy */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              height: '100%',
              bgcolor: nyuchiColors.charcoal,
              color: nyuchiColors.white,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Ubuntu Philosophy
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontStyle: 'italic',
                mb: 2,
                fontFamily: 'Playfair Display',
                opacity: 0.95,
              }}
            >
              "I am because we are"
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.85, lineHeight: 1.6 }}>
              Your contributions strengthen our community. Together, we support African entrepreneurship and innovation. Every action you take helps others thrive.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

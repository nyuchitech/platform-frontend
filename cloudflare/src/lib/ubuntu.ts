/**
 * 🇿🇼 Ubuntu utilities
 */

export const UBUNTU_POINTS = {
  content_published: 100,
  listing_created: 50,
  listing_verified: 75,
  community_help: 25,
  review_completed: 50,
  collaboration: 150,
  knowledge_sharing: 75,
};

export type ContributionType = keyof typeof UBUNTU_POINTS;

export function calculateUbuntuLevel(score: number): string {
  if (score >= 5000) return 'Ubuntu Champion';
  if (score >= 2000) return 'Community Leader';
  if (score >= 500) return 'Contributor';
  return 'Newcomer';
}

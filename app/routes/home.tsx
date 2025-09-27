import { Link } from "react-router";
import { Card, Text, BlockStack, InlineStack, Button, Badge, Page, Icon } from '@shopify/polaris';
import { PersonIcon, AlertCircleIcon, ChartVerticalIcon } from '@shopify/polaris-icons';

export function meta() {
  return [
    { title: "🇿🇼 Nyuchi Africa Platform - Ubuntu Dashboard" },
    { name: "description", content: "Your Ubuntu-driven platform for African business success" },
  ];
}

export default function Home() {
  return (
    <Page title="🇿🇼 Nyuchi Africa Platform">
      <BlockStack gap="500">
        <Card>
          <BlockStack gap="300">
            <Text variant="headingLg" as="h1" alignment="center">
              Welcome to Nyuchi Africa Platform
            </Text>
            <Text variant="bodyLg" as="p" tone="subdued" alignment="center">
              "I am because we are" - Building Africa's integrated business ecosystem
            </Text>
            <InlineStack align="center" gap="300">
              <Link to="/dashboard">
                <Button variant="primary" size="large">
                  Enter Dashboard
                </Button>
              </Link>
              <Link to="/dashboard/community">
                <Button size="large">
                  Community Platform (Always Free)
                </Button>
              </Link>
            </InlineStack>
          </BlockStack>
        </Card>

        {/* Platform Overview */}
        <InlineStack gap="400" wrap={false}>
          <Card>
            <BlockStack gap="200">
              <InlineStack align="space-between">
                <Text variant="headingMd" as="h3">Community Members</Text>
                <Icon source={PersonIcon} tone="base" />
              </InlineStack>
              <Text variant="heading2xl" as="span">1,247</Text>
              <Badge>Growing daily</Badge>
            </BlockStack>
          </Card>

          <Card>
            <BlockStack gap="200">
              <InlineStack align="space-between">
                <Text variant="headingMd" as="h3">Ubuntu Score</Text>
                <Icon source={AlertCircleIcon} tone="base" />
              </InlineStack>
              <Text variant="heading2xl" as="span">96%</Text>
              <Badge tone="success">Excellent health</Badge>
            </BlockStack>
          </Card>

          <Card>
            <BlockStack gap="200">
              <InlineStack align="space-between">
                <Text variant="headingMd" as="h3">Success Stories</Text>
                <Icon source={ChartVerticalIcon} tone="base" />
              </InlineStack>
              <Text variant="heading2xl" as="span">342</Text>
              <Badge tone="info">Inspiring growth</Badge>
            </BlockStack>
          </Card>
        </InlineStack>

        {/* Platform Features */}
        <Card>
          <BlockStack gap="400">
            <Text variant="headingLg" as="h2">Platform Features</Text>
            
            <InlineStack gap="400">
              <Card>
                <BlockStack gap="300">
                  <Text variant="headingMd" as="h3">🌍 Community Platform</Text>
                  <Text variant="bodyMd" as="p" tone="subdued">
                    Connect, collaborate, and grow with African entrepreneurs. Always free through Ubuntu principles.
                  </Text>
                  <Link to="/dashboard/community">
                    <Button>
                      Access Community (Always Free)
                    </Button>
                  </Link>
                </BlockStack>
              </Card>

              <Card>
                <BlockStack gap="300">
                  <Text variant="headingMd" as="h3">🚀 Business Tools</Text>
                  <Text variant="bodyMd" as="p" tone="subdued">
                    Travel platform, event management, email marketing, and SEO tools for your business.
                  </Text>
                  <Link to="/dashboard">
                    <Button variant="primary">
                      Explore Tools
                    </Button>
                  </Link>
                </BlockStack>
              </Card>

              <Card>
                <BlockStack gap="300">
                  <Text variant="headingMd" as="h3">🤝 Ubuntu AI</Text>
                  <Text variant="bodyMd" as="p" tone="subdued">
                    AI assistant focused on community benefit and collaborative business success.
                  </Text>
                  <Button>
                    Chat with Ubuntu AI
                  </Button>
                </BlockStack>
              </Card>
            </InlineStack>
          </BlockStack>
        </Card>

        {/* Ubuntu Philosophy */}
        <Card>
          <BlockStack gap="300">
            <Text variant="headingLg" as="h2" alignment="center">
              Ubuntu Philosophy
            </Text>
            <Text variant="bodyLg" as="p" alignment="center">
              "I am because we are"
            </Text>
            <Text variant="bodyMd" as="p" alignment="center" tone="subdued">
              Our platform is built on Ubuntu principles - your success strengthens our entire community.
              The community platform will always remain free because collective growth benefits everyone.
            </Text>
          </BlockStack>
        </Card>
      </BlockStack>
    </Page>
  );
}

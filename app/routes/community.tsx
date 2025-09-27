import { Page, Card, Text, BlockStack, InlineStack, Button, Badge, Icon, Layout, IndexTable, useIndexResourceState } from '@shopify/polaris';
import { PersonIcon, HeartIcon, ChartVerticalIcon, ChatIcon } from '@shopify/polaris-icons';

export function meta() {
  return [
    { title: "Community - Nyuchi Africa Platform" },
    { name: "description", content: "Ubuntu-driven community platform - always free" },
  ];
}

export default function CommunityDashboard() {
  // Sample community data - Shopify Admin IndexTable format
  const communityMembers = [
    {
      id: '1',
      name: 'Tendai Mukamuri',
      industry: 'Tech Entrepreneur',
      location: 'Harare, Zimbabwe',
      ubuntuScore: 94,
      status: 'Active',
    },
    {
      id: '2',
      name: 'Amara Okafor',
      industry: 'Fashion Designer',
      location: 'Lagos, Nigeria',
      ubuntuScore: 87,
      status: 'Active',
    },
    {
      id: '3',
      name: 'Kofi Asante',
      industry: 'Agritech Founder',
      location: 'Accra, Ghana',
      ubuntuScore: 92,
      status: 'Online',
    },
  ];

  const discussions = [
    {
      id: 'd1',
      topic: 'Cross-border Payment Solutions for African SMEs',
      author: 'Tendai M.',
      replies: 12,
      lastActivity: '2 hours ago',
    },
    {
      id: 'd2',
      topic: 'Sustainable Fashion Supply Chains in West Africa',
      author: 'Amara O.',
      replies: 8,
      lastActivity: '4 hours ago',
    },
  ];

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(communityMembers);

  return (
    <Page 
      title="🌍 Community Platform"
      subtitle="Ubuntu-driven community platform - always free"
      primaryAction={{
        content: 'Start New Discussion',
        onAction: () => console.log('New discussion'),
      }}
      secondaryActions={[
        { content: 'Share Success Story', onAction: () => {} },
        { content: 'Find Collaborators', onAction: () => {} },
      ]}
    >
      <Layout>
        <Layout.Section>
          <BlockStack gap="500">
            {/* Ubuntu Community Banner */}
            <Card>
              <BlockStack gap="300">
                <InlineStack align="space-between">
                  <div>
                    <Text variant="headingLg" as="h2">
                      "I am because we are"
                    </Text>
                    <Text variant="bodyMd" as="p" tone="subdued">
                      Building Africa together through Ubuntu principles
                    </Text>
                  </div>
                  <Badge tone="success" size="large">Always Free</Badge>
                </InlineStack>
              </BlockStack>
            </Card>

            {/* Community Stats */}
            <InlineStack gap="400" wrap={false}>
              <Card>
                <BlockStack gap="200">
                  <InlineStack align="space-between">
                    <Text variant="headingMd" as="h3">Active Members</Text>
                    <Icon source={PersonIcon} tone="base" />
                  </InlineStack>
                  <Text variant="heading2xl" as="span">1,247</Text>
                  <Badge tone="info">+24 this week</Badge>
                </BlockStack>
              </Card>

              <Card>
                <BlockStack gap="200">
                  <InlineStack align="space-between">
                    <Text variant="headingMd" as="h3">Ubuntu Score</Text>
                    <Icon source={HeartIcon} tone="base" />
                  </InlineStack>
                  <Text variant="heading2xl" as="span">96%</Text>
                  <Badge tone="success">Excellent health</Badge>
                </BlockStack>
              </Card>
            </InlineStack>

            {/* Recent Discussions - Shopify Admin IndexTable */}
            <Card>
              <BlockStack gap="400">
                <InlineStack align="space-between">
                  <Text variant="headingLg" as="h2">Recent Discussions</Text>
                  <Button>View All</Button>
                </InlineStack>
                
                <IndexTable
                  resourceName={{
                    singular: 'discussion',
                    plural: 'discussions',
                  }}
                  itemCount={discussions.length}
                  headings={[
                    { title: 'Topic' },
                    { title: 'Author' },
                    { title: 'Replies' },
                    { title: 'Last Activity' },
                  ]}
                  selectable={false}
                >
                  {discussions.map((discussion, index) => (
                    <IndexTable.Row
                      id={discussion.id}
                      key={discussion.id}
                      position={index}
                    >
                      <IndexTable.Cell>
                        <Text variant="bodyMd" as="span" fontWeight="semibold">
                          {discussion.topic}
                        </Text>
                      </IndexTable.Cell>
                      <IndexTable.Cell>{discussion.author}</IndexTable.Cell>
                      <IndexTable.Cell>
                        <Badge>{`${discussion.replies} replies`}</Badge>
                      </IndexTable.Cell>
                      <IndexTable.Cell>{discussion.lastActivity}</IndexTable.Cell>
                    </IndexTable.Row>
                  ))}
                </IndexTable>
              </BlockStack>
            </Card>

            {/* Community Members - Shopify Admin IndexTable */}
            <Card>
              <BlockStack gap="400">
                <InlineStack align="space-between">
                  <Text variant="headingLg" as="h2">Active Community Members</Text>
                  <Button>View All Members</Button>
                </InlineStack>
                
                <IndexTable
                  resourceName={{
                    singular: 'member',
                    plural: 'members',
                  }}
                  itemCount={communityMembers.length}
                  selectedItemsCount={
                    allResourcesSelected ? 'All' : selectedResources.length
                  }
                  onSelectionChange={handleSelectionChange}
                  headings={[
                    { title: 'Name' },
                    { title: 'Industry' },
                    { title: 'Location' },
                    { title: 'Ubuntu Score' },
                    { title: 'Status' },
                  ]}
                  bulkActions={[
                    {
                      content: 'Send Message',
                      onAction: () => console.log('Send message to selected'),
                    },
                  ]}
                >
                  {communityMembers.map((member, index) => (
                    <IndexTable.Row
                      id={member.id}
                      key={member.id}
                      selected={selectedResources.includes(member.id)}
                      position={index}
                    >
                      <IndexTable.Cell>
                        <Text variant="bodyMd" as="span" fontWeight="semibold">
                          {member.name}
                        </Text>
                      </IndexTable.Cell>
                      <IndexTable.Cell>{member.industry}</IndexTable.Cell>
                      <IndexTable.Cell>{member.location}</IndexTable.Cell>
                      <IndexTable.Cell>
                        <Badge tone="info">{`${member.ubuntuScore} points`}</Badge>
                      </IndexTable.Cell>
                      <IndexTable.Cell>
                        <Badge tone={member.status === 'Active' ? 'success' : 'info'}>
                          {member.status}
                        </Badge>
                      </IndexTable.Cell>
                    </IndexTable.Row>
                  ))}
                </IndexTable>
              </BlockStack>
            </Card>
          </BlockStack>
        </Layout.Section>

        <Layout.Section variant="oneThird">
          <BlockStack gap="500">
            {/* Ubuntu Actions */}
            <Card>
              <BlockStack gap="400">
                <Text variant="headingMd" as="h2">Ubuntu Actions</Text>
                <BlockStack gap="200">
                  <Button variant="primary" fullWidth>
                    Start Discussion
                  </Button>
                  <Button fullWidth>
                    Share Success Story
                  </Button>
                  <Button fullWidth>
                    Offer Mentorship
                  </Button>
                </BlockStack>
              </BlockStack>
            </Card>

            {/* Community Impact */}
            <Card>
              <BlockStack gap="400">
                <Text variant="headingMd" as="h2">Community Impact</Text>
                <BlockStack gap="200">
                  <InlineStack align="space-between">
                    <Text variant="bodyMd" as="span">Connections Made</Text>
                    <Text variant="bodyMd" as="span" fontWeight="semibold">2,847</Text>
                  </InlineStack>
                  <InlineStack align="space-between">
                    <Text variant="bodyMd" as="span">Funding Facilitated</Text>
                    <Text variant="bodyMd" as="span" fontWeight="semibold">$4.2M</Text>
                  </InlineStack>
                </BlockStack>
              </BlockStack>
            </Card>
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
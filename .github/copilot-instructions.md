# 🇿🇼 Nyuchi Africa Platform - GitHub Copilot Instructions# Nyuchi Africa Platform - AI Coding Assistant Instructions



## Project Overview## 🌍 Platform Philosophy: Ubuntu-First Development

Nyuchi Africa Platform is an integrated business ecosystem for African entrepreneurs, built with **Remix (Re## Core Framework Stack - Remix + Polaris React Standards (Shopify Admin Design)

### Shopify Admin Layout Patterns

#### Main Application Layout (Frame Structure)
```tsx
<Frame
  topBar={<TopBar showNavigationToggle />}
  navigation={<Navigation location={pathname}>...</Navigation>}
  showMobileNavigation={false}
  onNavigationDismiss={() => {}}
>
  <Page
    title="Page Title"
    subtitle="Page description"
    breadcrumbs={[{content: 'Home', url: '/'}]}
    primaryAction={{content: 'Primary Action', onAction: () => {}}}
    secondaryActions={[{content: 'Secondary', onAction: () => {}}]}
  >
    <Layout>
      <Layout.Section>
        <Card>
          <BlockStack gap="400">
            <Text variant="headingLg" as="h2">Card Title</Text>
            <Text variant="bodyMd" as="p">Card content</Text>
          </BlockStack>
        </Card>
      </Layout.Section>
    </Layout>
  </Page>
</Frame>
```

#### Navigation Structure
```tsx
<Navigation location={pathname}>
  <Navigation.Section
    items={[
      {
        label: 'Dashboard',
        icon: HomeIcon,
        url: '/dashboard',
        selected: pathname === '/dashboard',
      }
    ]}
  />
  <Navigation.Section
    title="Business Tools"
    items={[...]}
  />
</Navigation>
```

#### Data Tables (Shopify Admin Style)
```tsx
<IndexTable
  resourceName={{singular: 'member', plural: 'members'}}
  itemCount={members.length}
  headings={[
    {title: 'Name'},
    {title: 'Location'},
    {title: 'Status'},
  ]}
  selectable
>
  {members.map((member, index) => (
    <IndexTable.Row
      id={member.id}
      key={member.id}
      selected={selectedMembers.includes(member.id)}
      position={index}
    >
      <IndexTable.Cell>{member.name}</IndexTable.Cell>
      <IndexTable.Cell>{member.location}</IndexTable.Cell>
      <IndexTable.Cell><Badge>{member.status}</Badge></IndexTable.Cell>
    </IndexTable.Row>
  ))}
</IndexTable>
```emix (React Router 7) + Shopify Polaris React (Shopify Admin Layout)

- **Server Architecture**: Remix with React Router 7 for routing, SSR, and data loading
- **UI Framework**: Shopify Polaris React components ONLY - mimic Shopify Admin design patterns
- **Layout Pattern**: Use Frame, Navigation, TopBar, and Page components exactly like Shopify Admin
- **Navigation**: Implement sidebar navigation with sections, badges, and proper hierarchy
- **Spacing**: Use Polaris spacing tokens: `gap="400"`, `padding="400"`, `insetBlockStart="400"`
- **Typography**: Use Polaris text variants: `variant="headingLg"`, `variant="bodyMd"`, etc.
- **Colors**: Use Polaris semantic colors and surface tokens for consistent Shopify Admin feel
- **Data Tables**: Use Polaris DataTable, IndexTable, and ResourceList for data display
- **Cards**: Use Polaris Card component with proper sectioning and actions
- **Forms**: Use Polaris form components (TextField, Select, Checkbox, etc.)
- **Modals**: Use Polaris Modal, Sheet, and Popover components
- **Page Structure**: Every page should use Page component with breadcrumbs, actions, and proper titles
- **Routing**: Use Remix file-based routing with React Router 7
- **Data Loading**: Use Remix loaders and actions for SSR data fetching

// ❌ Avoid - Custom CSS, Chakra UI, Emotion, Framer Motion, Next.js, Material UI, or any non-Polaris componentsShopify Polaris React** and Ubuntu philosophy ("I am because we are").

This codebase embodies the Ubuntu philosophy **"I am because we are"** through its technical architecture. Every feature and component prioritizes community benefit over individual optimization. When making code changes, always consider:

## Core UI Framework - Chakra UI Standards

1. **Community features are ALWAYS free** - Any auth middleware must skip `/api/community/*` routes

### ✅ ALWAYS Use Chakra UI Defaults2. **Ubuntu principles enforcement** - All requests flow through `UbuntuMiddleware` first

- **Spacing**: Use Chakra UI spacing tokens (0-96): `p={4}`, `m={6}`, `gap={8}`3. **African business context** - Code optimizations target African infrastructure and cultural contexts

- **Sizing**: Use Chakra UI size tokens: `w={8}`, `h={12}`, `maxW="container.xl"`

- **Typography**: Use Chakra UI text sizes: `fontSize="lg"`, `fontWeight="semibold"`## 🏗️ Simplified Multi-Worker Architecture

- **Colors**: Use semantic color tokens: `bg="gray.50"`, `color="green.500"`

- **Border Radius**: Use Chakra tokens: `borderRadius="md"`, `borderRadius="xl"`### Core Routing Pattern

- **Shadows**: Use Chakra shadows: `shadow="md"`, `shadow="lg"````typescript

// workers/dispatcher/src/index.ts - Central routing logic

### Component Usage Patternsrouter.all('*', UbuntuMiddleware); // Applied to ALL requests first

```tsxrouter.all('/api/community/*', /* NO AUTH - always free */);

// ✅ Correct - Using Chakra UI defaultsrouter.all('/api/travel/*', AuthMiddleware, /* route to Travel worker */);

<Box p={6} bg="white" borderRadius="xl" shadow="md">```

  <Heading size="lg" mb={4}>Title</Heading>

  <Text color="gray.600" fontSize="md">Content</Text>### Worker Structure

### Worker Structure
- **Dispatcher Worker**: ✅ Main router at `workers/dispatcher/` - fully configured with package.json
- **Legacy Platform App**: ❌ DEPRECATED `workers/platform-app/` - OLD Chakra UI version, DO NOT USE
- **Legacy Next.js App**: ❌ DEPRECATED `apps/platform/` - OLD Next.js version, DO NOT USE
- **New Remix App**: ✅ Remix (React Router 7) dashboard at `apps/remix-platform/` - NEW Remix + Polaris React version
- **Community Worker**: ✅ Always-free platform at `workers/community/` - fully configured
- **Travel Worker**: ✅ Travel platform at `workers/travel-platform/` - fully configured

<div style={{padding: '24px', backgroundColor: 'white'}}>

  <h2 style={{marginBottom: '16px'}}>Title</h2>### External Products (Separate Repositories)

</div>- **MailSense**: https://github.com/nyuchitech/mailsense - Email marketing automation

```- **Event Widget**: https://github.com/nyuchitech/event-widget - Event management system  

- **SEO Manager**: https://github.com/nyuchitech/seo-manager - SEO optimization tools

### Layout Components (Always Use These)

- `Box` - Base container with Chakra props### Critical Integration Points

- `Flex` - Flexbox with Chakra spacing/alignment- All workers share `NY_PLATFORM_DB` database with `tenant_id` isolation

- `Grid`, `GridItem` - CSS Grid with Chakra responsive patterns- Ubuntu context flows through `X-Ubuntu-*` headers between workers

- `VStack`, `HStack` - Vertical/horizontal stacks with spacing- Middleware chain: Ubuntu → Auth → Metrics → CORS → ErrorHandler

- `Container` - Max-width containers with responsive breakpoints

- `Spacer` - Flexible spacing in flex layouts## 🚀 Development Commands & Workflows



### UI Components (Prefer Chakra Defaults)### Standard Development Flow

- `Button` - Use `colorScheme`, `size`, `variant` props```bash

- `Card`, `CardBody` - Structured content containersnpm run dev:dispatcher     # ✅ Start dispatcher (fully configured)

### Standard Development Flow

npm run dev:dispatcher     # ✅ Start dispatcher (fully configured)
npm run dev:platform-app   # ❌ DEPRECATED - Legacy Chakra UI app, DO NOT USE
npm run dev:platform       # ❌ DEPRECATED - Legacy Next.js app, DO NOT USE
npm run dev:remix          # ✅ Start NEW Remix (React Router 7) + Polaris dashboard
npm run dev:community      # ✅ Start community platform (fully configured)
npm run dev:travel         # ✅ Start travel platform (fully configured)
npm run dev                # ✅ Starts all core workers
npm run build:dispatcher   # ✅ Build dispatcher worker
npm run build:platform-app # ❌ DEPRECATED - Legacy app, DO NOT USE
npm run build:platform     # ❌ DEPRECATED - Legacy Next.js app, DO NOT USE
npm run build:remix        # ✅ Build NEW Remix + Polaris app
npm run build:community    # ✅ Build community worker

```tsxnpm run build:travel       # ✅ Build travel worker

// Primary colors from theme```

colors: {

  green: { 500: '#00A651' },    // Zimbabwe green### Database Operations

  yellow: { 500: '#FDD116' },  // Zimbabwe yellow```bash

  red: { 500: '#EF3340' },     // Zimbabwe rednpm run db:migrate         # ✅ Migrate both ny-platform-db and ny-auth-db

  // Use semantic tokensnpm run db:seed            # ⚠️ References scripts that don't exist yet

  bg="gray.50"         // Light backgrounds```

  color="gray.800"     // Dark text

}### Ubuntu-Specific Commands

``````bash

# ⚠️ These scripts are referenced in package.json but don't exist yet:

### Responsive Design (Use Chakra Breakpoints)npm run ubuntu:metrics     # Needs scripts/ubuntu-metrics.js

```tsxnpm run validate:ubuntu    # Needs scripts/validate-ubuntu-principles.js

// ✅ Chakra responsive propsnpm run community:health   # Needs scripts/community-health-check.js

<Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={6}>```

<Box w={{ base: "full", md: "280px" }} />

<Text fontSize={{ base: "md", lg: "lg" }} />## 🔧 Code Patterns & Conventions

```

### Ubuntu Middleware Integration

### Theme IntegrationEvery new worker/route MUST include Ubuntu context:

Always use the Nyuchi theme with:```typescript

- Typography: Playfair Display (headings), Roboto (body)// Add to any new worker

- Custom component variants for buttons, cardsexport async function UbuntuMiddleware(request: Request, env: Env): Promise<void> {

- Semantic color tokens for consistent theming  (request as any).ubuntu = await buildUbuntuContext(userContext, env);

  (request as any).communityFirst = true;

### File Structure Standards  (request as any).africanContext = true;

```}

components/```

├── layout/          # Layout components (Header, Sidebar)

├── ui/             # Chakra UI enhanced components### Error Handling Pattern

├── forms/          # Form components with Chakra validationAll errors include Ubuntu-themed messaging:

└── features/       # Feature-specific components```typescript

```// workers/dispatcher/src/middleware/error-handler.ts

interface UbuntuError {

### Code Style Requirements  code: string;

1. **TypeScript** - All files must use TypeScript  ubuntu_message: string;        // Ubuntu-philosophy explanation

2. **Chakra UI Props** - Use native Chakra props instead of style props  philosophy: string;           // Always "I am because we are"

3. **Responsive** - Always consider mobile-first design  community_support: string;    // How community can help

4. **Accessible** - Use semantic HTML and ARIA patterns  african_context?: any;       // Africa-specific context

5. **Ubuntu Philosophy** - Community-focused, collaborative approach}

```

### Common Patterns

### Authentication Pattern

#### Dashboard Layout```typescript

```tsx// Community routes bypass auth, business routes require it

<Flex h="100vh">if (url.pathname.startsWith('/api/community/')) {

  <Box w="280px" bg="white" borderRight="1px solid" borderColor="gray.200" p={6}>  return undefined; // Continue without auth - Ubuntu principle

    {/* Sidebar with Chakra spacing */}}

  </Box>// Business tools require authentication but maintain Ubuntu context

  <Box flex={1}>```

    <Container maxW="7xl" py={8}>

      {/* Main content with Chakra container */}### AI Integration Pattern

    </Container>```typescript

// SSE streaming with Ubuntu alignment in apps/platform/src/app/api/stream/

</Flex>const ubuntuPersonality = `Ubuntu philosophy: "I am because we are"`;

```// All AI responses emphasize community benefit and African business context

```

#### Metric Cards

```tsx## 🏗️ Project Structure Navigation

<Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={6}>

  <Card>### Key Configuration Files

    <CardBody>- `wrangler.toml`: Workers for Platforms dispatch configuration

      <Stat>- `package.json`: Workspace-aware scripts with Ubuntu metrics

        <StatLabel>Metric Name</StatLabel>- `workers/*/wrangler.toml`: Individual worker configurations

        <StatNumber>Value</StatNumber>

      </Stat>### Shared Packages (Not Fully Implemented)

    </CardBody>- `packages/shared-ui/`: ✅ Structure exists, build scripts skip implementation

  </Card>- `packages/auth/`: 📁 Directory exists, not built

</Grid>- `packages/database/`: 📁 Directory exists, not built

```- `packages/types/`: 📁 Directory exists, not built



### Product Integration### Critical Files for Understanding

When integrating products (SEO Manager, MailSense, Event Widget, Travel Platform):- `workers/dispatcher/src/ubuntu/middleware.ts`: Core Ubuntu enforcement

- Use consistent Chakra UI patterns- `workers/dispatcher/src/index.ts`: Main routing with Workers for Platforms

- Maintain theme consistency- `docs/ARCHITECTURE.md`: Comprehensive system design

- Follow spacing/sizing standards- `CLAUDE.md`: Current AI assistant conventions (merge source)

- Use semantic component naming

## 🎯 Environment & Deployment

### AI Integration

For AI assistant components:### Asset Naming Convention

- Use Chakra form components (Textarea, Button)All Cloudflare bindings use `NY_` prefix:

- Implement loading states with Chakra feedback- Databases: `NY_PLATFORM_DB`, `NY_AUTH_DB`

- Use Chakra color schemes for AI status indicators- KV: `NY_UBUNTU_CACHE`, `NY_SESSION_STORAGE`

- R2: `NY_COMMUNITY_ASSETS`, `NY_SUCCESS_STORIES_MEDIA`

## 🚫 Things to Avoid- AI: `NY_AI`, `NY_VECTORIZE`

- Custom CSS classes (use Chakra props instead)

- Hardcoded pixel values (use Chakra tokens)### Multi-Environment Setup

- Inconsistent spacing patterns- **Production**: `nyuchi-africa-prod` namespace

- Ubuntu branding in UI (keep as philosophy only)- **Staging/Dev**: `nyuchi-africa-staging` namespace (shared)

- Non-responsive layouts- Ubuntu variables: `UBUNTU_PLATFORM=true`, `COMMUNITY_ALWAYS_FREE=true`



## ✅ Always Remember## 🧪 Testing Philosophy

- Chakra UI first - leverage the complete design system

- Zimbabwe flag colors for brand identity### Ubuntu Compliance Testing

- Ubuntu philosophy guides UX decisions```typescript

- Community and collaboration focus// Always test Ubuntu principles alongside functionality

- Enterprise-grade professional appearancedescribe('Ubuntu Compliance', () => {

- Mobile-responsive always  it('should prioritize community benefit over individual metrics');
  it('should maintain free community access');
  it('should encourage collaboration over competition');
});
```

### Integration Testing
## Core Framework Stack - Remix + Polaris React Standards

1. **Community features are ALWAYS free** - Any auth middleware must skip `/api/community/*` routes

### ✅ ALWAYS Use Remix (React Router 7) + Shopify Polaris React

- **Framework**: Remix with React Router 7 for routing, SSR, and data loading
- **UI Components**: Shopify Polaris React components only
- **Spacing**: Use Polaris spacing tokens and props: `gap="400"`, `padding="400"`, etc.
- **Sizing**: Use Polaris size tokens and responsive props
- **Typography**: Use Polaris text variants: `variant="headingLg"`, `variant="bodyMd"`, etc.
- **Colors**: Use semantic color tokens from the Nyuchi theme, compatible with Polaris
- **Border Radius**: Use Polaris props and tokens
- **Shadows**: Use Polaris props
- **Routing**: Use Remix file-based routing with React Router 7
- **Data Loading**: Use Remix loaders and actions for SSR data fetching

// ❌ Avoid - Custom CSS, Chakra UI, Emotion, Framer Motion, Next.js, or any non-Remix/Polaris framework

### Shopify Admin Layout Components (Always Use These)
- `Frame` - Main application frame with navigation and topbar
- `Navigation` - Sidebar navigation with sections, items, and badges
- `TopBar` - Top navigation bar with search, user menu, and notifications
- `Page` - Page wrapper with breadcrumbs, title, subtitle, and actions
- `Layout` - Page content layout with primary and secondary sections
- `Card` - Content cards with sections, headers, and actions
- `DataTable`/`IndexTable` - Data display following Shopify Admin patterns
- `ResourceList` - List items with actions and bulk operations
- `Modal`, `Sheet` - Overlay components for forms and details
- `Toast` - Notifications and feedback messages

### Shopify Admin UI Patterns (Polaris Only)
- **Navigation**: Use Navigation.Section for grouping, badges for status
- **Page Actions**: Primary and secondary actions in Page component
- **Bulk Actions**: Use IndexTable with bulk selection patterns
- **Empty States**: Use EmptyState component with illustrations and actions
- **Loading States**: Use Skeleton, Spinner components during data loading
- **Error States**: Use Banner component for errors and warnings
- **Form Layout**: Use FormLayout, Card sections for organized forms

### Icons & Assets
- Use only Shopify Polaris icons (`@shopify/polaris-icons`)
- Follow Shopify Admin icon usage patterns (16px, 20px standard sizes)

### Shopify Admin Design Tokens
- Use Polaris design tokens for spacing, colors, typography
- Surface tokens: `surface`, `surface-subdued`, `surface-disabled`
- Interactive tokens: `interactive`, `interactive-hovered`, `interactive-pressed`

### File Structure Standards
components/
├── layout/          # Layout components (Header, Sidebar)
├── ui/             # Polaris UI enhanced components
├── forms/          # Form components with Polaris validation
└── features/       # Feature-specific components

### Code Style Requirements
1. **TypeScript** - All files must use TypeScript
2. **Polaris Props** - Use native Polaris props only
3. **Responsive** - Always consider mobile-first design
4. **Accessible** - Use semantic HTML and ARIA patterns
5. **Ubuntu Philosophy** - Community-focused, collaborative approach

### Common Patterns

### Authentication Pattern

#### Dashboard Layout

<Card>
  <BlockStack gap="400">
    {/* Sidebar with Polaris layout */}
    <Text variant="headingLg" as="h2">Title</Text>
    <Text variant="bodyMd" as="span">Content</Text>
    <Button variant="primary">Action</Button>
  </BlockStack>
</Card>

#### Metric Cards

<InlineStack gap="400">
  <Badge status="success">Metric Name: Value</Badge>
</InlineStack>

### Product Integration
- Use consistent Polaris UI patterns
- Maintain theme consistency
- Follow spacing/sizing standards
- Use semantic component naming

## 🚫 Things to Avoid
- Custom CSS classes (use Polaris props instead)
- Hardcoded pixel values (use Polaris tokens)
- Inconsistent spacing patterns
- Ubuntu branding in UI (keep as philosophy only)
- Non-responsive layouts
- Any Chakra UI, Emotion, Framer Motion, Next.js, Material UI, or non-Polaris components

## ✅ Always Remember - Shopify Admin Standards
- **Exact Shopify Admin Mimicking**: Frame, Navigation, TopBar, Page structure
- **Polaris React Only**: Complete design system with proper component hierarchy
- **IndexTable for Data**: Always use IndexTable with bulk actions for data display
- **Page Actions**: Primary and secondary actions in Page component headers
- **Navigation Sections**: Group navigation items with proper badges and hierarchy
- **Layout Patterns**: Two-column layout with Layout.Section and Layout.Section variant="oneThird"
- **Card Structure**: Cards with proper BlockStack spacing and section organization
- **Badge Usage**: Consistent badge tones (success, info, warning, critical)
- **Loading/Empty States**: Use Polaris Skeleton, EmptyState components
- **Form Patterns**: FormLayout with Card sections for organized forms
- **Ubuntu Philosophy**: Community-focused UX decisions without Ubuntu branding
- **Zimbabwe Colors**: Subtle integration of flag colors through Polaris tokens
- **Enterprise Grade**: Professional Shopify Admin appearance and interactions
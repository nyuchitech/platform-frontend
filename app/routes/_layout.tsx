import { Outlet, useLocation } from "react-router";
import { 
  Frame, 
  Navigation, 
  TopBar,
  Badge
} from '@shopify/polaris';
import { 
  HomeIcon, 
  PersonIcon, 
  PlanIcon, 
  CalendarIcon,
  EmailIcon,
  SearchIcon,
  SettingsIcon,
  HeartIcon,
  AlertCircleIcon,
  QuestionCircleIcon
} from '@shopify/polaris-icons';
import { useState } from 'react';

export default function DashboardLayout() {
  const location = useLocation();
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);

  const navigationMarkup = (
    <Navigation location={location.pathname}>
      <Navigation.Section
        items={[
          {
            label: '🇿🇼 Ubuntu Dashboard',
            icon: HomeIcon,
            url: '/dashboard',
            selected: location.pathname === '/dashboard',
          },
          {
            label: 'Community Platform',
            icon: PersonIcon,
            url: '/dashboard/community',
            selected: location.pathname === '/dashboard/community',
            badge: 'Always Free',
          },
        ]}
      />
      
      <Navigation.Section
        title="Business Tools"
        items={[
          {
            label: 'Travel Platform',
            icon: PlanIcon,
            url: '/dashboard/travel',
            selected: location.pathname === '/dashboard/travel',
          },
          {
            label: 'Event Widget',
            icon: CalendarIcon,
            url: '/dashboard/events',
            selected: location.pathname === '/dashboard/events',
          },
          {
            label: 'MailSense',
            icon: EmailIcon,
            url: '/dashboard/mailsense',
            selected: location.pathname === '/dashboard/mailsense',
          },
          {
            label: 'SEO Manager',
            icon: SearchIcon,
            url: '/dashboard/seo',
            selected: location.pathname === '/dashboard/seo',
          },
        ]}
      />

      <Navigation.Section
        title="Ubuntu Features"
        items={[
          {
            label: 'Ubuntu Score',
            icon: HeartIcon,
            url: '/dashboard/ubuntu-score',
            selected: location.pathname === '/dashboard/ubuntu-score',
            badge: '96%',
          },
          {
            label: 'Settings',
            icon: SettingsIcon,
            url: '/dashboard/settings',
            selected: location.pathname === '/dashboard/settings',
          },
        ]}
      />
    </Navigation>
  );

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      onNavigationToggle={() => setIsNavigationOpen(!isNavigationOpen)}
    />
  );

  return (
    <div style={{ height: '100vh' }}>
      <Frame
        topBar={topBarMarkup}
        navigation={navigationMarkup}
        showMobileNavigation={isNavigationOpen}
        onNavigationDismiss={() => setIsNavigationOpen(false)}
      >
        <Outlet />
      </Frame>
    </div>
  );
}
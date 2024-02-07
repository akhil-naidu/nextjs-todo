import { DashboardConfig } from '@/types';

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: 'Documentation',
      href: '',
    },
    {
      title: 'Support',
      href: '',
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: 'Todos',
      href: '/dashboard',
      icon: 'post',
    },
    {
      title: 'Billing',
      href: '/dashboard/billing',
      icon: 'billing',
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
      icon: 'settings',
    },
  ],
  userAccountNav: [
    {
      title: 'Dashboard',
      href: '/dashboard',
    },
    {
      title: 'Billing',
      href: '/dashboard/billing',
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
    },
  ],
};

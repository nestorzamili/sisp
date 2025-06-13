import {
  IconChecklist,
  IconHelp,
  IconLayoutDashboard,
  IconUsers,
} from '@tabler/icons-react';
import { type SidebarData } from './types';

export const sidebarData: SidebarData = {
  teams: [
    {
      name: 'Dinas Pendidikan',
      logo: '/logo-nias-selatan.svg',
      plan: 'Sarana dan Prasarana SMP',
    },
  ],
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/admin/home',
          icon: IconLayoutDashboard,
        },
        {
          title: 'Sekolah',
          url: '/admin/sekolah',
          icon: IconChecklist,
        },
        {
          title: 'Pengguna',
          url: '/admin/pengguna',
          icon: IconUsers,
        },
      ],
    },
    {
      title: 'Other',
      items: [
        {
          title: 'Help Center',
          url: '/help-center',
          icon: IconHelp,
        },
      ],
    },
  ],
};

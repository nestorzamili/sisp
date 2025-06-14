import {
  IconChecklist,
  IconHelp,
  IconLayoutDashboard,
  IconUsers,
  IconSchool,
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
          title: 'Permintaan Pendaftaran',
          url: '/admin/permintaan-pendaftaran',
          icon: IconChecklist,
        },
        {
          title: 'Sekolah',
          url: '/admin/sekolah',
          icon: IconSchool,
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

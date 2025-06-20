import {
  IconChecklist,
  IconHelp,
  IconLayoutDashboard,
  IconSchool,
} from '@tabler/icons-react';
import { type SidebarData } from './types';

export const sidebarData: SidebarData = {
  teams: [
    {
      name: 'Dinas Pendidikan',
      logo: '/logo-nias-selatan.png',
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
          title: 'Permintaan Review',
          url: '/admin/permintaan-review',
          icon: IconChecklist,
        },
        {
          title: 'Sekolah',
          url: '/admin/sekolah',
          icon: IconSchool,
        },
      ],
    },
    {
      title: 'Other',
      items: [
        {
          title: 'Help Center',
          url: '/admin/help-center',
          icon: IconHelp,
        },
      ],
    },
  ],
};

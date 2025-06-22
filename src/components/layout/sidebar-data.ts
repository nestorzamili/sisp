import {
  IconChecklist,
  IconHelp,
  IconLayoutDashboard,
  IconSchool,
  IconSpeakerphone,
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
        }, // broadcast notifications
        {
          title: 'Broadcast Notifications',
          url: '/admin/broadcast',
          icon: IconSpeakerphone,
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

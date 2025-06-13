'use client';

import * as React from 'react';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar';
import Image from 'next/image';

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string;
    logo: React.ElementType | string;
    plan: string;
  }[];
}) {
  const activeTeam = teams[0];

  const renderLogo = () => {
    if (typeof activeTeam.logo === 'string') {
      return (
        <Image
          src={activeTeam.logo}
          alt={`${activeTeam.name} logo`}
          width={32}
          height={32}
          className="size-8"
        />
      );
    } else {
      const LogoComponent = activeTeam.logo;
      return <LogoComponent className="size-8" />;
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" className="cursor-default">
          {renderLogo()}
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{activeTeam.name}</span>
            <span className="truncate text-xs">{activeTeam.plan}</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

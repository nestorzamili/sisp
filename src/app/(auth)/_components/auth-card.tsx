'use client';

import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface AuthCardProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function AuthCard({
  title,
  icon: Icon,
  children,
  footer,
}: AuthCardProps) {
  return (
    <Card className="card-primary w-full p-4 sm:p-5">
      {/* Header with icon and title */}
      <div className="flex items-center justify-center mb-3 sm:mb-4">
        <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-accent rounded-lg mr-2">
          <Icon className="h-3 w-3 sm:h-4 sm:w-4 text-accent-foreground" />
        </div>
        <h2 className="text-sm sm:text-base font-bold text-foreground">
          {title}
        </h2>
      </div>

      {/* Main content */}
      <div className="space-y-1">{children}</div>

      {/* Footer */}
      {footer && <div className="mt-3 sm:mt-4">{footer}</div>}
    </Card>
  );
}

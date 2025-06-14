import { Skeleton } from '@/components/ui/skeleton';

// Reusable skeleton components for better performance
export const SkeletonCell = ({ width = 'w-20' }: { width?: string }) => (
  <Skeleton className={`h-4 ${width}`} />
);

export const SkeletonBadge = () => <Skeleton className="h-6 w-32" />;

export const SkeletonActions = () => (
  <Skeleton className="h-8 w-8 rounded-md ml-auto" />
);

export const SkeletonCheckbox = () => <Skeleton className="h-4 w-4" />;

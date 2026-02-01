import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

interface ProgressRingProps {
  checked: number;
  total: number;
  className?: string;
}

export function ProgressRing({ checked, total, className }: ProgressRingProps) {
  const percentage = total > 0 ? Math.round((checked / total) * 100) : 0;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Shopping Progress</span>
        <span className="font-medium">
          {checked}/{total} items
        </span>
      </div>
      <Progress value={percentage} className="h-2 bg-secondary [&>div]:bg-accent" />
      {percentage === 100 && total > 0 && (
        <p className="text-sm text-accent font-medium">
          🎉 All done! Ready to checkout?
        </p>
      )}
    </div>
  );
}

import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

interface SuggestionBadgeProps {
  className?: string;
}

export function SuggestionBadge({ className }: SuggestionBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full",
        "bg-accent/10 text-accent text-2xs font-medium",
        className
      )}
    >
      <Sparkles className="w-3 h-3" />
      Sugerido
    </span>
  );
}

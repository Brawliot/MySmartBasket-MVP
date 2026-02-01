import { cn } from '@/lib/utils';
import { EcoScore } from '@/types';

interface EcoScoreBadgeProps {
  score: EcoScore;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const scoreConfig: Record<EcoScore, { bg: string; text: string; label: string }> = {
  A: { bg: 'bg-eco-excellent', text: 'text-white', label: 'Excellent' },
  B: { bg: 'bg-eco-good', text: 'text-white', label: 'Good' },
  C: { bg: 'bg-eco-moderate', text: 'text-white', label: 'Moderate' },
  D: { bg: 'bg-eco-poor', text: 'text-white', label: 'Poor' },
  E: { bg: 'bg-destructive', text: 'text-white', label: 'Avoid' },
};

const sizeConfig = {
  sm: 'w-5 h-5 text-2xs',
  md: 'w-6 h-6 text-xs',
  lg: 'w-8 h-8 text-sm',
};

export function EcoScoreBadge({ score, size = 'sm', showLabel = false }: EcoScoreBadgeProps) {
  const config = scoreConfig[score];

  return (
    <div className="flex items-center gap-1.5">
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-full font-bold",
          config.bg,
          config.text,
          sizeConfig[size]
        )}
      >
        {score}
      </span>
      {showLabel && (
        <span className="text-xs text-muted-foreground">{config.label}</span>
      )}
    </div>
  );
}

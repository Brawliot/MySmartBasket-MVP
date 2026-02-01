import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';

interface FloatingActionButtonProps {
  onClick: () => void;
  className?: string;
}

export function FloatingActionButton({ onClick, className }: FloatingActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "fixed right-6 bottom-24 z-40",
        "w-14 h-14 rounded-full shadow-elevated",
        "bg-accent text-accent-foreground",
        "flex items-center justify-center",
        "transition-smooth hover:scale-105 active:scale-95",
        className
      )}
    >
      <Plus className="w-7 h-7" strokeWidth={2.5} />
    </button>
  );
}

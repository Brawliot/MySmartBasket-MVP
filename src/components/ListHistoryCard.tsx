import { cn } from '@/lib/utils';
import { ShoppingList } from '@/types';
import { Clock, RotateCcw, Sparkles } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

interface ListHistoryCardProps {
  list: ShoppingList;
  onReuse: (id: string) => void;
}

export function ListHistoryCard({ list, onReuse }: ListHistoryCardProps) {
  const itemCount = list.items.length;
  const checkedCount = list.items.filter(i => i.checked).length;

  return (
    <div className="flex items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-xl bg-card shadow-card">
      {/* Icon */}
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
        <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-sm sm:text-base text-card-foreground truncate">{list.name}</h3>
        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
          {itemCount} productos • {checkedCount} comprados
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {formatDistanceToNow(list.updatedAt, { addSuffix: true, locale: es })}
        </p>
      </div>

      {/* Reuse button */}
      <div className="flex flex-col gap-1.5 sm:gap-2 items-end flex-shrink-0">
        <button
          className={cn(
            "flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full",
            "bg-secondary text-secondary-foreground text-xs font-medium",
            "opacity-60 cursor-not-allowed"
          )}
          disabled
          title="Próximamente"
        >
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Sugerencias de IA</span>
        </button>
        <button
          onClick={() => onReuse(list.id)}
          className={cn(
            "flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full",
            "bg-accent text-accent-foreground text-xs sm:text-sm font-medium",
            "transition-smooth hover:opacity-90 active:scale-95"
          )}
        >
          <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Reusar</span>
        </button>
      </div>
    </div>
  );
}

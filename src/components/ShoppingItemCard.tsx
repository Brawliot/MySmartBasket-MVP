import { cn } from '@/lib/utils';
import { ShoppingItem } from '@/types';
import { Check, Minus, Plus, Trash2 } from 'lucide-react';
import { EcoScoreBadge } from './EcoScoreBadge';
import { getProductById } from '@/data/products';

interface ShoppingItemCardProps {
  item: ShoppingItem;
  onToggle: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export function ShoppingItemCard({
  item,
  onToggle,
  onUpdateQuantity,
  onRemove,
}: ShoppingItemCardProps) {
  const product = getProductById(item.productId);
  
  return (
    <div
      className={cn(
        "group flex items-center gap-3 p-4 rounded-xl bg-card shadow-card transition-smooth",
        item.checked && "opacity-60"
      )}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(item.id)}
        className={cn(
          "flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-smooth tap-target",
          item.checked
            ? "bg-accent border-accent"
            : "border-muted-foreground/30 hover:border-accent"
        )}
      >
        {item.checked && (
          <Check className="w-4 h-4 text-accent-foreground animate-check-bounce" />
        )}
      </button>

      {/* Emoji */}
      <span className="text-2xl flex-shrink-0">{product?.emoji || '🛒'}</span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3
              className={cn(
                "font-medium text-card-foreground leading-tight",
                item.checked && "line-through"
              )}
            >
              {item.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-0.5">
              {item.quantity} {item.unit}
            </p>
          </div>
          <EcoScoreBadge score={item.ecoScore} />
        </div>
        {item.notes && (
          <p className="text-xs text-muted-foreground mt-1 truncate">
            {item.notes}
          </p>
        )}
      </div>

      {/* Quantity controls */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity - (item.quantity <= 1 ? 0 : 1))}
          className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center tap-target transition-smooth hover:bg-secondary/80"
          disabled={item.quantity <= 1}
        >
          <Minus className="w-4 h-4" />
        </button>
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center tap-target transition-smooth hover:bg-secondary/80"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Delete button */}
      <button
        onClick={() => onRemove(item.id)}
        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center tap-target transition-smooth text-destructive opacity-0 group-hover:opacity-100 focus:opacity-100 hover:bg-destructive/10"
        aria-label="Eliminar producto"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}

import { cn } from '@/lib/utils';
import { Product, ProductFrequency } from '@/types';
import { Plus } from 'lucide-react';
import { EcoScoreBadge } from './EcoScoreBadge';
import { SuggestionBadge } from './SuggestionBadge';

interface ProductSuggestionCardProps {
  product: Product;
  frequency?: ProductFrequency;
  onAdd: (product: Product) => void;
  showBadge?: boolean;
}

export function ProductSuggestionCard({
  product,
  frequency,
  onAdd,
  showBadge = true,
}: ProductSuggestionCardProps) {
  return (
    <button
      onClick={() => onAdd(product)}
      className={cn(
        "flex flex-col items-center gap-2 p-4 rounded-xl bg-card shadow-card",
        "min-w-[120px] transition-smooth hover:shadow-elevated active:scale-95"
      )}
    >
      {/* Badge */}
      {showBadge && (
        <div className="self-start">
          <SuggestionBadge />
        </div>
      )}

      {/* Emoji */}
      <span className="text-4xl">{product.emoji || '🛒'}</span>

      {/* Name */}
      <span className="text-sm font-medium text-card-foreground text-center line-clamp-2">
        {product.name}
      </span>

      {/* Frequency indicator */}
      {frequency && (
        <span className="text-2xs text-muted-foreground">
          Añadido {frequency.count}× antes
        </span>
      )}

      {/* Price & Eco */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">
          ~{product.averagePrice.toFixed(2)} €
        </span>
        <EcoScoreBadge score={product.ecoScore} size="sm" />
      </div>

      {/* Add icon */}
      <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
        <Plus className="w-4 h-4 text-accent-foreground" />
      </div>
    </button>
  );
}

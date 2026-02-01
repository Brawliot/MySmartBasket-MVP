import { cn } from '@/lib/utils';
import { PriceComparison } from '@/types';
import { ChevronRight, MapPin, Globe, TrendingDown } from 'lucide-react';

interface PriceComparisonCardProps {
  comparison: PriceComparison;
  isLowest?: boolean;
  onSelect?: (id: string) => void;
}

export function PriceComparisonCard({ comparison, isLowest, onSelect }: PriceComparisonCardProps) {
  const { supermarket, totalPrice, savings } = comparison;

  return (
    <button
      onClick={() => onSelect?.(supermarket.id)}
      className={cn(
        "w-full flex items-center gap-4 p-4 rounded-xl transition-smooth text-left",
        isLowest
          ? "bg-accent/10 border-2 border-accent shadow-soft"
          : "bg-card shadow-card hover:shadow-elevated"
      )}
    >
      {/* Store Logo */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
        style={{ backgroundColor: `${supermarket.color}20` }}
      >
        {supermarket.logo}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-card-foreground">{supermarket.name}</h3>
          {isLowest && (
            <span className="px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-2xs font-medium flex items-center gap-1">
              <TrendingDown className="w-3 h-3" />
              Mejor Precio
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {supermarket.distance} km
          </span>
          {supermarket.hasOnlineOrdering && (
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" />
              Online
            </span>
          )}
        </div>
      </div>

      {/* Price */}
      <div className="text-right flex-shrink-0">
        <p className={cn(
          "text-xl font-bold",
          isLowest ? "text-accent" : "text-card-foreground"
        )}>
          {totalPrice.toFixed(2)} €
        </p>
        {savings && savings > 0 && (
          <p className="text-sm text-accent font-medium">
            Ahorra {savings.toFixed(2)} €
          </p>
        )}
      </div>

      <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
    </button>
  );
}

import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Product, ProductCategory } from '@/types';
import { products, categoryMeta, searchProducts } from '@/data/products';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { EcoScoreBadge } from './EcoScoreBadge';

interface AddItemSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddItem: (product: Product) => void;
}

export function AddItemSheet({ open, onOpenChange, onAddItem }: AddItemSheetProps) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null);

  const filteredProducts = useMemo(() => {
    let result = products;
    
    if (query) {
      result = searchProducts(query);
    } else if (selectedCategory) {
      result = products.filter(p => p.category === selectedCategory);
    }
    
    return result;
  }, [query, selectedCategory]);

  const categories = Object.entries(categoryMeta) as [ProductCategory, typeof categoryMeta[ProductCategory]][];

  const handleAdd = (product: Product) => {
    onAddItem(product);
    setQuery('');
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl">
        <SheetHeader className="pb-4">
          <SheetTitle className="text-xl font-semibold">Añadir Productos</SheetTitle>
        </SheetHeader>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedCategory(null);
            }}
            placeholder="Buscar productos..."
            className="pl-10 h-12 rounded-xl bg-secondary border-0"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-muted flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Categories */}
        {!query && (
          <div className="flex gap-2 overflow-x-auto pb-4 -mx-6 px-6 no-scrollbar">
            <button
              onClick={() => setSelectedCategory(null)}
              className={cn(
                "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-smooth",
                !selectedCategory
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              )}
            >
              Todos
            </button>
            {categories.map(([key, meta]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={cn(
                  "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-smooth flex items-center gap-1.5",
                  selectedCategory === key
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                )}
              >
                <span>{meta.emoji}</span>
                <span>{meta.name}</span>
              </button>
            ))}
          </div>
        )}

        {/* Products Grid */}
        <ScrollArea className="h-[calc(100%-140px)]">
          <div className="grid grid-cols-2 gap-3 pb-6">
            {filteredProducts.map(product => (
              <button
                key={product.id}
                onClick={() => handleAdd(product)}
                className="flex flex-col items-start gap-2 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-smooth text-left active:scale-95"
              >
                <span className="text-3xl">{product.emoji || '🛒'}</span>
                <div className="w-full">
                  <h4 className="font-medium text-sm line-clamp-1">{product.name}</h4>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-muted-foreground">
                      {product.averagePrice.toFixed(2)} €/{product.unit}
                    </span>
                    <EcoScoreBadge score={product.ecoScore} size="sm" />
                  </div>
                </div>
                {(product.isOrganic || product.isLocal) && (
                  <div className="flex gap-1">
                    {product.isOrganic && (
                      <span className="text-2xs px-1.5 py-0.5 rounded-full bg-eco-excellent/20 text-eco-excellent">
                        Ecológico
                      </span>
                    )}
                    {product.isLocal && (
                      <span className="text-2xs px-1.5 py-0.5 rounded-full bg-accent/20 text-accent">
                        Nacional
                      </span>
                    )}
                  </div>
                )}
              </button>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

import { useMemo, useState } from 'react';
import { BottomNav } from '@/components/BottomNav';
import { PriceComparisonCard } from '@/components/PriceComparisonCard';
import { useShoppingList } from '@/hooks/useShoppingList';
import { supermarkets, generateMockPrices } from '@/data/products';
import { PriceComparison, ShoppingList } from '@/types';
import { Scale, ShoppingBag } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Link, useNavigate } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Compare() {
  const { activeList, allLists } = useShoppingList();
  const [selectedListId, setSelectedListId] = useState<string>(activeList?.id || '');
  const navigate = useNavigate();
  
  // Find the selected list
  const selectedList: ShoppingList | undefined = useMemo(() => {
    if (!selectedListId) return activeList || undefined;
    return allLists.find(l => l.id === selectedListId);
  }, [selectedListId, activeList, allLists]);
  
  const items = selectedList?.items || [];

  const comparisons = useMemo((): PriceComparison[] => {
    if (items.length === 0) return [];

    const productIds = items.map(i => i.productId);
    const priceMap = generateMockPrices(productIds);

    return supermarkets.map(supermarket => {
      const storePrices = priceMap.get(supermarket.id)!;
      let total = 0;
      const itemPrices: { itemId: string; price: number }[] = [];

      items.forEach(item => {
        const unitPrice = storePrices.get(item.productId) || 0;
        const price = unitPrice * item.quantity;
        total += price;
        itemPrices.push({ itemId: item.id, price });
      });

      return { supermarketId: supermarket.id, supermarket, totalPrice: Math.round(total * 100) / 100, itemPrices };
    }).sort((a, b) => a.totalPrice - b.totalPrice);
  }, [items]);

  const lowestPrice = comparisons[0]?.totalPrice || 0;
  const comparisonsWithSavings = comparisons.map(c => ({
    ...c,
    savings: c.totalPrice > lowestPrice ? c.totalPrice - lowestPrice : 0,
  }));

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-30 glass border-b border-divider safe-top">
        <div className="px-4 sm:px-6 py-3 sm:py-4">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Comparar Precios</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">Encuentra las mejores ofertas</p>
        </div>
      </header>

      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="px-4 sm:px-6 py-3 sm:py-4 space-y-3 sm:space-y-4 max-w-4xl mx-auto">
          {/* List Selector */}
          {allLists.length > 0 && (
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg">Elegir Lista</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Selecciona la lista que quieres comparar
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <Select value={selectedListId} onValueChange={setSelectedListId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una lista" />
                  </SelectTrigger>
                  <SelectContent>
                    {allLists.map((list) => (
                      <SelectItem key={list.id} value={list.id}>
                        {list.name} {list.isClosed ? '(Cerrada)' : '(Activa)'} - {list.items.length} productos
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          )}

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
                <Scale className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground">
                {allLists.length === 0 ? 'Añade productos primero' : 'Lista vacía'}
              </h3>
              <p className="text-muted-foreground mt-1 max-w-[240px]">
                {allLists.length === 0 
                  ? 'Añade productos a tu cesta para comparar precios entre supermercados'
                  : 'Esta lista no tiene productos para comparar'}
              </p>
              {allLists.length === 0 && (
                <Link to="/lists" className="mt-4 px-6 py-3 rounded-full bg-accent text-accent-foreground font-medium">
                  Crear Lista
                </Link>
              )}
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl bg-secondary/50">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground flex-shrink-0" />
                <span className="text-xs sm:text-sm text-muted-foreground truncate">
                  Comparando {items.length} productos de "{selectedList?.name || 'Lista seleccionada'}"
                </span>
              </div>

              <div className="space-y-3">
                {comparisonsWithSavings.map((comparison, index) => (
                  <PriceComparisonCard
                    key={comparison.supermarketId}
                    comparison={comparison}
                    isLowest={index === 0}
                    onSelect={(id) => navigate(`/compare/${id}`)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </ScrollArea>

      <BottomNav />
    </div>
  );
}

import { BottomNav } from '@/components/BottomNav';
import { ListHistoryCard } from '@/components/ListHistoryCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useShoppingList } from '@/hooks/useShoppingList';
import { ShoppingBasket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Basket() {
  const { listHistory, reuseList } = useShoppingList();
  const navigate = useNavigate();

  const handleReuse = (id: string) => {
    reuseList(id);
    navigate('/inicio');
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-30 glass border-b border-divider safe-top">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-foreground">Mi Cesta</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Listas cerradas/aprobadas</p>
        </div>
      </header>

      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="px-6 py-4">
          {listHistory.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
                <ShoppingBasket className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground">Aún no hay listas cerradas</h3>
              <p className="text-muted-foreground mt-1 max-w-[260px]">
                Finaliza una compra para verla aquí.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {listHistory.map((list) => (
                <ListHistoryCard key={list.id} list={list} onReuse={handleReuse} />
              ))}
            </div>
          )}
        </div>
      </ScrollArea>

      <BottomNav />
    </div>
  );
}

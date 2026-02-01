import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supermarkets } from '@/data/products';
import { BottomNav } from '@/components/BottomNav';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Globe, ShoppingCart, ArrowLeft, Map } from 'lucide-react';

export default function StoreLocations() {
  const { storeId } = useParams<{ storeId: string }>();
  const navigate = useNavigate();

  const store = useMemo(() => supermarkets.find((s) => s.id === storeId), [storeId]);

  const locations = useMemo(() => {
    if (!store) return [];
    const base = store.distance;
    return Array.from({ length: 4 }).map((_, idx) => {
      const delta = 0.35 * idx;
      return {
        id: `${store.id}-loc-${idx}`,
        name: `${store.name} - Calle Principal ${idx + 1}`,
        distance: Math.max(0.2, Math.round((base + delta) * 10) / 10),
        online: store.hasOnlineOrdering,
      };
    });
  }, [store]);

  if (!store) {
    return (
      <div className="min-h-screen bg-background pb-24">
        <header className="sticky top-0 z-30 glass border-b border-divider safe-top">
          <div className="px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold">Supermercado no encontrado</h1>
          </div>
        </header>
        <div className="p-6">
          <p className="text-muted-foreground">Vuelve atrás y selecciona un supermercado válido.</p>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-30 glass border-b border-divider safe-top">
        <div className="px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">{store.name}</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Locales cercanos y disponibilidad online
            </p>
          </div>
        </div>
      </header>

      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="px-4 sm:px-6 py-3 sm:py-4 space-y-3 sm:space-y-4 max-w-3xl mx-auto">
          {store.hasOnlineOrdering && (
            <Button className="w-full flex items-center gap-2 justify-center">
              <ShoppingCart className="w-4 h-4" />
              Comprar online en {store.name}
            </Button>
          )}

          <Card>
            <CardHeader className="p-4 sm:p-5">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Map className="w-4 h-4" />
                Mapa de locales cercanos
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Vista de ubicaciones cercanas (placeholder de mapa).
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-5 pt-0">
              <div className="w-full h-48 sm:h-64 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground text-sm">
                Mapa interactivo aquí
              </div>
            </CardContent>
          </Card>

          {locations.map((loc) => (
            <Card key={loc.id}>
              <CardHeader className="p-4 sm:p-5">
                <CardTitle className="text-base sm:text-lg">{loc.name}</CardTitle>
                <CardDescription className="text-xs sm:text-sm flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> A {loc.distance} km
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-5 pt-0 flex items-center justify-between">
                <div className="text-xs sm:text-sm text-muted-foreground flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  {loc.online ? 'Venta online disponible' : 'Solo en tienda física'}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

      <BottomNav />
    </div>
  );
}

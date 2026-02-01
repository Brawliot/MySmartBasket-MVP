import { BottomNav } from '@/components/BottomNav';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Activity, Droplets, Flame, Leaf, HeartPulse } from 'lucide-react';

export default function Stats() {
  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-30 glass border-b border-divider safe-top">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-foreground">Estadísticas</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Salud, variedad y huella</p>
        </div>
      </header>

      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="px-6 py-4 space-y-3">
          <div className="p-4 rounded-xl bg-card shadow-card flex items-center gap-3">
            <HeartPulse className="w-5 h-5 text-accent" />
            <div>
              <p className="font-medium">Salud</p>
              <p className="text-sm text-muted-foreground">Próximamente: azúcar, sodio, ultraprocesados.</p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-card shadow-card flex items-center gap-3">
            <Activity className="w-5 h-5 text-accent" />
            <div>
              <p className="font-medium">Variedad</p>
              <p className="text-sm text-muted-foreground">Próximamente: diversidad de categorías y micronutrientes.</p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-card shadow-card flex items-center gap-3">
            <Flame className="w-5 h-5 text-accent" />
            <div>
              <p className="font-medium">Suficiencia calórica</p>
              <p className="text-sm text-muted-foreground">Próximamente: estimación de calorías y raciones.</p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-card shadow-card flex items-center gap-3">
            <Droplets className="w-5 h-5 text-accent" />
            <div>
              <p className="font-medium">Hidratación</p>
              <p className="text-sm text-muted-foreground">Próximamente: recordatorios y consumo estimado.</p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-card shadow-card flex items-center gap-3">
            <Leaf className="w-5 h-5 text-eco-excellent" />
            <div>
              <p className="font-medium">Huella de carbono</p>
              <p className="text-sm text-muted-foreground">Próximamente: CO₂ estimado por lista y alternativas.</p>
            </div>
          </div>
        </div>
      </ScrollArea>

      <BottomNav />
    </div>
  );
}

import { BottomNav } from '@/components/BottomNav';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CalendarDays } from 'lucide-react';

export default function WeeklyMenu() {
  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-30 glass border-b border-divider safe-top">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-foreground">Menú Semanal</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Próximamente</p>
        </div>
      </header>

      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="px-6 py-8">
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
              <CalendarDays className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-lg font-medium text-foreground">Planificación fácil</h2>
            <p className="text-muted-foreground mt-1 max-w-[260px]">
              Genera un menú semanal y crea la lista automáticamente con lo que falte.
            </p>
          </div>
        </div>
      </ScrollArea>

      <BottomNav />
    </div>
  );
}

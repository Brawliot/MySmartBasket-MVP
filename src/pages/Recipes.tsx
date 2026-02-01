import { BottomNav } from '@/components/BottomNav';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, CalendarDays, ChefHat, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

// Sugerencias de platos (mock data)
const dishSuggestions = [
  {
    id: '1',
    name: 'Paella Valenciana',
    description: 'Plato tradicional español con arroz, pollo y verduras',
    emoji: '🥘',
    difficulty: 'Media',
    time: '60 min',
  },
  {
    id: '2',
    name: 'Ensalada Mediterránea',
    description: 'Fresca y saludable con tomate, pepino y queso feta',
    emoji: '🥗',
    difficulty: 'Fácil',
    time: '15 min',
  },
  {
    id: '3',
    name: 'Pasta Carbonara',
    description: 'Clásica italiana con bacon, huevo y queso parmesano',
    emoji: '🍝',
    difficulty: 'Media',
    time: '25 min',
  },
];

export default function Recipes() {
  const navigate = useNavigate();
  const suggestedDish = dishSuggestions[Math.floor(Math.random() * dishSuggestions.length)];

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-30 glass border-b border-divider safe-top">
        <div className="px-4 sm:px-6 py-3 sm:py-4">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Recetas</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">Descubre nuevas recetas</p>
        </div>
      </header>

      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="px-4 sm:px-6 py-3 sm:py-4 space-y-4 sm:space-y-6 max-w-4xl mx-auto">
          {/* Sugerencia de Plato */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <ChefHat className="w-5 h-5 text-accent" />
              <h2 className="font-semibold text-foreground">Sugerencia del Día</h2>
            </div>
            <Card className="bg-card shadow-card">
              <CardHeader className="p-4 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                    <div className="text-3xl sm:text-4xl flex-shrink-0">{suggestedDish.emoji}</div>
                    <div className="min-w-0">
                      <CardTitle className="text-lg sm:text-xl truncate">{suggestedDish.name}</CardTitle>
                      <CardDescription className="mt-1 text-xs sm:text-sm">
                        {suggestedDish.description}
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                  <span>Dificultad: {suggestedDish.difficulty}</span>
                  <span>Tiempo: {suggestedDish.time}</span>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full text-sm sm:text-base"
                  onClick={() => {
                    navigate('/mis-recetas');
                  }}
                >
                  Ver Receta Completa
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </section>

          {/* Botones de Acceso */}
          <section className="space-y-2 sm:space-y-3">
            <Button
              onClick={() => navigate('/mis-recetas')}
              className={cn(
                "w-full h-auto py-4 sm:py-6 flex items-center justify-between",
                "bg-card hover:bg-accent/10 border border-border"
              )}
              variant="outline"
            >
              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
                </div>
                <div className="text-left min-w-0">
                  <div className="font-semibold text-sm sm:text-base text-foreground">Mis Recetas</div>
                  <div className="text-xs sm:text-sm text-muted-foreground truncate">
                    Explora todas tus recetas guardadas
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground flex-shrink-0 ml-2" />
            </Button>

            <Button
              onClick={() => navigate('/menu-semanal')}
              className={cn(
                "w-full h-auto py-4 sm:py-6 flex items-center justify-between",
                "bg-card hover:bg-accent/10 border border-border"
              )}
              variant="outline"
            >
              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <CalendarDays className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
                </div>
                <div className="text-left min-w-0">
                  <div className="font-semibold text-sm sm:text-base text-foreground">Menú Semanal</div>
                  <div className="text-xs sm:text-sm text-muted-foreground truncate">
                    Planifica tus comidas de la semana
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground flex-shrink-0 ml-2" />
            </Button>
          </section>
        </div>
      </ScrollArea>

      <BottomNav />
    </div>
  );
}

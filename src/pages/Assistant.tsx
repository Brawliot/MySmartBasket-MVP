import { useState } from 'react';
import { BottomNav } from '@/components/BottomNav';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Send, ShoppingCart, RefreshCw, CalendarDays, Sparkles, MessageSquare, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useShoppingList } from '@/hooks/useShoppingList';
import { useToast } from '@/hooks/use-toast';
import { products } from '@/data/products';
import { generateId } from '@/lib/id';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

const categories = [
  {
    id: 'suggestions',
    title: 'Sugerencias de compras',
    description: 'Obtén recomendaciones inteligentes basadas en tus hábitos',
    icon: Sparkles,
    emoji: '✨',
  },
  {
    id: 'replenish',
    title: 'Reponer pronto',
    description: 'Productos que deberías reponer próximamente',
    icon: RefreshCw,
    emoji: '🔄',
  },
  {
    id: 'weekly-menu',
    title: 'Menú semanal sugerido',
    description: 'Genera un menú semanal personalizado',
    icon: CalendarDays,
    emoji: '📅',
  },
  {
    id: 'generate-list',
    title: 'Generar lista de la compra',
    description: 'Crea una lista automáticamente según tus necesidades',
    icon: ShoppingCart,
    emoji: '🛒',
  },
];

export default function Assistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [showCategories, setShowCategories] = useState(true);
  const { toast } = useToast();
  const { createList, addItem, productFrequency } = useShoppingList();

  const handleCategoryClick = (categoryId: string) => {
    setShowCategories(false);
    let response = '';

    switch (categoryId) {
      case 'suggestions':
        response = 'Basándome en tus compras anteriores, te sugiero estos productos:\n\n• Leche (comprado frecuentemente)\n• Pan (comprado frecuentemente)\n• Huevos (comprado frecuentemente)\n\n¿Quieres que añada alguno de estos a tu lista?';
        break;
      case 'replenish':
        const frequentProducts = productFrequency
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);
        if (frequentProducts.length > 0) {
          response = 'Productos que deberías reponer pronto basándome en tu historial:\n\n';
          frequentProducts.forEach((fp, index) => {
            const product = products.find((p) => p.id === fp.productId);
            if (product) {
              response += `${index + 1}. ${product.name} (comprado ${fp.count} veces)\n`;
            }
          });
        } else {
          response = 'Aún no tengo suficiente información sobre tus compras para sugerirte productos a reponer. ¡Empieza a usar la app y pronto te daré recomendaciones!';
        }
        break;
      case 'weekly-menu':
        response = 'Te sugiero este menú semanal:\n\n**Lunes:** Pasta con tomate\n**Martes:** Pollo al horno con verduras\n**Miércoles:** Ensalada mediterránea\n**Jueves:** Salmón con arroz\n**Viernes:** Pizza casera\n**Sábado:** Paella\n**Domingo:** Lentejas\n\n¿Quieres que genere la lista de la compra para este menú?';
        break;
      case 'generate-list':
        response = 'Voy a generar una lista de la compra básica para ti. ¿Qué tipo de lista prefieres?\n\n1. Lista básica (productos esenciales)\n2. Lista completa (productos esenciales + extras)\n3. Lista personalizada (basada en tus compras anteriores)';
        break;
      default:
        response = 'No entiendo esa categoría. Por favor, selecciona una de las opciones disponibles.';
    }

    const userMessage: Message = {
      id: generateId(),
      type: 'user',
      content: categories.find(c => c.id === categoryId)?.title || categoryId,
      timestamp: Date.now(),
    };

    const assistantMessage: Message = {
      id: generateId(),
      type: 'assistant',
      content: response,
      timestamp: Date.now() + 1,
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: generateId(),
      type: 'user',
      content: inputValue,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simular respuesta del asistente
    setTimeout(() => {
      const assistantMessage: Message = {
        id: generateId(),
        type: 'assistant',
        content: 'Entiendo tu consulta. ¿Te gustaría que te ayude con alguna de las categorías disponibles? Puedes seleccionar una opción del menú inicial.',
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 500);
  };

  const handleReset = () => {
    setMessages([]);
    setShowCategories(true);
  };

  return (
    <div className="min-h-screen bg-background pb-24 flex flex-col">
      <header className="sticky top-0 z-30 glass border-b border-divider safe-top">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex items-center gap-3">
            {!showCategories && messages.length > 0 && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleReset}
                className="flex-shrink-0"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            )}
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold text-foreground truncate">Asistente</h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">Tu ayudante inteligente</p>
            </div>
          </div>
        </div>
      </header>

      <ScrollArea className="flex-1">
        <div className="px-4 sm:px-6 py-4 max-w-4xl mx-auto">
          {showCategories && messages.length === 0 ? (
            <div className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Card
                      key={category.id}
                      className="cursor-pointer hover:bg-accent/5 transition-smooth active:scale-98"
                      onClick={() => handleCategoryClick(category.id)}
                    >
                      <CardHeader className="p-4 sm:p-6">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="text-2xl sm:text-3xl flex-shrink-0">{category.emoji}</div>
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-base sm:text-lg truncate">{category.title}</CardTitle>
                            <CardDescription className="mt-1 text-xs sm:text-sm line-clamp-2">
                              {category.description}
                            </CardDescription>
                          </div>
                          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground flex-shrink-0" />
                        </div>
                      </CardHeader>
                    </Card>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4 pb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-2 sm:gap-3",
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.type === 'assistant' && (
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[85%] sm:max-w-[80%] rounded-2xl px-3 py-2 sm:px-4 sm:py-3",
                      message.type === 'user'
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-card text-card-foreground shadow-card'
                    )}
                  >
                    <p className="text-xs sm:text-sm whitespace-pre-line break-words">{message.content}</p>
                  </div>
                  {message.type === 'user' && (
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="sticky bottom-16 border-t border-divider bg-background/80 backdrop-blur-xl safe-bottom">
        <div className="px-4 sm:px-6 py-3 sm:py-4 max-w-4xl mx-auto">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Escribe tu mensaje..."
              className="flex-1 text-sm sm:text-base"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              size="icon"
              className="flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}


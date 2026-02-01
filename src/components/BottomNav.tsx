import { cn } from '@/lib/utils';
import { ListTodo, Scale, User, BookOpen, Bot } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/lists', icon: ListTodo, label: 'Listas' },
  { path: '/compare', icon: Scale, label: 'Comparar' },
  { path: '/recetas', icon: BookOpen, label: 'Recetas' },
  { path: '/assistant', icon: Bot, label: 'Asistente' },
  { path: '/profile', icon: User, label: 'Perfil' },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-divider safe-bottom">
      <div className="flex items-center h-14 sm:h-16 max-w-lg mx-auto w-full">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 sm:gap-1 flex-1 h-full tap-target transition-smooth min-w-0",
                isActive ? "text-accent" : "text-muted-foreground"
              )}
            >
              <Icon 
                className={cn(
                  "w-5 h-5 sm:w-6 sm:h-6 transition-smooth flex-shrink-0",
                  isActive && "scale-110"
                )} 
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={cn(
                "text-2xs font-medium leading-tight text-center truncate w-full px-0.5",
                isActive && "font-semibold"
              )}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

interface AppHeaderProps {
  title?: string;
  className?: string;
}

export function AppHeader({ title = 'MySmartBasket', className = '' }: AppHeaderProps) {
  return (
    <header className={`h-16 px-6 bg-white border-b border-divider flex items-center ${className}`}>
      <div className="text-base sm:text-lg font-semibold tracking-wide text-foreground text-left">
        {title}
      </div>
    </header>
  );
}

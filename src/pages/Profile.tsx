import { useEffect, useMemo, useState } from 'react';
import { BottomNav } from '@/components/BottomNav';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { DietaryRestriction } from '@/types';
import { User, Leaf, Award, Settings, BarChart3, Trash2, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { getLocalUser, clearLocalSession } from '@/lib/session';

const dietaryOptions: { key: DietaryRestriction; label: string; emoji: string }[] = [
  { key: 'vegan', label: 'Vegano', emoji: '🥦' },
  { key: 'vegetarian', label: 'Vegetariano', emoji: '🥗' },
  { key: 'carnivore', label: 'Carnívoro', emoji: '🥩' },
  { key: 'keto', label: 'Keto', emoji: '🥑' },
  { key: 'diabetic', label: 'Diabético', emoji: '🩸' },
  { key: 'gluten-free', label: 'Sin Gluten', emoji: '🌾' },
  { key: 'dairy-free', label: 'Sin Lactosa', emoji: '🥛' },
  { key: 'organic', label: 'Solo Ecológico', emoji: '🍃' },
  { key: 'halal', label: 'Halal', emoji: '🕌' },
  { key: 'kosher', label: 'Kosher', emoji: '✡️' },
];

export default function Profile() {
  const {
    preferences,
    stats,
    toggleDietaryRestriction,
    setEcoFriendlyPriority,
    setPreferNational,
    setLowSugar,
    setLowSodium,
  } = useUserPreferences();

  const user = useMemo(() => getLocalUser(), []);

  const [isProfileDialogOpen, setProfileDialogOpen] = useState(false);
  const [isDietDialogOpen, setDietDialogOpen] = useState(false);
  const [isPurchaseDialogOpen, setPurchaseDialogOpen] = useState(false);

  const [tempDietary, setTempDietary] = useState<DietaryRestriction[]>(preferences.dietaryRestrictions);
  const [tempEco, setTempEco] = useState(preferences.ecoFriendlyPriority);
  const [tempNational, setTempNational] = useState(preferences.preferNational);
  const [tempLowSugar, setTempLowSugar] = useState(preferences.lowSugar);
  const [tempLowSodium, setTempLowSodium] = useState(preferences.lowSodium);

  useEffect(() => {
    if (isDietDialogOpen) {
      setTempDietary(preferences.dietaryRestrictions);
    }
  }, [isDietDialogOpen, preferences.dietaryRestrictions]);

  useEffect(() => {
    if (isPurchaseDialogOpen) {
      setTempEco(preferences.ecoFriendlyPriority);
      setTempNational(preferences.preferNational);
      setTempLowSugar(preferences.lowSugar);
      setTempLowSodium(preferences.lowSodium);
    }
  }, [isPurchaseDialogOpen, preferences]);

  const dietDirty = useMemo(() => {
    if (tempDietary.length !== preferences.dietaryRestrictions.length) return true;
    const setA = new Set(tempDietary);
    return preferences.dietaryRestrictions.some((d) => !setA.has(d));
  }, [tempDietary, preferences.dietaryRestrictions]);

  const purchaseDirty = useMemo(() => {
    return (
      tempEco !== preferences.ecoFriendlyPriority ||
      tempNational !== preferences.preferNational ||
      tempLowSugar !== preferences.lowSugar ||
      tempLowSodium !== preferences.lowSodium
    );
  }, [tempEco, tempNational, tempLowSugar, tempLowSodium, preferences]);

  const handleSaveDiet = () => {
    const current = new Set(preferences.dietaryRestrictions);
    const target = new Set(tempDietary);
    dietaryOptions.forEach(({ key }) => {
      const inCurrent = current.has(key);
      const inTarget = target.has(key);
      if (inCurrent !== inTarget) toggleDietaryRestriction(key);
    });
    setDietDialogOpen(false);
  };

  const handleSavePurchase = () => {
    if (tempEco !== preferences.ecoFriendlyPriority) setEcoFriendlyPriority(tempEco);
    if (tempNational !== preferences.preferNational) setPreferNational(tempNational);
    if (tempLowSugar !== preferences.lowSugar) setLowSugar(tempLowSugar);
    if (tempLowSodium !== preferences.lowSodium) setLowSodium(tempLowSodium);
    setPurchaseDialogOpen(false);
  };

  const dietSummary = preferences.dietaryRestrictions.length
    ? preferences.dietaryRestrictions
        .map((d) => dietaryOptions.find((o) => o.key === d)?.label || d)
        .join(', ')
    : 'Sin preferencias seleccionadas';

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-30 glass border-b border-divider safe-top">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-foreground">Perfil</h1>
        </div>
      </header>

      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="px-6 py-4 space-y-6">
          {/* User Card */}
          <button
            className="flex items-center gap-4 p-4 rounded-xl bg-card shadow-card w-full text-left"
            onClick={() => setProfileDialogOpen(true)}
          >
            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
              <User className="w-8 h-8 text-accent" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">{user?.name || 'Usuario Demo'}</h2>
              <p className="text-sm text-muted-foreground">Ver datos personales y ajustes</p>
            </div>
          </button>

          {/* Stats */}
          <section>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-accent" />
              Tus Estadísticas
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-secondary/50 text-center">
                <p className="text-2xl font-bold text-accent">{stats.moneySaved.toFixed(0)} €</p>
                <p className="text-xs text-muted-foreground">Dinero Ahorrado</p>
              </div>
              <div className="p-4 rounded-xl bg-secondary/50 text-center">
                <p className="text-2xl font-bold text-eco-excellent">{stats.ecoPointsEarned}</p>
                <p className="text-xs text-muted-foreground">Puntos Cashback</p>
              </div>
            </div>

            <Link
              to="/estadisticas"
              className={cn(
                "mt-3 w-full inline-flex items-center justify-center gap-2",
                "h-12 rounded-xl bg-secondary text-secondary-foreground",
                "transition-smooth hover:opacity-90 active:scale-98"
              )}
            >
              <BarChart3 className="w-5 h-5" />
              Ver estadísticas
            </Link>
          </section>

          {/* Dietary Preferences */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-accent" />
                <h3 className="font-semibold">Preferencias Dietéticas</h3>
              </div>
              <Button variant="outline" size="sm" onClick={() => setDietDialogOpen(true)}>
                Gestionar
              </Button>
            </div>
          </section>

          {/* Purchase Settings */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-muted-foreground" />
                <h3 className="font-semibold">Ajustes de compra</h3>
              </div>
              <Button variant="outline" size="sm" onClick={() => setPurchaseDialogOpen(true)}>
                Gestionar
              </Button>
            </div>
          </section>
        </div>
      </ScrollArea>

      {/* Profile Dialog */}
      <Dialog open={isProfileDialogOpen} onOpenChange={setProfileDialogOpen}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>Datos de la cuenta</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-3 rounded-xl bg-secondary/50">
              <p className="text-sm text-muted-foreground">Nombre</p>
              <p className="font-semibold">{user?.name || 'Usuario Demo'}</p>
            </div>
            <div className="p-3 rounded-xl bg-secondary/50">
              <p className="text-sm text-muted-foreground">Correo / Usuario</p>
              <p className="font-semibold">demo@mysmartbasket.app</p>
            </div>
            <div className="p-3 rounded-xl bg-secondary/50">
              <p className="text-sm text-muted-foreground">Teléfono</p>
              <p className="font-semibold">+34 600 000 000</p>
            </div>
            <div className="space-y-2">
              <Button variant="outline" className="w-full flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Ajustes de cuenta
              </Button>
              <Button variant="outline" className="w-full flex items-center gap-2" onClick={() => clearLocalSession()}>
                <LogOut className="w-4 h-4" />
                Cerrar sesión
              </Button>
              <Button variant="destructive" className="w-full flex items-center gap-2">
                <Trash2 className="w-4 h-4" />
                Eliminar cuenta (demo)
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dietary Dialog */}
      <Dialog open={isDietDialogOpen} onOpenChange={setDietDialogOpen}>
        <DialogContent className="rounded-2xl max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Preferencias dietéticas</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto pr-1">
            {dietDirty && (
              <Button className="w-full" onClick={handleSaveDiet}>
                Guardar cambios
              </Button>
            )}
            <div className="grid grid-cols-2 gap-2">
              {dietaryOptions.map(({ key, label, emoji }) => {
                const active = tempDietary.includes(key);
                return (
                  <button
                    key={key}
                    onClick={() =>
                      setTempDietary((prev) =>
                        prev.includes(key) ? prev.filter((d) => d !== key) : [...prev, key]
                      )
                    }
                    className={cn(
                      'flex items-center gap-2 p-3 rounded-xl transition-smooth text-left',
                      active ? 'bg-accent text-accent-foreground' : 'bg-secondary text-secondary-foreground'
                    )}
                  >
                    <span className="text-xl">{emoji}</span>
                    <span className="text-sm font-medium">{label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Purchase Settings Dialog */}
      <Dialog open={isPurchaseDialogOpen} onOpenChange={setPurchaseDialogOpen}>
        <DialogContent className="rounded-2xl max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Ajustes de compra</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto pr-1">
            {purchaseDirty && (
              <Button className="w-full" onClick={handleSavePurchase}>
                Guardar cambios
              </Button>
            )}
            <div className="space-y-2">
              <div className="flex items-center justify-between p-4 rounded-xl bg-card shadow-card">
                <div>
                  <p className="font-medium">Prioridad Ecológica</p>
                  <p className="text-sm text-muted-foreground">Preferir productos sostenibles</p>
                </div>
                <Switch checked={tempEco} onCheckedChange={setTempEco} />
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-card shadow-card">
                <div>
                  <p className="font-medium">Producto Nacional</p>
                  <p className="text-sm text-muted-foreground">Preferir productos de España</p>
                </div>
                <Switch checked={tempNational} onCheckedChange={setTempNational} />
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-card shadow-card">
                <div>
                  <p className="font-medium">Bajo en Az?car</p>
                  <p className="text-sm text-muted-foreground">Evitar productos con alto contenido en az?car</p>
                </div>
                <Switch checked={tempLowSugar} onCheckedChange={setTempLowSugar} />
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-card shadow-card">
                <div>
                  <p className="font-medium">Bajo en Sodio</p>
                  <p className="text-sm text-muted-foreground">Evitar productos con alto contenido en sal</p>
                </div>
                <Switch checked={tempLowSodium} onCheckedChange={setTempLowSodium} />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
}

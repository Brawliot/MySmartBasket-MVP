import { useState } from 'react';
import { BottomNav } from '@/components/BottomNav';
import { ShoppingItemCard } from '@/components/ShoppingItemCard';
import { AddItemSheet } from '@/components/AddItemSheet';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { useShoppingList } from '@/hooks/useShoppingList';
import { ClipboardList, Plus, Share2, Lock, LockOpen, ArrowLeft } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import { Switch } from '@/components/ui/switch';

export default function Lists() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [selectedListId, setSelectedListId] = useState<string | null>(null);
  const [newListName, setNewListName] = useState('');
  const [isCollaborative, setIsCollaborative] = useState(false);
  const [shareUserId, setShareUserId] = useState('');
  const [listToShare, setListToShare] = useState<string | null>(null);
  const { toast } = useToast();
  
  const navigate = useNavigate();
  const {
    activeList,
    allLists,
    addItem,
    removeItem,
    toggleItem,
    updateItemQuantity,
    createList,
    closeList,
    shareList,
    reuseList,
  } = useShoppingList();

  const handleCreateList = () => {
    console.log('handleCreateList llamado, newListName:', newListName);
    const trimmedName = newListName.trim();
    console.log('trimmedName:', trimmedName);
    
    if (!trimmedName) {
      console.log('Nombre vacío, no se crea la lista');
      toast({
        title: 'Nombre requerido',
        description: 'Por favor, introduce un nombre para la lista.',
        variant: 'destructive',
      });
      return;
    }
    
    console.log('Creando lista con nombre:', trimmedName);
    const newList = createList(trimmedName, isCollaborative);
    console.log('Lista creada:', newList);
    
    setNewListName('');
    setIsCollaborative(false);
    setIsCreateDialogOpen(false);
    
    toast({
      title: 'Lista creada',
      description: `La lista "${trimmedName}" ha sido creada.`,
    });
  };

  const handleCloseList = () => {
    if (activeList && activeList.items.length > 0) {
      closeList();
      toast({
        title: 'Lista cerrada',
        description: 'La lista ha sido cerrada y se mostrará en Inicio.',
      });
    } else {
      toast({
        title: 'Lista vacía',
        description: 'No puedes cerrar una lista sin elementos.',
        variant: 'destructive',
      });
    }
  };

  const handleShareList = () => {
    if (listToShare && shareUserId.trim()) {
      shareList(listToShare, [shareUserId.trim()]);
      setShareUserId('');
      setIsShareDialogOpen(false);
      setListToShare(null);
      toast({
        title: 'Lista compartida',
        description: 'La lista ha sido compartida con el usuario.',
      });
    }
  };

  const openShareDialog = (listId: string) => {
    setListToShare(listId);
    setIsShareDialogOpen(true);
  };

  const handleSelectList = (listId: string) => {
    const list = allLists.find(l => l.id === listId);
    if (list) {
      if (!list.isClosed) {
        // Si la lista no está cerrada, activarla para editar
        reuseList(listId);
      }
      // Mostrar el contenido de la lista
      setSelectedListId(listId);
    }
  };

  const handleBackToList = () => {
    setSelectedListId(null);
  };

  const handleCloseSelectedList = () => {
    if (selectedListId) {
      const list = allLists.find(l => l.id === selectedListId);
      if (list && !list.isClosed && list.items.length > 0) {
        // Activar la lista si no está activa
        if (activeList?.id !== selectedListId) {
          reuseList(selectedListId);
        }
        closeList();
        toast({
          title: 'Lista cerrada',
          description: 'La lista ha sido cerrada y se mostrará en Inicio.',
        });
        setSelectedListId(null);
      } else if (list && list.items.length === 0) {
        toast({
          title: 'Lista vacía',
          description: 'No puedes cerrar una lista sin elementos.',
          variant: 'destructive',
        });
      }
    }
  };

  // Obtener la lista seleccionada
  const selectedList = selectedListId ? allLists.find(l => l.id === selectedListId) : null;
  const isSelectedListActive = selectedList && activeList?.id === selectedList.id;

  return (
    <div className="min-h-screen bg-background content-bg pb-24">
      <header className="sticky top-0 z-30 glass border-b border-divider safe-top">
        <div className="px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center gap-3">
            {selectedListId && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleBackToList}
                className="flex-shrink-0"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            )}
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold text-foreground truncate">
                {selectedList ? selectedList.name : 'Listas'}
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                {selectedList 
                  ? selectedList.isClosed 
                    ? 'Lista cerrada' 
                    : 'Edita tu lista de compra'
                  : 'Todas tus listas de compra'}
              </p>
            </div>
            {!selectedListId && (
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon" title="Crear nueva lista">
                    <Plus className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent onClick={(e) => e.stopPropagation()}>
                  <DialogHeader>
                    <DialogTitle>Crear Nueva Lista</DialogTitle>
                    <DialogDescription>
                      Crea una nueva lista de compra.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="list-name-header">Nombre de la lista</Label>
                      <Input
                        id="list-name-header"
                        placeholder="Mi Lista de la Compra"
                        value={newListName}
                        onChange={(e) => setNewListName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && newListName.trim()) {
                            e.preventDefault();
                            e.stopPropagation();
                            handleCreateList();
                          }
                        }}
                        autoFocus
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="collaborative-toggle" className="text-sm">Lista colaborativa</Label>
                        <p className="text-xs text-muted-foreground">Permite que los invitados editen</p>
                      </div>
                      <Switch
                        id="collaborative-toggle"
                        checked={isCollaborative}
                        onCheckedChange={setIsCollaborative}
                      />
                    </div>
                    <Button 
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Botón clickeado, newListName:', newListName);
                        console.log('newListName.trim():', newListName.trim());
                        handleCreateList();
                      }}
                      className="w-full"
                      style={{ pointerEvents: 'auto' }}
                    >
                      Crear Lista
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
            {selectedList && !selectedList.isClosed && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => openShareDialog(selectedList.id)}
                  title="Compartir lista"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="px-3 sm:px-6 py-3 sm:py-4 max-w-4xl mx-auto w-full">
          {selectedListId && selectedList ? (
            // Vista de contenido de la lista seleccionada
            <div className="space-y-4 sm:space-y-6 max-w-2xl mx-auto w-full px-1.5">
              {selectedList.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-secondary flex items-center justify-center mb-3 sm:mb-4">
                    <ClipboardList className="w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-base sm:text-lg font-medium text-foreground">Lista vacía</h3>
                  <p className="text-muted-foreground mt-1 text-sm max-w-[240px]">
                    {selectedList.isClosed 
                      ? 'Esta lista está cerrada y no se puede editar.'
                      : 'Añade productos usando el botón +'}
                  </p>
                </div>
              ) : (
                <>
                  {/* Items sin comprar */}
                  <section>
                    <h2 className="font-semibold text-sm sm:text-base text-foreground mb-3">
                      Por Comprar ({selectedList.items.filter(i => !i.checked).length})
                    </h2>
                    <div className="space-y-2 sm:space-y-3">
                      {selectedList.items
                        .filter(item => !item.checked)
                        .map(item => (
                          <ShoppingItemCard
                            key={item.id}
                            item={item}
                            onToggle={isSelectedListActive ? toggleItem : () => {}}
                            onUpdateQuantity={isSelectedListActive ? updateItemQuantity : () => {}}
                            onRemove={isSelectedListActive ? removeItem : () => {}}
                          />
                        ))}
                    </div>
                  </section>

                  {/* Items comprados */}
                  {selectedList.items.filter(i => i.checked).length > 0 && (
                    <section>
                      <h2 className="font-semibold text-sm sm:text-base text-muted-foreground mb-3">
                        En el Carrito ({selectedList.items.filter(i => i.checked).length})
                      </h2>
                      <div className="space-y-2 sm:space-y-3">
                        {selectedList.items
                          .filter(item => item.checked)
                          .map(item => (
                            <ShoppingItemCard
                              key={item.id}
                              item={item}
                              onToggle={isSelectedListActive ? toggleItem : () => {}}
                              onUpdateQuantity={isSelectedListActive ? updateItemQuantity : () => {}}
                              onRemove={isSelectedListActive ? removeItem : () => {}}
                            />
                          ))}
                      </div>
                    </section>
                  )}

                  {/* Botón para cerrar lista */}
                  {!selectedList.isClosed && selectedList.items.length > 0 && (
                    <Button
                      onClick={handleCloseSelectedList}
                      className={cn(
                        "w-full flex items-center justify-center gap-2 mx-auto",
                        "bg-accent text-accent-foreground"
                      )}
                    >
                      <Lock className="w-4 h-4" />
                      Cerrar Lista
                    </Button>
                  )}
                </>
              )}
            </div>
          ) : allLists.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
                <ClipboardList className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground">No hay listas</h3>
              <p className="text-muted-foreground mt-1 max-w-[240px] mb-4">
                Crea una nueva lista para empezar
              </p>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Crear Lista
                  </Button>
                </DialogTrigger>
                <DialogContent onClick={(e) => e.stopPropagation()}>
                  <DialogHeader>
                    <DialogTitle>Crear Nueva Lista</DialogTitle>
                    <DialogDescription>
                      Crea una nueva lista de compra.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="list-name-empty">Nombre de la lista</Label>
                      <Input
                        id="list-name-empty"
                        placeholder="Mi Lista de la Compra"
                        value={newListName}
                        onChange={(e) => setNewListName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && newListName.trim()) {
                            e.preventDefault();
                            e.stopPropagation();
                            handleCreateList();
                          }
                        }}
                        autoFocus
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="collaborative-toggle-empty" className="text-sm">Lista colaborativa</Label>
                        <p className="text-xs text-muted-foreground">Permite que los invitados editen</p>
                      </div>
                      <Switch
                        id="collaborative-toggle-empty"
                        checked={isCollaborative}
                        onCheckedChange={setIsCollaborative}
                      />
                    </div>
                    <Button 
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Botón clickeado, newListName:', newListName);
                        console.log('newListName.trim():', newListName.trim());
                        handleCreateList();
                      }}
                      className="w-full"
                      style={{ pointerEvents: 'auto' }}
                    >
                      Crear Lista
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ) : (
            <div className="space-y-2 sm:space-y-3">
              {allLists.map((list) => {
                const itemCount = list.items.length;
                const checkedCount = list.items.filter(i => i.checked).length;
                const isActive = activeList?.id === list.id;
                const isClosed = list.isClosed;

                return (
                  <div
                    key={list.id}
                    className={cn(
                      "flex items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-xl bg-card shadow-card",
                      !isClosed && "cursor-pointer hover:bg-accent/5 transition-smooth active:scale-98",
                      isActive && "ring-2 ring-accent"
                    )}
                    onClick={() => !isClosed && handleSelectList(list.id)}
                  >
                    {/* Icon with lock status */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                      {isClosed ? (
                        <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                      ) : (
                        <LockOpen className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                        <h3 className="font-medium text-sm sm:text-base text-card-foreground truncate">{list.name}</h3>
                        {isActive && (
                          <span className="text-xs px-1.5 sm:px-2 py-0.5 rounded-full bg-accent/20 text-accent whitespace-nowrap">
                            Activa
                          </span>
                        )}
                        {isClosed && (
                          <span className="text-xs px-1.5 sm:px-2 py-0.5 rounded-full bg-secondary text-muted-foreground whitespace-nowrap">
                            Cerrada
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                        {itemCount} productos {checkedCount > 0 && `• ${checkedCount} comprados`}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDistanceToNow(list.updatedAt, { addSuffix: true, locale: es })}
                      </p>
                    </div>

                    {/* Actions */}
                    {!isClosed && (
                      <div className="flex gap-1 sm:gap-2 flex-shrink-0">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 sm:h-10 sm:w-10"
                          onClick={(e) => {
                            e.stopPropagation();
                            openShareDialog(list.id);
                          }}
                          title="Compartir lista"
                        >
                          <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* FAB */}
      {selectedList && !selectedList.isClosed && isSelectedListActive && (
        <FloatingActionButton onClick={() => setIsAddSheetOpen(true)} />
      )}

      {/* Add Item Sheet */}
      {selectedList && !selectedList.isClosed && isSelectedListActive && (
        <AddItemSheet
          open={isAddSheetOpen}
          onOpenChange={setIsAddSheetOpen}
          onAddItem={(product) => {
            addItem(product);
            setIsAddSheetOpen(false);
          }}
        />
      )}

      {/* Share Dialog */}
      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Compartir Lista</DialogTitle>
            <DialogDescription>
              Introduce el ID del usuario con el que quieres compartir la lista.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="user-id">ID del Usuario</Label>
              <Input
                id="user-id"
                placeholder="usuario@ejemplo.com"
                value={shareUserId}
                onChange={(e) => setShareUserId(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleShareList();
                  }
                }}
              />
            </div>
            <Button onClick={handleShareList} className="w-full">
              Compartir
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
}

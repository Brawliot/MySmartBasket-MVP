import { useCallback, useMemo } from 'react';
import { ShoppingList, ShoppingItem, Product, ProductFrequency } from '@/types';
import { useLocalStorage } from './useLocalStorage';
import { getProductById } from '@/data/products';
import { generateId } from '@/lib/id';

const ACTIVE_LIST_KEY = 'smart-basket-active-list';
const LIST_HISTORY_KEY = 'smart-basket-history';
const FREQUENCY_KEY = 'smart-basket-frequency';

export function useShoppingList() {
  const [activeList, setActiveList] = useLocalStorage<ShoppingList | null>(ACTIVE_LIST_KEY, null);
  const [listHistory, setListHistory] = useLocalStorage<ShoppingList[]>(LIST_HISTORY_KEY, []);
  const [productFrequency, setProductFrequency] = useLocalStorage<ProductFrequency[]>(FREQUENCY_KEY, []);

  // Create a new list
  const createList = useCallback((name: string = 'Mi Lista de la Compra', isCollaborative = false) => {
    const newList: ShoppingList = {
      id: generateId(),
      name,
      isCollaborative,
      sharedWith: [],
      items: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setActiveList(newList);
    return newList;
  }, [setActiveList]);

  // Add item to active list
  const addItem = useCallback((product: Product, quantity?: number, notes?: string) => {
    if (!activeList) {
      const newList = createList();
      const item: ShoppingItem = {
        id: generateId(),
        productId: product.id,
        name: product.name,
        quantity: quantity || product.defaultQuantity,
        unit: product.unit,
        category: product.category,
        checked: false,
        notes,
        ecoScore: product.ecoScore,
        addedAt: Date.now(),
      };
      setActiveList({ ...newList, items: [item], updatedAt: Date.now() });
    } else {
      // Check if item already exists
      const existingIndex = activeList.items.findIndex(i => i.productId === product.id && !i.checked);
      if (existingIndex >= 0) {
        // Increase quantity
        const updatedItems = [...activeList.items];
        updatedItems[existingIndex].quantity += quantity || product.defaultQuantity;
        setActiveList({ ...activeList, items: updatedItems, updatedAt: Date.now() });
      } else {
        const item: ShoppingItem = {
          id: generateId(),
          productId: product.id,
          name: product.name,
          quantity: quantity || product.defaultQuantity,
          unit: product.unit,
          category: product.category,
          checked: false,
          notes,
          ecoScore: product.ecoScore,
          addedAt: Date.now(),
        };
        setActiveList({
          ...activeList,
          items: [...activeList.items, item],
          updatedAt: Date.now(),
        });
      }
    }

    // Update frequency tracking
    setProductFrequency(prev => {
      const existing = prev.find(f => f.productId === product.id);
      if (existing) {
        return prev.map(f =>
          f.productId === product.id
            ? { ...f, count: f.count + 1, lastAdded: Date.now(), averageQuantity: (f.averageQuantity + (quantity || product.defaultQuantity)) / 2 }
            : f
        );
      }
      return [...prev, { productId: product.id, count: 1, lastAdded: Date.now(), averageQuantity: quantity || product.defaultQuantity }];
    });
  }, [activeList, createList, setActiveList, setProductFrequency]);

  // Remove item from list
  const removeItem = useCallback((itemId: string) => {
    if (!activeList) return;
    setActiveList({
      ...activeList,
      items: activeList.items.filter(i => i.id !== itemId),
      updatedAt: Date.now(),
    });
  }, [activeList, setActiveList]);

  // Toggle item checked status
  const toggleItem = useCallback((itemId: string) => {
    if (!activeList) return;
    setActiveList({
      ...activeList,
      items: activeList.items.map(i =>
        i.id === itemId
          ? { ...i, checked: !i.checked, checkedAt: !i.checked ? Date.now() : undefined }
          : i
      ),
      updatedAt: Date.now(),
    });
  }, [activeList, setActiveList]);

  // Update item quantity
  const updateItemQuantity = useCallback((itemId: string, quantity: number) => {
    if (!activeList || quantity < 0) return;
    if (quantity === 0) {
      removeItem(itemId);
      return;
    }
    setActiveList({
      ...activeList,
      items: activeList.items.map(i =>
        i.id === itemId ? { ...i, quantity } : i
      ),
      updatedAt: Date.now(),
    });
  }, [activeList, removeItem, setActiveList]);

  // Update item notes
  const updateItemNotes = useCallback((itemId: string, notes: string) => {
    if (!activeList) return;
    setActiveList({
      ...activeList,
      items: activeList.items.map(i =>
        i.id === itemId ? { ...i, notes } : i
      ),
      updatedAt: Date.now(),
    });
  }, [activeList, setActiveList]);

  // Complete shopping (save to history)
  const completeList = useCallback(() => {
    if (!activeList) return;
    const completedList: ShoppingList = {
      ...activeList,
      updatedAt: Date.now(),
    };
    setListHistory(prev => [completedList, ...prev].slice(0, 20)); // Keep last 20 lists
    setActiveList(null);
  }, [activeList, setActiveList, setListHistory]);

  // Close a list (mark as closed and save to history)
  const closeList = useCallback(() => {
    if (!activeList || activeList.items.length === 0) return;
    const closedList: ShoppingList = {
      ...activeList,
      isClosed: true,
      closedAt: Date.now(),
      updatedAt: Date.now(),
    };
    setListHistory(prev => [closedList, ...prev].slice(0, 50)); // Keep last 50 lists
    setActiveList(null);
  }, [activeList, setActiveList, setListHistory]);

  // Share a list with other users
  const shareList = useCallback((listId: string, userIds: string[]) => {
    // Find list in history or active list
    let listToShare: ShoppingList | undefined = listHistory.find(l => l.id === listId);
    if (!listToShare && activeList?.id === listId) {
      listToShare = activeList;
    }
    
    if (!listToShare) return;

    const canEdit = Boolean(listToShare.isCollaborative);
    const existing = listToShare.sharedWith || [];
    const existingIds = new Set(existing.map(s => s.userId));
    const newShares = userIds
      .filter(id => !existingIds.has(id))
      .map(id => ({ userId: id, canEdit }));

    const sharedList: ShoppingList = {
      ...listToShare,
      sharedWith: [...existing, ...newShares],
      updatedAt: Date.now(),
    };
    
    if (activeList?.id === listId) {
      setActiveList(sharedList);
    } else {
      setListHistory(prev => prev.map(l => l.id === listId ? sharedList : l));
    }
  }, [activeList, listHistory, setActiveList, setListHistory]);

  // Reuse a previous list
  const reuseList = useCallback((listId: string) => {
    const listToReuse = listHistory.find(l => l.id === listId);
    if (!listToReuse) return;
    
    const newList: ShoppingList = {
      ...listToReuse,
      id: generateId(),
      items: listToReuse.items.map(i => ({ ...i, id: generateId(), checked: false, checkedAt: undefined })),
      sharedWith: listToReuse.sharedWith ? [...listToReuse.sharedWith] : [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setActiveList(newList);
  }, [listHistory, setActiveList]);

  // Clear active list
  const clearList = useCallback(() => {
    setActiveList(null);
  }, [setActiveList]);

  // Get smart suggestions based on frequency
  const suggestions = useMemo(() => {
    const frequentProducts = productFrequency
      .filter(f => f.count >= 2) // Items added at least twice
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    const activeProductIds = new Set(activeList?.items.map(i => i.productId) || []);
    
    return frequentProducts
      .filter(f => !activeProductIds.has(f.productId))
      .map(f => {
        const product = getProductById(f.productId);
        return product ? { product, frequency: f } : null;
      })
      .filter(Boolean) as { product: Product; frequency: ProductFrequency }[];
  }, [productFrequency, activeList]);

  // Calculate estimated total
  const estimatedTotal = useMemo(() => {
    if (!activeList) return 0;
    return activeList.items.reduce((sum, item) => {
      const product = getProductById(item.productId);
      return sum + (product?.averagePrice || 0) * item.quantity;
    }, 0);
  }, [activeList]);

  // Calculate progress
  const progress = useMemo(() => {
    if (!activeList || activeList.items.length === 0) return { checked: 0, total: 0, percentage: 0 };
    const checked = activeList.items.filter(i => i.checked).length;
    const total = activeList.items.length;
    return { checked, total, percentage: Math.round((checked / total) * 100) };
  }, [activeList]);

  // Group items by category
  const itemsByCategory = useMemo(() => {
    if (!activeList) return new Map();
    const grouped = new Map<string, ShoppingItem[]>();
    activeList.items.forEach(item => {
      const existing = grouped.get(item.category) || [];
      grouped.set(item.category, [...existing, item]);
    });
    return grouped;
  }, [activeList]);

  // Get closed lists (for display in Inicio)
  const closedLists = useMemo(() => {
    return listHistory.filter(list => list.isClosed).sort((a, b) => (b.closedAt || 0) - (a.closedAt || 0));
  }, [listHistory]);

  // Get all lists (active + history)
  const allLists = useMemo(() => {
    const lists: ShoppingList[] = [];
    if (activeList && !activeList.isClosed) {
      lists.push(activeList);
    }
    lists.push(...listHistory);
    return lists;
  }, [activeList, listHistory]);

  return {
    activeList,
    listHistory,
    closedLists,
    allLists,
    suggestions,
    estimatedTotal,
    progress,
    itemsByCategory,
    productFrequency,
    createList,
    addItem,
    removeItem,
    toggleItem,
    updateItemQuantity,
    updateItemNotes,
    completeList,
    closeList,
    shareList,
    reuseList,
    clearList,
  };
}

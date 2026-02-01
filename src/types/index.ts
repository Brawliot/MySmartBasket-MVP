// Product and Shopping List Types

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  unit: string;
  defaultQuantity: number;
  ecoScore: EcoScore;
  isOrganic?: boolean;
  isLocal?: boolean;
  averagePrice: number;
  emoji?: string;
}

export type ProductCategory = 
  | 'fruits'
  | 'vegetables'
  | 'dairy'
  | 'meat'
  | 'seafood'
  | 'bakery'
  | 'pantry'
  | 'frozen'
  | 'beverages'
  | 'snacks'
  | 'household'
  | 'personal';

export type EcoScore = 'A' | 'B' | 'C' | 'D' | 'E';

export interface ShoppingItem {
  id: string;
  productId: string;
  name: string;
  quantity: number;
  unit: string;
  category: ProductCategory;
  checked: boolean;
  notes?: string;
  ecoScore: EcoScore;
  addedAt: number;
  checkedAt?: number;
  isSuggested?: boolean;
}

export interface ShoppingList {
  id: string;
  name: string;
  items: ShoppingItem[];
  createdAt: number;
  updatedAt: number;
  isTemplate?: boolean;
  estimatedTotal?: number;
  isClosed?: boolean;
  closedAt?: number;
  isCollaborative?: boolean;
  sharedWith?: { userId: string; canEdit: boolean }[]; // Usuarios con permisos
  ownerId?: string; // ID del usuario propietario
}

export interface UserPreferences {
  dietaryRestrictions: DietaryRestriction[];
  preferredStores: string[];
  ecoFriendlyPriority: boolean;
  notificationsEnabled: boolean;
  preferNational: boolean;
  lowSugar: boolean;
  lowSodium: boolean;
}

export type DietaryRestriction = 
  | 'vegan'
  | 'vegetarian'
  | 'carnivore'
  | 'keto'
  | 'diabetic'
  | 'gluten-free'
  | 'dairy-free'
  | 'organic'
  | 'halal'
  | 'kosher';

export interface Supermarket {
  id: string;
  name: string;
  logo: string;
  color: string;
  distance: number;
  hasOnlineOrdering: boolean;
}

export interface PriceComparison {
  supermarketId: string;
  supermarket: Supermarket;
  totalPrice: number;
  itemPrices: { itemId: string; price: number }[];
  savings?: number;
}

export interface ProductFrequency {
  productId: string;
  count: number;
  lastAdded: number;
  averageQuantity: number;
}

export interface UserStats {
  totalLists: number;
  totalItemsPurchased: number;
  moneySaved: number;
  ecoPointsEarned: number;
  averageBasketSize: number;
}

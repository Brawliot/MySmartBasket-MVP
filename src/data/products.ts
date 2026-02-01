import { Product, ProductCategory, Supermarket } from '@/types';

// Base de datos de productos españoles
export const products: Product[] = [
  // Frutas
  { id: 'manzana', name: 'Manzanas', category: 'fruits', unit: 'kg', defaultQuantity: 1, ecoScore: 'A', isLocal: true, averagePrice: 2.49, emoji: '🍎' },
  { id: 'platano', name: 'Plátanos', category: 'fruits', unit: 'kg', defaultQuantity: 1, ecoScore: 'B', averagePrice: 1.69, emoji: '🍌' },
  { id: 'naranja', name: 'Naranjas', category: 'fruits', unit: 'kg', defaultQuantity: 1, ecoScore: 'A', isLocal: true, averagePrice: 1.99, emoji: '🍊' },
  { id: 'fresa', name: 'Fresas', category: 'fruits', unit: 'bandeja', defaultQuantity: 1, ecoScore: 'B', averagePrice: 3.49, emoji: '🍓' },
  { id: 'aguacate', name: 'Aguacates', category: 'fruits', unit: 'ud', defaultQuantity: 2, ecoScore: 'C', averagePrice: 1.89, emoji: '🥑' },
  { id: 'limon', name: 'Limones', category: 'fruits', unit: 'ud', defaultQuantity: 3, ecoScore: 'A', isLocal: true, averagePrice: 0.35, emoji: '🍋' },
  { id: 'melocoton', name: 'Melocotones', category: 'fruits', unit: 'kg', defaultQuantity: 1, ecoScore: 'A', isLocal: true, averagePrice: 2.99, emoji: '🍑' },
  { id: 'uva', name: 'Uvas', category: 'fruits', unit: 'kg', defaultQuantity: 0.5, ecoScore: 'A', isLocal: true, averagePrice: 3.29, emoji: '🍇' },
  
  // Verduras
  { id: 'tomate', name: 'Tomates', category: 'vegetables', unit: 'kg', defaultQuantity: 0.5, ecoScore: 'A', isLocal: true, averagePrice: 2.49, emoji: '🍅' },
  { id: 'zanahoria', name: 'Zanahorias', category: 'vegetables', unit: 'kg', defaultQuantity: 1, ecoScore: 'A', isLocal: true, averagePrice: 1.29, emoji: '🥕' },
  { id: 'brocoli', name: 'Brócoli', category: 'vegetables', unit: 'ud', defaultQuantity: 1, ecoScore: 'A', averagePrice: 1.89, emoji: '🥦' },
  { id: 'espinaca', name: 'Espinacas', category: 'vegetables', unit: 'bolsa', defaultQuantity: 1, ecoScore: 'A', isOrganic: true, averagePrice: 2.49, emoji: '🥬' },
  { id: 'patata', name: 'Patatas', category: 'vegetables', unit: 'kg', defaultQuantity: 2, ecoScore: 'A', isLocal: true, averagePrice: 1.19, emoji: '🥔' },
  { id: 'cebolla', name: 'Cebollas', category: 'vegetables', unit: 'kg', defaultQuantity: 1, ecoScore: 'A', isLocal: true, averagePrice: 1.09, emoji: '🧅' },
  { id: 'ajo', name: 'Ajos', category: 'vegetables', unit: 'cabeza', defaultQuantity: 1, ecoScore: 'A', isLocal: true, averagePrice: 0.69, emoji: '🧄' },
  { id: 'pepino', name: 'Pepinos', category: 'vegetables', unit: 'ud', defaultQuantity: 1, ecoScore: 'A', averagePrice: 0.79, emoji: '🥒' },
  { id: 'pimiento', name: 'Pimientos', category: 'vegetables', unit: 'kg', defaultQuantity: 0.5, ecoScore: 'A', isLocal: true, averagePrice: 2.99, emoji: '🫑' },
  { id: 'lechuga', name: 'Lechuga', category: 'vegetables', unit: 'ud', defaultQuantity: 1, ecoScore: 'A', isLocal: true, averagePrice: 0.99, emoji: '🥬' },
  
  // Lácteos
  { id: 'leche', name: 'Leche', category: 'dairy', unit: 'L', defaultQuantity: 1, ecoScore: 'B', averagePrice: 1.19, emoji: '🥛' },
  { id: 'huevos', name: 'Huevos', category: 'dairy', unit: 'docena', defaultQuantity: 1, ecoScore: 'B', averagePrice: 2.99, emoji: '🥚' },
  { id: 'queso-manchego', name: 'Queso Manchego', category: 'dairy', unit: 'cuña', defaultQuantity: 1, ecoScore: 'C', isLocal: true, averagePrice: 4.99, emoji: '🧀' },
  { id: 'mantequilla', name: 'Mantequilla', category: 'dairy', unit: 'bloque', defaultQuantity: 1, ecoScore: 'C', averagePrice: 2.49, emoji: '🧈' },
  { id: 'yogur', name: 'Yogures', category: 'dairy', unit: 'pack', defaultQuantity: 1, ecoScore: 'B', averagePrice: 2.29, emoji: '🥛' },
  { id: 'nata', name: 'Nata para cocinar', category: 'dairy', unit: 'brick', defaultQuantity: 1, ecoScore: 'B', averagePrice: 1.49, emoji: '🥛' },
  
  // Carne
  { id: 'pollo', name: 'Pechuga de pollo', category: 'meat', unit: 'kg', defaultQuantity: 0.5, ecoScore: 'C', averagePrice: 7.99, emoji: '🍗' },
  { id: 'ternera', name: 'Carne picada de ternera', category: 'meat', unit: 'kg', defaultQuantity: 0.5, ecoScore: 'D', isLocal: true, averagePrice: 9.99, emoji: '🥩' },
  { id: 'jamon-serrano', name: 'Jamón Serrano', category: 'meat', unit: 'sobre', defaultQuantity: 1, ecoScore: 'C', isLocal: true, averagePrice: 3.99, emoji: '🥓' },
  { id: 'chorizo', name: 'Chorizo', category: 'meat', unit: 'ud', defaultQuantity: 1, ecoScore: 'C', isLocal: true, averagePrice: 2.99, emoji: '🌭' },
  { id: 'lomo', name: 'Lomo de cerdo', category: 'meat', unit: 'kg', defaultQuantity: 0.5, ecoScore: 'C', averagePrice: 8.49, emoji: '🥩' },
  
  // Pescado y marisco
  { id: 'salmon', name: 'Salmón', category: 'seafood', unit: 'kg', defaultQuantity: 0.3, ecoScore: 'B', averagePrice: 14.99, emoji: '🐟' },
  { id: 'merluza', name: 'Merluza', category: 'seafood', unit: 'kg', defaultQuantity: 0.5, ecoScore: 'B', isLocal: true, averagePrice: 12.99, emoji: '🐟' },
  { id: 'gambas', name: 'Gambas', category: 'seafood', unit: 'kg', defaultQuantity: 0.3, ecoScore: 'C', averagePrice: 15.99, emoji: '🦐' },
  { id: 'mejillones', name: 'Mejillones', category: 'seafood', unit: 'kg', defaultQuantity: 1, ecoScore: 'A', isLocal: true, averagePrice: 4.99, emoji: '🦪' },
  
  // Panadería
  { id: 'pan', name: 'Barra de pan', category: 'bakery', unit: 'ud', defaultQuantity: 1, ecoScore: 'A', isLocal: true, averagePrice: 0.89, emoji: '🥖' },
  { id: 'pan-molde', name: 'Pan de molde', category: 'bakery', unit: 'bolsa', defaultQuantity: 1, ecoScore: 'B', averagePrice: 1.49, emoji: '🍞' },
  { id: 'croissant', name: 'Croissants', category: 'bakery', unit: 'pack', defaultQuantity: 1, ecoScore: 'B', averagePrice: 2.49, emoji: '🥐' },
  { id: 'magdalenas', name: 'Magdalenas', category: 'bakery', unit: 'pack', defaultQuantity: 1, ecoScore: 'B', isLocal: true, averagePrice: 1.99, emoji: '🧁' },
  
  // Despensa
  { id: 'arroz', name: 'Arroz', category: 'pantry', unit: 'kg', defaultQuantity: 1, ecoScore: 'A', averagePrice: 1.79, emoji: '🍚' },
  { id: 'pasta', name: 'Pasta', category: 'pantry', unit: 'paquete', defaultQuantity: 1, ecoScore: 'A', averagePrice: 1.29, emoji: '🍝' },
  { id: 'aceite-oliva', name: 'Aceite de Oliva Virgen Extra', category: 'pantry', unit: 'botella', defaultQuantity: 1, ecoScore: 'A', isLocal: true, averagePrice: 8.99, emoji: '🫒' },
  { id: 'tomate-frito', name: 'Tomate frito', category: 'pantry', unit: 'bote', defaultQuantity: 1, ecoScore: 'A', averagePrice: 1.49, emoji: '🍅' },
  { id: 'garbanzos', name: 'Garbanzos cocidos', category: 'pantry', unit: 'bote', defaultQuantity: 1, ecoScore: 'A', averagePrice: 1.29, emoji: '🫘' },
  { id: 'lentejas', name: 'Lentejas', category: 'pantry', unit: 'paquete', defaultQuantity: 1, ecoScore: 'A', averagePrice: 1.69, emoji: '🫘' },
  { id: 'atun', name: 'Atún en conserva', category: 'pantry', unit: 'pack', defaultQuantity: 1, ecoScore: 'B', averagePrice: 3.99, emoji: '🐟' },
  
  // Bebidas
  { id: 'cafe', name: 'Café molido', category: 'beverages', unit: 'paquete', defaultQuantity: 1, ecoScore: 'B', averagePrice: 4.99, emoji: '☕' },
  { id: 'vino-tinto', name: 'Vino Tinto Rioja', category: 'beverages', unit: 'botella', defaultQuantity: 1, ecoScore: 'B', isLocal: true, averagePrice: 5.99, emoji: '🍷' },
  { id: 'cerveza', name: 'Cerveza', category: 'beverages', unit: 'pack', defaultQuantity: 1, ecoScore: 'B', isLocal: true, averagePrice: 4.49, emoji: '🍺' },
  { id: 'agua', name: 'Agua mineral', category: 'beverages', unit: 'pack', defaultQuantity: 1, ecoScore: 'B', averagePrice: 2.99, emoji: '💧' },
  { id: 'zumo-naranja', name: 'Zumo de naranja', category: 'beverages', unit: 'brick', defaultQuantity: 1, ecoScore: 'B', averagePrice: 2.29, emoji: '🧃' },
  
  // Snacks
  { id: 'patatas-fritas', name: 'Patatas fritas', category: 'snacks', unit: 'bolsa', defaultQuantity: 1, ecoScore: 'C', averagePrice: 1.99, emoji: '🥔' },
  { id: 'chocolate', name: 'Chocolate con leche', category: 'snacks', unit: 'tableta', defaultQuantity: 1, ecoScore: 'B', averagePrice: 1.89, emoji: '🍫' },
  { id: 'frutos-secos', name: 'Frutos secos variados', category: 'snacks', unit: 'bolsa', defaultQuantity: 1, ecoScore: 'A', averagePrice: 4.99, emoji: '🥜' },
  { id: 'galletas', name: 'Galletas María', category: 'snacks', unit: 'paquete', defaultQuantity: 1, ecoScore: 'B', averagePrice: 1.49, emoji: '🍪' },
  
  // Hogar
  { id: 'papel-cocina', name: 'Papel de cocina', category: 'household', unit: 'pack', defaultQuantity: 1, ecoScore: 'C', averagePrice: 3.99, emoji: '🧻' },
  { id: 'lavavajillas', name: 'Lavavajillas', category: 'household', unit: 'botella', defaultQuantity: 1, ecoScore: 'B', averagePrice: 2.49, emoji: '🧴' },
  { id: 'bolsas-basura', name: 'Bolsas de basura', category: 'household', unit: 'rollo', defaultQuantity: 1, ecoScore: 'C', averagePrice: 2.99, emoji: '🗑️' },
  { id: 'detergente', name: 'Detergente ropa', category: 'household', unit: 'botella', defaultQuantity: 1, ecoScore: 'C', averagePrice: 6.99, emoji: '🧺' },
  
  // Cuidado personal
  { id: 'pasta-dientes', name: 'Pasta de dientes', category: 'personal', unit: 'tubo', defaultQuantity: 1, ecoScore: 'B', averagePrice: 2.49, emoji: '🪥' },
  { id: 'champu', name: 'Champú', category: 'personal', unit: 'botella', defaultQuantity: 1, ecoScore: 'B', averagePrice: 3.99, emoji: '🧴' },
  { id: 'gel-ducha', name: 'Gel de ducha', category: 'personal', unit: 'botella', defaultQuantity: 1, ecoScore: 'B', averagePrice: 2.99, emoji: '🧴' },
];

// Supermercados españoles
export const supermarkets: Supermarket[] = [
  { id: 'mercadona', name: 'Mercadona', logo: '🛒', color: '#00A650', distance: 0.5, hasOnlineOrdering: true },
  { id: 'carrefour', name: 'Carrefour', logo: '🏪', color: '#004E9A', distance: 1.2, hasOnlineOrdering: true },
  { id: 'dia', name: 'Día', logo: '🔴', color: '#E30613', distance: 0.3, hasOnlineOrdering: true },
  { id: 'lidl', name: 'Lidl', logo: '🟡', color: '#0050AA', distance: 1.8, hasOnlineOrdering: false },
  { id: 'alcampo', name: 'Alcampo', logo: '🛍️', color: '#E4002B', distance: 3.5, hasOnlineOrdering: true },
];

// Metadatos de categorías en español
export const categoryMeta: Record<ProductCategory, { name: string; emoji: string; color: string }> = {
  fruits: { name: 'Frutas', emoji: '🍎', color: '#FF6B6B' },
  vegetables: { name: 'Verduras', emoji: '🥬', color: '#4CAF50' },
  dairy: { name: 'Lácteos', emoji: '🥛', color: '#90CAF9' },
  meat: { name: 'Carnes', emoji: '🥩', color: '#A1887F' },
  seafood: { name: 'Pescado', emoji: '🐟', color: '#4DD0E1' },
  bakery: { name: 'Panadería', emoji: '🥖', color: '#FFCC80' },
  pantry: { name: 'Despensa', emoji: '🥫', color: '#FFAB91' },
  frozen: { name: 'Congelados', emoji: '🧊', color: '#B3E5FC' },
  beverages: { name: 'Bebidas', emoji: '☕', color: '#CE93D8' },
  snacks: { name: 'Snacks', emoji: '🍿', color: '#FFF59D' },
  household: { name: 'Hogar', emoji: '🏠', color: '#B0BEC5' },
  personal: { name: 'Cuidado Personal', emoji: '🧴', color: '#F8BBD9' },
};

// Get product by ID
export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

// Search products
export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.category.toLowerCase().includes(lowerQuery)
  );
}

// Get products by category
export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter(p => p.category === category);
}

// Generate mock prices for a basket
export function generateMockPrices(itemIds: string[]): Map<string, Map<string, number>> {
  const priceMap = new Map<string, Map<string, number>>();
  
  supermarkets.forEach(supermarket => {
    const storePrices = new Map<string, number>();
    itemIds.forEach(itemId => {
      const product = getProductById(itemId);
      if (product) {
        // Generate slightly different prices per store
        const variance = 0.85 + Math.random() * 0.3; // 85% to 115%
        const price = Math.round(product.averagePrice * variance * 100) / 100;
        storePrices.set(itemId, price);
      }
    });
    priceMap.set(supermarket.id, storePrices);
  });
  
  return priceMap;
}

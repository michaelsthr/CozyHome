// Base item structure that comes from the database
export interface KuehlschrankItem {
  $id: string;
  name: string;
  anzahl: number;
  kategorie?: string;
  mhd?: string; // MHD = Mindesthaltbarkeitsdatum (expiration date)
  $createdAt?: string;
  $updatedAt?: string;
}

// Structure for creating new items (without database-generated fields)
export interface NewKuehlschrankItem {
  name: string;
  anzahl: number;
  kategorie?: string;
  mhd?: string;
}

// Enum for predefined fridge categories
export enum FridgeCategories {
  DAIRY = 'Milchprodukte',
  MEAT = 'Fleisch',
  VEGETABLES = 'Gemüse',
  FRUITS = 'Obst',
  DRINKS = 'Getränke',
  SNACKS = 'Snacks',
  FROZEN = 'Tiefgefroren'
}

// Type for fridge category values
export type FridgeCategoryType = `${FridgeCategories}`;

// Helper function to get all available categories
export const getAllFridgeCategories = (): FridgeCategoryType[] => {
  return Object.values(FridgeCategories);
};

// Optional: Interface for category display information
export interface CategoryDisplayInfo {
  label: string;
  color: string;
}

// Optional: Sort options type
export type SortField = 'name' | 'category' | 'amount';
export type SortDirection = 'asc' | 'desc';

// Optional: Filter options type
export type FilterOption = FridgeCategoryType | 'ALL';
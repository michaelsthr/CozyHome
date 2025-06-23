import { FridgeCategoryType } from '../../../../../lib/constants/categories';

// Base item structure that comes from the database
export interface KuehlschrankItem {
  $id: string;
  name: string;
  anzahl: number;
  kategorie?: FridgeCategoryType;
  mhd?: string; // MHD = Mindesthaltbarkeitsdatum (expiration date)
  $createdAt?: string;
  $updatedAt?: string;
}

// Structure for creating new items (without database-generated fields)
export interface NewKuehlschrankItem {
  name: string;
  anzahl: number;
  kategorie?: FridgeCategoryType;
  mhd?: string;
}

// Re-export the categories from the constants
export { FridgeCategories, FridgeCategoryType, getAllFridgeCategories } from '../../../../../lib/constants/categories';

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
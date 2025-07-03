import { FridgeCategoryType } from '../constants/categories';

export interface KuehlschrankItem {
  $id: string;
  name: string;
  anzahl: number;
  kategorie?: FridgeCategoryType;
  mhd?: string; // MHD = Mindesthaltbarkeitsdatum (expiration date)
  $createdAt?: string;
  $updatedAt?: string;
}

export interface NewKuehlschrankItem {
  name: string;
  anzahl: number;
  kategorie?: FridgeCategoryType;
  mhd?: string;
}

export { FridgeCategories, FridgeCategoryType, getAllFridgeCategories } from '../constants/categories';

export interface CategoryDisplayInfo {
  label: string;
  color: string;
}

export type SortField = 'name' | 'category' | 'amount';
export type SortDirection = 'asc' | 'desc';

export type FilterOption = FridgeCategoryType | 'ALL';
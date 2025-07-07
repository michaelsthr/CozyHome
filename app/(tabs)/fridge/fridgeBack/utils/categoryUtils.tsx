import { FridgeCategories, FridgeCategoryType } from '../../../../../lib/types/fridge';

export interface CategoryDisplayInfo {
  label: string;
  color: string;
}

const getCategoryDisplayInfo = (categoryValue: string | undefined): CategoryDisplayInfo => {
  if (!categoryValue) return { label: 'Keine Kategorie', color: '#777777' };
  
  const isValidCategory = Object.values(FridgeCategories).includes(categoryValue as unknown as FridgeCategoryType);
  
  if (isValidCategory) {
    switch(categoryValue) {
      case FridgeCategories.DAIRY:
        return { label: categoryValue, color: '#e3f2fd' };
      case FridgeCategories.MEAT:
        return { label: categoryValue, color: '#ffcdd2' };
      case FridgeCategories.VEGETABLES:
        return { label: categoryValue, color: '#c8e6c9' };
      case FridgeCategories.FRUITS:
        return { label: categoryValue, color: '#ffe0b2' };
      case FridgeCategories.DRINKS:
        return { label: categoryValue, color: '#b3e5fc' };
      case FridgeCategories.FROZEN:
        return { label: categoryValue, color: '#d1c4e9' };
      default:
        return { label: categoryValue, color: '#eeeeee' };
    }
  }
  
  return { label: categoryValue, color: '#eeeeee' };
};

export default getCategoryDisplayInfo;
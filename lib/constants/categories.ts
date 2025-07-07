export const FridgeCategories = {
  DAIRY: 'Dairy',
  MEAT: 'Meat & Fish',
  VEGETABLES: 'Vegetables',
  FRUITS: 'Fruits',
  DRINKS: 'Drinks',
  FROZEN: 'Frozen',
  OTHER: 'Other'
} as const;

export type FridgeCategoryType = typeof FridgeCategories[keyof typeof FridgeCategories];

export const getAllFridgeCategories = (): FridgeCategoryType[] => {
  return [
    FridgeCategories.FRUITS,
    FridgeCategories.VEGETABLES,
    FridgeCategories.DAIRY,
    FridgeCategories.DRINKS,
    FridgeCategories.MEAT,
    FridgeCategories.FROZEN,
    FridgeCategories.OTHER
  ];
};
export const FridgeCategories = {
  DAIRY: 'Milchprodukte',
  MEAT: 'Fleisch',
  VEGETABLES: 'Gemüse',
  FRUITS: 'Obst',
  DRINKS: 'Getränke',
  FROZEN: 'Tiefkühlkost',
  OTHER: 'Sonstige'
} as const;

export type FridgeCategoryType = typeof FridgeCategories[keyof typeof FridgeCategories];

export const getAllFridgeCategories = (): FridgeCategoryType[] => {
  return Object.values(FridgeCategories);
};
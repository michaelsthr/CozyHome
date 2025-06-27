import { useState } from 'react';
import { deleteKuehlschrankInhalt, KuehlschrankItem, updateKuehlschrankInhalt } from '../components/dbKuehlschrank';

export const useQuantityManager = () => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (
    item: KuehlschrankItem, 
    change: number, 
    onUpdate: (updatedItems: KuehlschrankItem[]) => void,
    currentItems: KuehlschrankItem[]
  ) => {
    const newQuantity = item.anzahl + change;
    
    if (isUpdating) return;
    
    if (newQuantity < 0) return;
    
    setIsUpdating(true);
    
    try {
      if (newQuantity === 0) {
        await deleteKuehlschrankInhalt({ $id: item.$id });
        const updatedItems = currentItems.filter(i => i.$id !== item.$id);
        onUpdate(updatedItems);
      } else {
        const updatedItem = { ...item, anzahl: newQuantity };
        await updateKuehlschrankInhalt(updatedItem);
        const updatedItems = currentItems.map(i => 
          i.$id === item.$id ? updatedItem : i
        );
        onUpdate(updatedItems);
      }
    } catch (error) {
      console.error("Error updating item quantity:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    handleQuantityChange,
    isUpdating
  };
};

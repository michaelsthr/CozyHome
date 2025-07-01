import { useState } from 'react';
import { deleteKuehlschrankInhalt, KuehlschrankItem, updateKuehlschrankInhalt } from "../../../../../lib/appwrite/dbKuehlschrank";

export const useQuantityManager = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [processingItems, setProcessingItems] = useState<Set<string>>(new Set());

  const handleQuantityChange = async (
    item: KuehlschrankItem, 
    change: number, 
    onUpdate: (updatedItems: KuehlschrankItem[]) => void,
    currentItems: KuehlschrankItem[]
  ) => {
    const newQuantity = item.anzahl + change;
    
    if (isUpdating) {
      return;
    }
    
    if (newQuantity < 0) {
      return;
    }
    
    if (processingItems.has(item.$id)) {
      return;
    }
    
    const itemExists = currentItems.find(i => i.$id === item.$id);
    if (!itemExists) {
      return;
    }
    
    setIsUpdating(true);
    setProcessingItems(prev => {
      const newSet = new Set(prev);
      newSet.add(item.$id);
      return newSet;
    });
    
    try {
      if (newQuantity === 0) {
        try {
          await deleteKuehlschrankInhalt({ $id: item.$id });
        } catch (deleteError: any) {
          if (deleteError?.message?.includes("Document with the requested ID could not be found")) {
          } else {
            throw deleteError;
          }
        }
        const updatedItems = currentItems.filter(i => i.$id !== item.$id);
        onUpdate(updatedItems);
      } else {
        const updatedItem = { ...item, anzahl: newQuantity };
        try {
          await updateKuehlschrankInhalt(updatedItem);
        } catch (updateError: any) {
          if (updateError?.message?.includes("Document with the requested ID could not be found")) {
            const updatedItems = currentItems.filter(i => i.$id !== item.$id);
            onUpdate(updatedItems);
            return;
          } else {
            throw updateError;
          }
        }
        const updatedItems = currentItems.map(i => 
          i.$id === item.$id ? updatedItem : i
        );
        onUpdate(updatedItems);
      }
    } catch (error: any) {
      console.error("Error updating item quantity:", error);
      
      if (error?.message?.includes("Document with the requested ID could not be found")) {
        const updatedItems = currentItems.filter(i => i.$id !== item.$id);
        onUpdate(updatedItems);
      }
    } finally {
      setIsUpdating(false);
      setProcessingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(item.$id);
        return newSet;
      });
    }
  };

  return {
    handleQuantityChange,
    isUpdating
  };
};

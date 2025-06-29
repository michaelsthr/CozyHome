import { useState } from 'react';
import { deleteKuehlschrankInhalt, KuehlschrankItem, updateKuehlschrankInhalt } from '../components/dbKuehlschrank';

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
    
    // Check if this specific item is already being processed
    if (processingItems.has(item.$id)) {
      return;
    }
    
    // Check if item still exists in current items (prevent operations on already deleted items)
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
        // Delete the item completely
        try {
          await deleteKuehlschrankInhalt({ $id: item.$id });
        } catch (deleteError: any) {
          if (deleteError?.message?.includes("Document with the requested ID could not be found")) {
            // Item was already deleted, continue with local state update
          } else {
            throw deleteError; // Re-throw if it's a different error
          }
        }
        // Update local state by removing the item
        const updatedItems = currentItems.filter(i => i.$id !== item.$id);
        onUpdate(updatedItems);
      } else {
        // Update the item quantity
        const updatedItem = { ...item, anzahl: newQuantity };
        try {
          await updateKuehlschrankInhalt(updatedItem);
        } catch (updateError: any) {
          if (updateError?.message?.includes("Document with the requested ID could not be found")) {
            const updatedItems = currentItems.filter(i => i.$id !== item.$id);
            onUpdate(updatedItems);
            return;
          } else {
            throw updateError; // Re-throw if it's a different error
          }
        }
        // Update local state with new quantity
        const updatedItems = currentItems.map(i => 
          i.$id === item.$id ? updatedItem : i
        );
        onUpdate(updatedItems);
      }
    } catch (error: any) {
      console.error("Error updating item quantity:", error);
      
      // Handle specific case where document was already deleted
      if (error?.message?.includes("Document with the requested ID could not be found")) {
        // Item was already deleted, just update local state
        const updatedItems = currentItems.filter(i => i.$id !== item.$id);
        onUpdate(updatedItems);
      }
      // For other errors, we could potentially refresh the data or show user feedback
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

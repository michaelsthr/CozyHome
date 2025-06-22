import { useState } from 'react';
import { FridgeCategoryType, KuehlschrankItem, NewKuehlschrankItem } from '../types/fridge';

export const useFridgeForm = () => {
  const [itemName, setItemName] = useState('');
  const [itemAmount, setItemAmount] = useState('1');
  const [selectedCategory, setSelectedCategory] = useState<FridgeCategoryType | ''>('');
  const [expDate, setExpDate] = useState<Date | null>(null);
  const [editingItem, setEditingItem] = useState<KuehlschrankItem | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setItemName('');
    setItemAmount('1');
    setSelectedCategory('');
    setExpDate(null);
    setEditingItem(null);
    setModalVisible(false);
  };

  const setEditMode = (item: KuehlschrankItem) => {
    setEditingItem(item);
    setItemName(item.name);
    setItemAmount(item.anzahl.toString());
    setSelectedCategory(item.kategorie as FridgeCategoryType || '');
    setExpDate(item.mhd ? new Date(item.mhd) : null);
    setModalVisible(true);
  };

  const getFormData = (): NewKuehlschrankItem => {
    const formattedDate = expDate ? 
      new Date(expDate.getFullYear(), expDate.getMonth(), expDate.getDate()).toISOString() : 
      undefined;

    return {
      name: itemName,
      anzahl: parseInt(itemAmount) || 1,
      kategorie: selectedCategory || undefined,
      mhd: formattedDate
    };
  };

  return {
    itemName,
    setItemName,
    itemAmount,
    setItemAmount,
    selectedCategory,
    setSelectedCategory,
    expDate,
    setExpDate,
    editingItem,
    modalVisible,
    setModalVisible,
    isSubmitting,
    setIsSubmitting,
    resetForm,
    setEditMode,
    getFormData
  };
}; 
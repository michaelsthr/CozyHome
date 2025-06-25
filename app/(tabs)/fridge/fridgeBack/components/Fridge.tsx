import React, { useMemo } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useFridgeData } from '../hooks/useFridgeData';
import { useFridgeFilters } from '../hooks/useFridgeFilters';
import { useFridgeForm } from '../hooks/useFridgeForm';
import { FridgeItemModal } from './FridgeItemModal';
import { FridgeFilters } from './FridgeFilters';
import { FridgeItemList } from './FridgeItem';
import { KuehlschrankItem } from '../types/fridge';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  floatingButtonText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default function Fridge() {
  const { contents, loading, addItem, updateItem, deleteItem } = useFridgeData();
  const items = contents?.documents || [];
  
  const {
    activeFilter,
    setActiveFilter,
    sortBy,
    sortDirection,
    filteredAndSortedItems,
    handleSort
  } = useFridgeFilters(items);

  const {
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
  } = useFridgeForm();

  const itemCounts = useMemo(() => {
    return items.reduce((acc, item) => {
      const category = item.kategorie || 'uncategorized';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [items]);

  const handleSaveItem = async () => {
    if (!itemName.trim()) {
      alert("Bitte geben Sie einen Namen ein");
      return;
    }
    
    try {
      setIsSubmitting(true);
      const formData = getFormData();
      
      if (editingItem) {
        await updateItem({
          ...formData,
          $id: editingItem.$id,
        } as KuehlschrankItem);
      } else {
        await addItem(formData);
      }
      
      resetForm();
    } catch (error) {
      console.error("Error saving item:", error);
      alert("Fehler beim Speichern des Artikels");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteItem = async (item: KuehlschrankItem) => {
    try {
      if (confirm("Möchten Sie diesen Artikel wirklich löschen?")) {
        await deleteItem(item);
      }
    } catch (error) {
      alert("Fehler beim Löschen des Artikels");
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Lädt Inhalte...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Virtueller Kühlschrank</Text>
      
      <FridgeItemModal
        visible={modalVisible}
        onClose={resetForm}
        onSave={handleSaveItem}
        isEditing={!!editingItem}
        isSubmitting={isSubmitting}
        itemName={itemName}
        setItemName={setItemName}
        itemAmount={itemAmount}
        setItemAmount={setItemAmount}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        expDate={expDate}
        setExpDate={setExpDate}
        styles={styles}
      />

      <FridgeFilters
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        itemCounts={itemCounts}
        totalItems={items.length}
        styles={styles}
      />

      <FridgeItemList
        items={filteredAndSortedItems}
        onEditItem={setEditMode}
        onDeleteItem={handleDeleteItem}
        activeFilter={activeFilter}
        onClearFilter={() => setActiveFilter('ALL')}
        styles={styles}
      />
      
      <TouchableOpacity 
        style={styles.floatingButton} 
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
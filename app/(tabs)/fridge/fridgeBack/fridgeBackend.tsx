import { Models } from 'appwrite';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { FridgeCategories, FridgeCategoryType, getAllFridgeCategories } from "../../../../lib/constants/categories";
import DatePickerField from "./components/DatePickerField";
import { deleteKuehlschrankInhalt, getKuehlschrankInhalt, KuehlschrankItem, NewKuehlschrankItem, setKuehlschrankInhalt, updateKuehlschrankInhalt } from "./components/dbKuehlschrank"; //für db

export default function Fridge() {
  // Helper function to get category display information (can be expanded to include icons, colors, etc.)
  const getCategoryDisplayInfo = (categoryValue: string | undefined) => {
    if (!categoryValue) return { label: 'Keine Kategorie', color: '#777777' };
    
    // Check if the category matches one of our predefined categories
    const isValidCategory = Object.values(FridgeCategories).includes(categoryValue as FridgeCategoryType);
    
    if (isValidCategory) {
      // Return display information based on category
      switch(categoryValue) {
        case FridgeCategories.DAIRY:
          return { label: categoryValue, color: '#e3f2fd' }; // Light blue for dairy
        case FridgeCategories.MEAT:
          return { label: categoryValue, color: '#ffcdd2' }; // Light red for meat
        case FridgeCategories.VEGETABLES:
          return { label: categoryValue, color: '#c8e6c9' }; // Light green for vegetables
        case FridgeCategories.FRUITS:
          return { label: categoryValue, color: '#ffe0b2' }; // Light orange for fruits
        case FridgeCategories.DRINKS:
          return { label: categoryValue, color: '#b3e5fc' }; // Lighter blue for drinks
        case FridgeCategories.SNACKS:
          return { label: categoryValue, color: '#f8bbd0' }; // Light pink for snacks
        case FridgeCategories.FROZEN:
          return { label: categoryValue, color: '#d1c4e9' }; // Light purple for frozen
        default:
          return { label: categoryValue, color: '#eeeeee' }; // Gray for other
      }
    }
    
    return { label: categoryValue, color: '#eeeeee' };
  };  
  const [contents, setContents] = useState<Models.DocumentList<any> | null>(null);
  const [categories] = useState<FridgeCategoryType[]>(getAllFridgeCategories());
  const [loading, setLoading] = useState(true);
  const [itemName, setItemName] = useState('');
  const [itemAmount, setItemAmount] = useState('1');
  const [selectedCategory, setSelectedCategory] = useState<FridgeCategoryType | ''>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FridgeCategoryType | 'ALL'>('ALL');
  const [sortBy, setSortBy] = useState<'name' | 'category' | 'amount'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');  const [editingItem, setEditingItem] = useState<KuehlschrankItem | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [expDate, setExpDate] = useState<Date | null>(null);useEffect(() => {
    async function fetchData() {
      try {
        const inhalt = await getKuehlschrankInhalt();
        setContents(inhalt);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Lädt Inhalte...</Text>
      </View>
    );
  }  const handleAddItem = async () => {
    if (!itemName.trim()) {
      alert("Bitte geben Sie einen Namen ein");
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const formattedDate = expDate ? 
        new Date(expDate.getFullYear(), expDate.getMonth(), expDate.getDate()).toISOString() : 
        undefined;
      
      if (editingItem) {
        const updatedItem = {
          name: itemName,
          anzahl: parseInt(itemAmount) || 1,
          kategorie: selectedCategory || undefined,
          mhd: formattedDate
        };
        
        await updateKuehlschrankInhalt({
          ...updatedItem,
          $id: editingItem.$id,
        } as KuehlschrankItem);
        
        setEditingItem(null);
      } else {
        const newItem: NewKuehlschrankItem = {
          name: itemName,
          anzahl: parseInt(itemAmount) || 1,
          kategorie: selectedCategory || undefined,
          mhd: formattedDate
        };
        
        await setKuehlschrankInhalt(newItem);
      }
      
      setItemName('');
      setItemAmount('1');
      setSelectedCategory('');
      setExpDate(null);
      setModalVisible(false);

      const updatedContents = await getKuehlschrankInhalt();
      setContents(updatedContents);
    } catch (error) {
      console.error("Error adding/updating item:", error);
      alert("Fehler beim Speichern des Artikels");
    } finally {
      setIsSubmitting(false);
    }
  };  const handleEditItem = (item: KuehlschrankItem) => {
    setEditingItem(item);
    setItemName(item.name);
    setItemAmount(item.anzahl.toString());
    
    const itemCategory = item.kategorie || '';
    const isValidCategory = Object.values(FridgeCategories).includes(itemCategory as FridgeCategoryType);
    
    setSelectedCategory(isValidCategory ? itemCategory as FridgeCategoryType : '');
    
    if (item.mhd) {
      setExpDate(new Date(item.mhd));
    } else {
      setExpDate(null);
    }
    
    setModalVisible(true);
  };  const cancelEdit = () => {
    setEditingItem(null);
    setItemName('');
    setItemAmount('1');
    setSelectedCategory('');
    setExpDate(null);
    setModalVisible(false);
  };
    const handleDeleteItem = async (item: KuehlschrankItem) => {
    try {
      if (confirm("Möchten Sie diesen Artikel wirklich löschen?")) {
        await deleteKuehlschrankInhalt(item);
        
        const updatedContents = await getKuehlschrankInhalt();
        setContents(updatedContents);
      }
    } catch (error) {
      alert("Fehler beim Löschen des Artikels");
    }
  };

  const getFilteredItems = () => {
    if (!contents || !contents.documents) return [];
    
    const filteredItems = activeFilter === 'ALL'
      ? [...contents.documents]
      : contents.documents.filter(item => {
          if (!item.kategorie) return false;
          
          return item.kategorie === activeFilter;
        });
    
    return filteredItems.sort((a, b) => {
      if (sortBy === 'name') {
        return sortDirection === 'asc' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      else if (sortBy === 'amount') {
        return sortDirection === 'asc'
          ? a.anzahl - b.anzahl
          : b.anzahl - a.anzahl;
      }
      else if (sortBy === 'category') {
        const catA = a.kategorie || '';
        const catB = b.kategorie || '';
        return sortDirection === 'asc'
          ? catA.localeCompare(catB)
          : catB.localeCompare(catA);
      }
      
      return 0;
    });
  };
  
  const handleSort = (field: 'name' | 'category' | 'amount') => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };
  
  const clearFilter = () => {
    setActiveFilter('ALL');
  };

  const applyFilter = (category: FridgeCategoryType) => {
    setActiveFilter(category);
  };

  const sortItems = (items: KuehlschrankItem[]) => {
    return items.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'category':
          comparison = (a.kategorie || '').localeCompare(b.kategorie || '');
          break;
        case 'amount':
          comparison = (a.anzahl || 0) - (b.anzahl || 0);
          break;
      }
      
      return sortDirection === 'desc' ? -comparison : comparison;
    });
  };
  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
  };
  
  const isExpired = (date: string | undefined) => {
    if (!date) return false;
    
    
    const expireDate = new Date(date);
    const today = new Date();
    
    expireDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    return expireDate < today;
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Virtueller Kühlschrank</Text>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          if (editingItem) {
            cancelEdit();
          } else {
            setModalVisible(false);
          }
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {editingItem ? 'Artikel bearbeiten' : 'Neuen Artikel hinzufügen'}
            </Text>
            
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Name:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Artikelname"
                  value={itemName}
                  onChangeText={setItemName}
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Anzahl:</Text>
                <TextInput
                  style={styles.amountInput}
                  placeholder="Anzahl"
                  value={itemAmount}
                  onChangeText={setItemAmount}
                  keyboardType="numeric"
                />
              </View>
              <DatePickerField 
                date={expDate} 
                setDate={setExpDate} 
                label="MHD:" 
                minimumDate={new Date()}
              />
              
              <View style={styles.categoryPickerContainer}>
                <Text style={styles.inputLabel}>Kategorie:</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
                  <TouchableOpacity
                    style={[
                      styles.categoryButton,
                      !selectedCategory ? styles.categoryButtonSelected : {}
                    ]}
                    onPress={() => setSelectedCategory('')}
                  >
                    <Text 
                      style={[
                        styles.categoryButtonText,
                        !selectedCategory ? styles.categoryButtonTextSelected : {}
                      ]}
                    >
                      Keine
                    </Text>
                  </TouchableOpacity>
                  
                  {categories.map((categoryValue) => (
                    <TouchableOpacity
                      key={categoryValue}
                      style={[
                        styles.categoryButton,
                        selectedCategory === categoryValue ? styles.categoryButtonSelected : {}
                      ]}
                      onPress={() => setSelectedCategory(categoryValue)}
                    >
                      <Text 
                        style={[
                          styles.categoryButtonText,
                          selectedCategory === categoryValue ? styles.categoryButtonTextSelected : {}
                        ]}
                      >
                        {categoryValue}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
            <View style={styles.modalButtonContainer}>              <TouchableOpacity 
                style={[styles.addButton, isSubmitting && styles.disabledButton]} 
                onPress={handleAddItem} 
                disabled={isSubmitting}
              >
                <Text style={styles.buttonText}>
                  {isSubmitting 
                    ? "Speichern..." 
                    : editingItem 
                      ? "Aktualisieren" 
                      : "Hinzufügen"
                  }
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.cancelButton} 
                onPress={() => {
                  if (editingItem) {
                    cancelEdit();
                  } else {
                    setModalVisible(false);
                    setItemName('');
                    setItemAmount('1');
                    setSelectedCategory('');
                    setExpDate(null);
                  }
                }}
              >
                <Text style={styles.buttonText}>Abbrechen</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      
      <View style={styles.sortSection}>
        <Text style={styles.sectionTitle}>Sortieren nach:</Text>
        <View style={styles.sortButtonRow}>
          <TouchableOpacity
            style={[
              styles.sortButton,
              sortBy === 'name' && styles.sortButtonActive
            ]}
            onPress={() => handleSort('name')}
          >
            <Text style={styles.sortButtonText}>
              Name {sortBy === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.sortButton,
              sortBy === 'amount' && styles.sortButtonActive
            ]}
            onPress={() => handleSort('amount')}
          >
            <Text style={styles.sortButtonText}>
              Anzahl {sortBy === 'amount' && (sortDirection === 'asc' ? '↑' : '↓')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.sortButton,
              sortBy === 'category' && styles.sortButtonActive
            ]}
            onPress={() => handleSort('category')}
          >
            <Text style={styles.sortButtonText}>
              Kategorie {sortBy === 'category' && (sortDirection === 'asc' ? '↑' : '↓')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.filterSection}>
        <View style={styles.filterHeaderRow}>
          <Text style={styles.sectionTitle}>Nach Kategorie filtern:</Text>
          {activeFilter !== 'ALL' && (
            <TouchableOpacity 
              style={styles.resetFilterButton} 
              onPress={() => setActiveFilter('ALL')}
            >
              <Text style={styles.resetFilterText}>Filter zurücksetzen</Text>
            </TouchableOpacity>
          )}
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          <TouchableOpacity
            style={[
              styles.filterChip,
              activeFilter === 'ALL' && styles.filterChipActive
            ]}
            onPress={() => setActiveFilter('ALL')}
          >
            <Text 
              style={[
                styles.filterChipText,
                activeFilter === 'ALL' && styles.filterChipTextActive
              ]}
            >
              Alle anzeigen
              {contents?.documents && ` (${contents.documents.length})`}
            </Text>
          </TouchableOpacity>
            {categories.map((categoryValue) => {
            const categoryInfo = getCategoryDisplayInfo(categoryValue);
            const itemCount = contents?.documents?.filter(item => item.kategorie === categoryValue).length || 0;
            
            return (
              <TouchableOpacity
                key={categoryValue}
                style={[
                  styles.filterChip,
                  { borderColor: categoryInfo.color },
                  activeFilter === categoryValue && styles.filterChipActive,
                  activeFilter === categoryValue && { backgroundColor: categoryInfo.color }
                ]}
                onPress={() => setActiveFilter(categoryValue)}
              >
                <Text 
                  style={[
                    styles.filterChipText,
                    activeFilter === categoryValue && styles.filterChipTextActive
                  ]}
                >
                  {categoryValue} ({itemCount})
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>      </View>{getFilteredItems().length > 0 ? (        <FlatList
          data={getFilteredItems()}
          keyExtractor={(item: KuehlschrankItem) => item.$id}renderItem={({ item }) => {
            const categoryInfo = getCategoryDisplayInfo(item.kategorie);
            const itemIsExpired = item.mhd ? isExpired(item.mhd) : false;
            
            return (
              <View style={[
                styles.itemContainer, 
                { borderLeftWidth: 5, borderLeftColor: categoryInfo.color },
                itemIsExpired && { borderColor: '#f44336', borderWidth: 1 }
              ]}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text>Anzahl: {item.anzahl}</Text>
                  {item.mhd && (
                    <Text style={itemIsExpired ? styles.expiredText : {}}>
                      Haltbar bis: {new Date(item.mhd).toLocaleDateString('de-DE')}
                      {itemIsExpired && ' (abgelaufen)'}
                    </Text>
                  )}
                  {item.kategorie && (
                    <View style={[styles.categoryBadge, { backgroundColor: categoryInfo.color }]}>
                      <Text style={styles.categoryBadgeText}>{categoryInfo.label}</Text>
                    </View>
                  )}
                </View>
                <View style={styles.itemActions}>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => handleEditItem(item)}
                  >
                    <Text style={styles.buttonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeleteItem(item)}
                  >
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
          style={styles.list}
        />      ) : (
        <View style={styles.emptyContainer}>
          {activeFilter !== 'ALL' ? (
            <>
              <Text style={styles.emptyText}>Keine Artikel in der Kategorie "{activeFilter}" gefunden.</Text>
              <TouchableOpacity 
                style={styles.clearFilterButton} 
                onPress={() => setActiveFilter('ALL')}
              >
                <Text style={styles.clearFilterButtonText}>Filter entfernen</Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text style={styles.emptyText}>Keine Inhalte im Kühlschrank gefunden</Text>
          )}
        </View>
      )}
      
      <TouchableOpacity 
        style={styles.floatingButton} 
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
// beginn stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 16,
    width: '100%'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16
  },  filterSection: {
    width: '100%',
    marginBottom: 16
  },
  sortSection: {
    width: '100%',
    marginBottom: 16
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8
  },
  sortButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  sortButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 8
  },
  sortButtonActive: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3'
  },
  sortButtonText: {
    fontWeight: 'bold',
    color: '#333'
  },
  filterHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  resetFilterButton: {
    padding: 4
  },
  resetFilterText: {
    color: '#2196F3',
    fontSize: 14
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd'
  },
  filterChipActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50'
  },
  filterChipText: {
    color: '#333'
  },
  filterChipTextActive: {
    color: 'white',
    fontWeight: 'bold'
  },
  filterButton: {
    flex: 1,
    padding: 10,
    borderRadius: 4,
    marginRight: 8,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center'
  },
  filterButtonActive: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3'
  },
  filterButtonText: {
    color: '#333',
    fontWeight: 'bold'
  },
  formContainer: {
    width: '100%',
    marginBottom: 20
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  categoryPickerContainer: {
    marginBottom: 16,
    width: '100%'
  },
  categoryLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8
  },
  categoryScroll: {
    flexDirection: 'row'
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd'
  },
  categoryButtonSelected: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50'
  },
  categoryButtonText: {
    color: '#333'
  },
  categoryButtonTextSelected: {
    color: 'white',
    fontWeight: 'bold'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    flex: 3,
    marginRight: 8
  },
  amountInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    flex: 1,
    marginRight: 8
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 2
  },  addButton: {
    backgroundColor: '#2196F3',
    borderRadius: 4,
    padding: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5
  },
  cancelButton: {
    backgroundColor: '#f44336',
    borderRadius: 4,
    padding: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5
  },
  editButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 4,
    padding: 6,
    marginLeft: 8
  },
  deleteButton: {
    backgroundColor: '#f44336',
    borderRadius: 4,
    padding: 6,
    marginLeft: 8
  },
  itemActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  disabledButton: {
    backgroundColor: '#cccccc'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  itemContainer: {
    backgroundColor: "#f0f0f0",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  itemInfo: {
    flex: 1
  },  itemName: {
    fontSize: 18,
    fontWeight: 'bold'
  },  categoryText: {
    fontStyle: 'italic',
    marginTop: 4,
    color: '#666'
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 4,
    alignSelf: 'flex-start'
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.7)'
  },
  errorText: {
    color: 'red',
    fontSize: 16
  },  list: {
    width: '100%'
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: 20
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16
  },
  clearFilterButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4
  },
  clearFilterButtonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  datePickerContainer: {
    marginBottom: 16,
    width: '100%'
  },
  dateLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  dateInputText: {
    flex: 1,
    color: '#333'
  },
  datePicker: {
    width: '100%',
    marginTop: 8
  },
    // Modal styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    maxWidth: 500,
    maxHeight: '80%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
    gap: 10 // Add consistent spacing between buttons
  },
  
  // Input styles
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500'
  },
  // Date picker styles
  datePickerButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#f9f9f9',
    flex: 1,
    minHeight: 42, // Consistent height
    justifyContent: 'center' // Center text vertically
  },
  datePickerButtonText: {
    color: '#333',
    fontSize: 14
  },
  dateInputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1
  },
  dateInputField: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    textAlign: 'center',
    flex: 1,
    marginHorizontal: 4
  },
  dateInputSeparator: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 2
  },
  clearDateButton: {
    marginLeft: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f44336',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5
  },
  clearDateText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  expiredText: {
    color: 'red',
    fontWeight: 'bold'
  },
  expiringSoonText: {
    color: 'orange',
    fontWeight: 'bold'
  },
  
  // Floating action button
  floatingButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#2196F3',
    borderRadius: 30,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    zIndex: 100
  },
  floatingButtonText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold'
  },
});
import { inputStyles } from '@/styles/input_styles';
import React from 'react';
import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FridgeCategoryType, getAllFridgeCategories } from '../../../../../lib/types/fridge';
import DatePickerField from './DatePickerField';

interface FridgeItemModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: () => void;
  isEditing: boolean;
  isSubmitting: boolean;
  itemName: string;
  setItemName: (name: string) => void;
  itemAmount: string;
  setItemAmount: (amount: string) => void;
  selectedCategory: FridgeCategoryType | '';
  setSelectedCategory: (category: FridgeCategoryType | '') => void;
  expDate: Date | null;
  setExpDate: (date: Date | null) => void;
  styles: any;
}

const FridgeItemModal: React.FC<FridgeItemModalProps> = ({
  visible,
  onClose,
  onSave,
  isEditing,
  isSubmitting,
  itemName,
  setItemName,
  itemAmount,
  setItemAmount,
  selectedCategory,
  setSelectedCategory,
  expDate,
  setExpDate,
  styles
}) => {
  const categories = getAllFridgeCategories();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            {isEditing ? 'Artikel bearbeiten' : 'Neuen Artikel hinzufügen'}
          </Text>
          
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Name:</Text>
              <TextInput
                style={inputStyles.input}
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

          <View style={styles.modalButtonContainer}>
            <TouchableOpacity 
              style={[styles.addButton, isSubmitting && styles.disabledButton]} 
              onPress={onSave} 
              disabled={isSubmitting}
            >
              <Text style={styles.buttonText}>
                {isSubmitting 
                  ? "Speichern..." 
                  : isEditing 
                    ? "Aktualisieren" 
                    : "Hinzufügen"
                }
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.cancelButton} 
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Abbrechen</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FridgeItemModal
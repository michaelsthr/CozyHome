import React, { useState } from 'react';
import { Alert, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KuehlschrankItem } from './dbKuehlschrank';

interface QuantityControlsProps {
  item: KuehlschrankItem;
  onQuantityChange: (item: KuehlschrankItem, change: number) => void;
  isUpdating?: boolean;
  styles: any;
}

export const QuantityControls: React.FC<QuantityControlsProps> = ({
  item,
  onQuantityChange,
  isUpdating = false,
  styles
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingQuantity, setEditingQuantity] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isShowingConfirmation, setIsShowingConfirmation] = useState(false);
  const [lastProcessedValue, setLastProcessedValue] = useState<string | null>(null);
  
  // Use a ref to track if we're currently processing to prevent immediate duplicates
  const isProcessingRef = React.useRef(false);

  const handleDecrease = () => {
    if (isShowingConfirmation) return; // Prevent multiple confirmation dialogs
    
    if (item.anzahl === 1) {
      setIsShowingConfirmation(true);
      
      if (Platform.OS === 'web') {
        const confirmed = window.confirm(`Are you sure you want to remove "${item.name}" from your fridge?`);
        setIsShowingConfirmation(false);
        if (confirmed) {
          onQuantityChange(item, -1);
        }
      } else {
        Alert.alert(
          "Remove Item",
          `Are you sure you want to remove "${item.name}" from your fridge?`,
          [
            {
              text: "Cancel",
              style: "cancel",
              onPress: () => setIsShowingConfirmation(false)
            },
            {
              text: "Remove",
              style: "destructive",
              onPress: () => {
                setIsShowingConfirmation(false);
                onQuantityChange(item, -1);
              }
            }
          ],
          { 
            cancelable: true,
            onDismiss: () => setIsShowingConfirmation(false)
          }
        );
      }
    } else {
      onQuantityChange(item, -1);
    }
  };

  const handleQuantityEdit = () => {
    setIsEditing(true);
    setEditingQuantity(item.anzahl.toString());
    setLastProcessedValue(null); // Reset processed value tracker when starting new edit
  };

  const handleQuantitySubmit = () => {
    // Immediate duplicate prevention using ref
    if (isProcessingRef.current) {
      return;
    }
    
    // Prevent multiple rapid submissions using state
    if (isSubmitting || isShowingConfirmation) {
      return;
    }
    
    // Prevent processing the same value multiple times (e.g., from both onSubmitEditing and onBlur)
    if (lastProcessedValue === editingQuantity) {
      return;
    }
    
    // Mark as processing immediately
    isProcessingRef.current = true;
    
    // Mark this value as processed and set submitting state
    setLastProcessedValue(editingQuantity);
    setIsSubmitting(true);
    
    const newQuantity = parseInt(editingQuantity);
    
    // Check for invalid input (NaN, negative numbers, or exceeding database limit of 20)
    if (isNaN(newQuantity) || newQuantity < 0 || newQuantity > 20) {
      // Reset to original value if invalid
      setEditingQuantity(item.anzahl.toString());
      setIsEditing(false);
      setIsSubmitting(false);
      isProcessingRef.current = false; // Reset processing flag
      return;
    }

    // If user entered 0, trigger removal confirmation
    if (newQuantity === 0) {
      setIsEditing(false);
      setEditingQuantity("");
      
      // Prevent multiple confirmation dialogs
      if (isShowingConfirmation) {
        setIsSubmitting(false);
        isProcessingRef.current = false; // Reset processing flag
        return;
      }
      setIsShowingConfirmation(true);
      
      if (Platform.OS === 'web') {
        const confirmed = window.confirm(`Are you sure you want to remove "${item.name}" from your fridge?`);
        setIsShowingConfirmation(false);
        setIsSubmitting(false);
        isProcessingRef.current = false; // Reset processing flag
        if (confirmed) {
          // Calculate the exact change needed to reach 0
          onQuantityChange(item, -item.anzahl);
        }
      } else {
        Alert.alert(
          "Remove Item",
          `Are you sure you want to remove "${item.name}" from your fridge?`,
          [
            {
              text: "Cancel",
              style: "cancel",
              onPress: () => {
                setIsShowingConfirmation(false);
                setIsSubmitting(false);
                isProcessingRef.current = false; // Reset processing flag
              }
            },
            {
              text: "Remove",
              style: "destructive",
              onPress: () => {
                setIsShowingConfirmation(false);
                setIsSubmitting(false);
                isProcessingRef.current = false; // Reset processing flag
                onQuantityChange(item, -item.anzahl);
              }
            }
          ],
          { 
            cancelable: true,
            onDismiss: () => {
              setIsShowingConfirmation(false);
              setIsSubmitting(false);
              isProcessingRef.current = false; // Reset processing flag
            }
          }
        );
      }
      return;
    }

    const quantityDiff = newQuantity - item.anzahl;
    if (quantityDiff !== 0) {
      onQuantityChange(item, quantityDiff);
    }
    
    setIsEditing(false);
    setEditingQuantity("");
    
    // Reset submission flag and processing ref after a short delay
    setTimeout(() => {
      setIsSubmitting(false);
      isProcessingRef.current = false;
    }, 500);
  };

  const handleQuantityCancel = () => {
    setIsEditing(false);
    setEditingQuantity("");
    isProcessingRef.current = false; // Reset processing flag on cancel
  };

  return (
    <View style={styles.quantityControls}>
      <TouchableOpacity
        style={[styles.quantityButton, (isUpdating || isSubmitting || isShowingConfirmation) && styles.quantityButtonDisabled]}
        onPress={handleDecrease}
        disabled={isUpdating || isEditing || isSubmitting || isShowingConfirmation}
      >
        <Text style={styles.quantityButtonText}>-</Text>
      </TouchableOpacity>
      
      {isEditing ? (
        <TextInput
          style={[styles.countContainer, styles.quantityInput]}
          value={editingQuantity}
          onChangeText={setEditingQuantity}
          onSubmitEditing={handleQuantitySubmit}
          onBlur={handleQuantitySubmit}
          keyboardType="numeric"
          selectTextOnFocus
          autoFocus
          maxLength={2}
          returnKeyType="done"
          editable={!isSubmitting && !isShowingConfirmation}
        />
      ) : (
        <TouchableOpacity 
          style={styles.countContainer}
          onPress={handleQuantityEdit}
          disabled={isUpdating || isSubmitting || isShowingConfirmation}
        >
          <Text style={styles.itemCount}>{item.anzahl}</Text>
        </TouchableOpacity>
      )}
      
      <TouchableOpacity
        style={[styles.quantityButton, (isUpdating || isSubmitting || isShowingConfirmation) && styles.quantityButtonDisabled]}
        onPress={() => onQuantityChange(item, 1)}
        disabled={isUpdating || isEditing || isSubmitting || isShowingConfirmation}
      >
        <Text style={styles.quantityButtonText}>{"+"}</Text>
      </TouchableOpacity>
    </View>
  );
};

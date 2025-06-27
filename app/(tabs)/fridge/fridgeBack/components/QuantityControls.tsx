import React from 'react';
import { Alert, Platform, Text, TouchableOpacity, View } from 'react-native';
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
  const handleDecrease = () => {
    if (item.anzahl === 1) {
      if (Platform.OS === 'web') {
        const confirmed = window.confirm(`Are you sure you want to remove "${item.name}" from your fridge?`);
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
              style: "cancel"
            },
            {
              text: "Remove",
              style: "destructive",
              onPress: () => onQuantityChange(item, -1)
            }
          ]
        );
      }
    } else {
      onQuantityChange(item, -1);
    }
  };

  return (
    <View style={styles.quantityControls}>
      <TouchableOpacity
        style={[styles.quantityButton, isUpdating && styles.quantityButtonDisabled]}
        onPress={handleDecrease}
        disabled={isUpdating}
      >
        <Text style={styles.quantityButtonText}>-</Text>
      </TouchableOpacity>
      <View style={styles.countContainer}>
        <Text style={styles.itemCount}>{item.anzahl}</Text>
      </View>
      <TouchableOpacity
        style={[styles.quantityButton, isUpdating && styles.quantityButtonDisabled]}
        onPress={() => onQuantityChange(item, 1)}
        disabled={isUpdating}
      >
        <Text style={styles.quantityButtonText}>{"+"}</Text>
      </TouchableOpacity>
    </View>
  );
};

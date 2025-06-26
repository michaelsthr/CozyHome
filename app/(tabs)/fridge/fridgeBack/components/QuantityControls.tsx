import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
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
  return (
    <View style={styles.quantityControls}>
      <TouchableOpacity
        style={[styles.quantityButton, isUpdating && styles.quantityButtonDisabled]}
        onPress={() => onQuantityChange(item, -1)}
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

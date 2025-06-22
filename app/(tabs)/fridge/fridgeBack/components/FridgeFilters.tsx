import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { FridgeCategoryType, getAllFridgeCategories } from '../types/fridge';
import { getCategoryDisplayInfo } from '../utils/categoryUtils';

interface FridgeFiltersProps {
  activeFilter: FridgeCategoryType | 'ALL';
  onFilterChange: (filter: FridgeCategoryType | 'ALL') => void;
  itemCounts: Record<string, number>;
  totalItems: number;
  styles: any;
}

export const FridgeFilters: React.FC<FridgeFiltersProps> = ({
  activeFilter,
  onFilterChange,
  itemCounts,
  totalItems,
  styles
}) => {
  const categories = getAllFridgeCategories();

  return (
    <View style={styles.filterSection}>
      <View style={styles.filterHeaderRow}>
        <Text style={styles.sectionTitle}>Nach Kategorie filtern:</Text>
        {activeFilter !== 'ALL' && (
          <TouchableOpacity 
            style={styles.resetFilterButton} 
            onPress={() => onFilterChange('ALL')}
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
          onPress={() => onFilterChange('ALL')}
        >
          <Text 
            style={[
              styles.filterChipText,
              activeFilter === 'ALL' && styles.filterChipTextActive
            ]}
          >
            Alle anzeigen ({totalItems})
          </Text>
        </TouchableOpacity>
        
        {categories.map((categoryValue) => {
          const categoryInfo = getCategoryDisplayInfo(categoryValue);
          const itemCount = itemCounts[categoryValue] || 0;
          
          return (
            <TouchableOpacity
              key={categoryValue}
              style={[
                styles.filterChip,
                { borderColor: categoryInfo.color },
                activeFilter === categoryValue && styles.filterChipActive,
                activeFilter === categoryValue && { backgroundColor: categoryInfo.color }
              ]}
              onPress={() => onFilterChange(categoryValue)}
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
      </ScrollView>
    </View>
  );
};
import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { FridgeCategoryType, KuehlschrankItem } from '../../../../../lib/types/fridge';
import getCategoryDisplayInfo from '../utils/categoryUtils';
import { isExpired } from '../utils/dateUtils';

interface FridgeItemListProps {
  items: KuehlschrankItem[];
  onEditItem: (item: KuehlschrankItem) => void;
  onDeleteItem: (item: KuehlschrankItem) => void;
  activeFilter: FridgeCategoryType | 'ALL';
  onClearFilter: () => void;
  styles: any;
}

const FridgeItemList: React.FC<FridgeItemListProps> = ({
  items,
  onEditItem,
  onDeleteItem,
  activeFilter,
  onClearFilter,
  styles
}) => {
  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        {activeFilter !== 'ALL' ? (
          <>
            <Text style={styles.emptyText}>
              Keine Artikel in der Kategorie "{activeFilter}" gefunden.
            </Text>
            <TouchableOpacity style={styles.clearFilterButton} onPress={onClearFilter}>
              <Text style={styles.clearFilterButtonText}>Filter entfernen</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.emptyText}>Keine Inhalte im Kühlschrank gefunden</Text>
        )}
      </View>
    );
  }

  return (
    <FlatList
      data={items}
      keyExtractor={(item: KuehlschrankItem) => item.$id}
      renderItem={({ item }) => {
        const categoryInfo = getCategoryDisplayInfo(item.kategorie);
        const itemIsExpired = item.mhd ? isExpired(item.mhd) : false;
        
        return (
          <View style={[
            styles.itemContainer, 
            { borderLeftWidth: 5, borderLeftColor: categoryInfo.color },
            itemIsExpired && { borderColor: '#f44336', borderWidth: 1 }
          ]}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>              <Text>Anzahl: {item.anzahl}</Text>
              {item.mhd && (
                <Text style={itemIsExpired ? styles.expiredText : {}}>
                  {`Haltbar bis: ${new Date(item.mhd).toLocaleDateString('de-DE')}${itemIsExpired ? ' (abgelaufen)' : ''}`}
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
                onPress={() => onEditItem(item)}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => onDeleteItem(item)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }}
      style={styles.list}
    />
  );
};

export default FridgeItemList;
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { getKuehlschrankInhalt, KuehlschrankItem } from "./fridgeBack/components/dbKuehlschrank";
import { QuantityControls } from "./fridgeBack/components/QuantityControls";
import { useQuantityManager } from "./fridgeBack/hooks/useQuantityManager";
import { fridgeCategoryStyles as styles } from "./styles";

export default function Dairy() {
  const router = useRouter();
  const { search } = useLocalSearchParams();
  const [dairyItems, setDairyItems] = useState<KuehlschrankItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState((search as string) || "");
  const { handleQuantityChange, isUpdating } = useQuantityManager();

  useEffect(() => {
    const fetchDairyItems = async () => {
      try {
        const items = await getKuehlschrankInhalt();
        const dairyItems = items.documents.filter(item => 
          item.kategorie === "Dairy" || (item.kategorie as any) === "Milchprodukte"
        );
        setDairyItems(dairyItems);
      } catch (error) {
        console.error("Error fetching dairy items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDairyItems();
  }, []);

  const filteredItems = dairyItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onQuantityChange = (item: KuehlschrankItem, change: number) => {
    handleQuantityChange(item, change, setDairyItems, dairyItems);
  };

  const getStatusIcon = (mhd?: string) => {
    if (!mhd) return require("../../../assets/images/fridge_icons/eatable.png");
    const today = new Date();
    const expDate = new Date(mhd);
    const diffTime = expDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return require("../../../assets/images/fridge_icons/expired.png");
    } else if (diffDays <= 2) {
      return require("../../../assets/images/fridge_icons/warning.png");
    } else {
      return require("../../../assets/images/fridge_icons/eatable.png");
    }
  };

  const getDaysLeft = (mhd?: string) => {
    if (!mhd) return { days: 0, label: "No expiration date" };
    const today = new Date();
    const expDate = new Date(mhd);
    const diffTime = expDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { days: Math.abs(diffDays), label: diffDays === -1 ? "day over" : "days over" };
    } else {
      return { days: diffDays, label: diffDays === 1 ? "day left" : "days left" };
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#8B5CF6" />
          <Text style={styles.loadingText}>{"Loading dairy items..."}</Text>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={require("../../../assets/images/fridge_icons/profile-picture.png")}
            style={styles.avatar}
          />
        </View>

        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>{"Dairy Items"}</Text>
        </View>
        
        {/* Search */}
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Find dairy items..."
            placeholderTextColor="#9ca3af"
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </View>

       {/* List */}
        {filteredItems.length === 0 ? (
          <View style={styles.emptyState}>
            <Image
              source={require("../../../assets/images/fridge_icons/dairy.png")}
              style={styles.emptyIcon}
            />
            <Text style={styles.emptyText}>{"No dairy items found"}</Text>
            <Text style={styles.emptySubtext}>{"Add some dairy items to your fridge"}</Text>
          </View> ) : (
          <View style={styles.itemsList}>
            {filteredItems.map((item) => (
              <View key={item.$id} style={styles.row}>
                <Image source={require("../../../assets/images/fridge_icons/dairy.png")} style={styles.itemImage} />
                <View style={styles.info}>
                  <View style={styles.statusRow}>
                    <Image source={getStatusIcon(item.mhd)} style={styles.statusIcon} />
                    <Text style={styles.statusText}>
                      {(() => {
                        const { days, label } = getDaysLeft(item.mhd);
                        return `${days} ${label}`;
                      })()}
                    </Text>
                  </View>
                  <Text style={styles.itemName}>{item.name}</Text>
                </View>
                <QuantityControls
                  item={item}
                  onQuantityChange={onQuantityChange}
                  isUpdating={isUpdating}
                  styles={styles}
                />
              </View>
            ))}
          </View>
        )}

        {/* Add New Item Button */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("/(tabs)/fridge/fridge_add")}
        >
          <Text style={styles.addButtonText}>{"ADD NEW DAIRY ITEM"}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

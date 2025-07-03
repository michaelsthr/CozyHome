import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {ActivityIndicator, Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {getKuehlschrankInhalt, KuehlschrankItem,} from "../../../lib/appwrite/dbKuehlschrank";
import { fridgeStyles } from "../../../styles/fridge_styles";
import QuantityControls from "./fridgeBack/components/QuantityControls";
import useQuantityManager from "./fridgeBack/hooks/useQuantityManager";

export default function Fridge() {
  const router = useRouter();
  const [fridgeItems, setFridgeItems] = useState<KuehlschrankItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { handleQuantityChange, isUpdating } = useQuantityManager();

  const styles = fridgeStyles;

  const fetchFridgeItems = useCallback(async () => {
    setLoading(true);
    try {
      const items = await getKuehlschrankInhalt();
      setFridgeItems(items.documents);
    } catch (error) {
      console.error("Error fetching fridge items:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchFridgeItems();
    }, [fetchFridgeItems])
  );

  const getCategoryRoute = (category: string) => {
    switch (category) {
      case "Fruits":
      case "Obst":
        return "/(tabs)/fridge/fridge_fruits";
      case "Vegetables":
      case "Gemüse":
        return "/(tabs)/fridge/fridge_vegetables";
      case "Dairy":
      case "Milchprodukte":
        return "/(tabs)/fridge/fridge_dairy";
      case "Meat & Fish":
      case "Fleisch/Fisch":
      case "Fleisch":
        return "/(tabs)/fridge/fridge_meat";
      case "Drinks":
      case "Getränke":
        return "/(tabs)/fridge/fridge_drinks";
      case "Frozen":
      case "Tiefkühlkost":
        return "/(tabs)/fridge/fridge_frozen";
      case "Other":
      case "Sonstige":
        return "/(tabs)/fridge/fridge_other";
      default:
        return "/(tabs)/fridge/fridge_items";
    }
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    const matchingItems = fridgeItems.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (matchingItems.length === 0) {
      router.push("/(tabs)/fridge/fridge_items");
      return;
    }
    
    const firstMatch = matchingItems[0];
    const categoryRoute = getCategoryRoute(firstMatch.kategorie || "Sonstige");
    
    router.push({
      pathname: categoryRoute as any,
      params: { search: searchTerm }
    });
    
    setSearchTerm("");
  };

  const onQuantityChange = (item: KuehlschrankItem, change: number) => {
    handleQuantityChange(item, change, setFridgeItems, fridgeItems);
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
    if (!mhd) return { days: "", label: "No date" };
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
  
  const getCategoryImage = (category?: string) => {
    switch (category) {
      case "Fruits":
      case "Obst":
        return require("../../../assets/images/fridge_icons/fruits.png");
      case "Vegetables":
      case "Gemüse":
        return require("../../../assets/images/fridge_icons/vegetables.png");
      case "Dairy":
      case "Milchprodukte":
        return require("../../../assets/images/fridge_icons/dairy.png");
      case "Meat & Fish":
      case "Fleisch/Fisch":
      case "Fleisch":
        return require("../../../assets/images/fridge_icons/meat-fish.png");
      case "Drinks":
      case "Getränke":
        return require("../../../assets/images/fridge_icons/drinks.png");
      case "Frozen":
      case "Tiefkühlkost":
        return require("../../../assets/images/fridge_icons/freezer.png");
      case "Other":
      case "Sonstige":
        return require("../../../assets/images/fridge_icons/fridge.png");
      default:
        return require("../../../assets/images/placeholder_icon.png");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>

        <View style={styles.fridgeSection}>
          <View style={styles.headerContainer}>
            <Text style={styles.homeTitle}>{"Quick check"}</Text>
            <TouchableOpacity
              style={styles.plusButton}
              onPress={() => router.push("/(tabs)/fridge/fridge_add")}>
              <Image
                source={require("../../../assets/images/symbol-plus.png")}
                style={styles.plusIcon}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.subtitle}>
            {fridgeItems.length > 0 ? `${fridgeItems.length} products in your fridge` : "Your fridge is empty"}
          </Text>

        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search products in your fridge..."
            placeholderTextColor="#9ca3af"
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={setSearchTerm}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
        </View>

          {fridgeItems.length > 0 ? (
            <View style={styles.itemsGrid}>
              {fridgeItems.map((item) => {
                const { days, label } = getDaysLeft(item.mhd);
                return (
                  <View key={item.$id} style={styles.fridgeHomeItemCard}>
                    <Image
                      source={getCategoryImage(item.kategorie)}
                      style={styles.fridgeHomeItemImage}
                    />
                    <View style={styles.statusRow}>
                      <View style={styles.statusIconContainer}>
                        <Image
                          source={getStatusIcon(item.mhd)}
                          style={styles.statusIcon}
                        />
                        <Text style={styles.statusText}>
                          {`${days} ${label}`}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.itemDetailsContainer}>
                      <Text style={styles.fridgeHomeItemName} numberOfLines={2}>
                        {item.name}
                      </Text>
                      <View style={styles.quantityContainer}>
                        <QuantityControls
                          item={item}
                          onQuantityChange={onQuantityChange}
                          isUpdating={isUpdating}
                          styles={fridgeStyles}
                        />
                      </View>
                    </View>
                  </View>
                );
              })} 
            </View> ) : (
            <View style={styles.emptyState}>
              <Image
                source={require("../../../assets/images/fridge_icons/fridge.png")}
                style={styles.emptyIcon}
              />
              <Text style={styles.emptyText}>{"Your fridge is empty!"}</Text>
              <Text style={styles.emptySubtext}>
                {"Start adding items to keep track of\nyour food and expiration dates"}
              </Text>
            </View>
            )
          }
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("/(tabs)/fridge/fridge_items")}
        >
          <Text style={styles.addButtonText}>{"Open Fridge"}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

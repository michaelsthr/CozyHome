import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
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
import { fridgeStyles as styles } from "./styles";

export default function Fridge() {
  const router = useRouter();
  const [fridgeItems, setFridgeItems] = useState<KuehlschrankItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { handleQuantityChange, isUpdating } = useQuantityManager();

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

  // Map categories to route names
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
    // Find items that match the search term
    const matchingItems = fridgeItems.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (matchingItems.length === 0) {
      // If no items found, go to general fridge items page
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

  const homeQuantityStyles = {
    quantityControls: styles.homeQuantityControls,
    quantityButton: styles.homeQuantityButton,
    quantityButtonDisabled: { backgroundColor: "#94a3b8" },
    quantityButtonText: styles.homeQuantityButtonText,
    countContainer: styles.homeQuantityDisplay,
    itemCount: styles.homeQuantityText,
    quantityInput: styles.quantityInput,
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

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#8B5CF6" />
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
          <Image
            source={require("../../../assets/images/fridge_icons/logo-2.png")}
            style={styles.logo}
          />
        </View>

        {/* Greeting Section */}
        <View style={styles.greetingSection}>
          <Text style={styles.greeting}>{"Good morning!"}</Text>
          <Text style={styles.username}>{"Max Mustermann"}</Text>
        </View>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search items in your fridge..."
            placeholderTextColor="#9ca3af"
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={setSearchTerm}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
        </View>

        {/* Fridge Section */}
        <View style={styles.fridgeSection}>
          <View style={styles.titleContainer}>
            <Image
              source={require("../../../assets/images/fridge_icons/fridge.png")}
              style={styles.fridgeIcon}
            />
            <Text style={styles.title}>{"Your Fridge"}</Text>
          </View>
          <Text style={styles.subtitle}>
            {fridgeItems.length > 0 ? `${fridgeItems.length} items in your fridge` : "Your fridge is empty"}
          </Text>

          {/* Items Carousel */}
          {fridgeItems.length > 0 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.itemsCarousel}
            >
              {fridgeItems.map((item) => {
                const { days, label } = getDaysLeft(item.mhd);
                return (
                  <View key={item.$id} style={styles.itemCard}>
                    <Image 
                      source={getCategoryImage(item.kategorie)} 
                      style={styles.itemImage} 
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
                      <Text style={styles.itemName} numberOfLines={2}>
                        {item.name}
                      </Text>
                      <QuantityControls
                        item={item}
                        onQuantityChange={onQuantityChange}
                        isUpdating={isUpdating}
                        styles={homeQuantityStyles}
                      />
                    </View>
                  </View>
                );
                })} 
          </ScrollView> ) : (
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

        {/* Check Fridge Button */}
        <TouchableOpacity
          style={styles.checkButton}
          onPress={() => router.push("/(tabs)/fridge/fridge_items")}
        >
          <Text style={styles.checkButtonText}>{"EXPLORE CATEGORIES"}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

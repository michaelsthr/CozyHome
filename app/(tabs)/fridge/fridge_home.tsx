import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { getKuehlschrankInhalt, KuehlschrankItem } from "./fridgeBack/components/dbKuehlschrank";
import { fridgeStyles as styles } from "./styles";

export default function Fridge() {
  const router = useRouter();
  const [fridgeItems, setFridgeItems] = useState<KuehlschrankItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFridgeItems = async () => {
      try {
        const items = await getKuehlschrankInhalt();
        setFridgeItems(items.documents);
      } catch (error) {
        console.error("Error fetching fridge items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFridgeItems();
  }, []);
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
      return { days: -diffDays, label: "Days over" };
    } else {
      return { days: diffDays, label: "Days left" };
    }
  };
  const getCategoryImage = (category?: string) => {
    switch (category) {      case "Obst":
        return require("../../../assets/images/fridge_icons/fruits.png");
      case "Gemüse":
        return require("../../../assets/images/fridge_icons/vegetables.png");
      case "Milchprodukte":
        return require("../../../assets/images/fridge_icons/dairy.png");
      case "Fleisch":
        return require("../../../assets/images/fridge_icons/meat-fish.png");
      case "Getränke":
        return require("../../../assets/images/fridge_icons/drinks.png");
      case "Tiefkühlkost":
        return require("../../../assets/images/fridge_icons/bread.png"); // Using bread as placeholder for frozen
      default:
        return require("../../../assets/images/placeholder_icon.png");
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>        <Image
          source={require("../../../assets/images/fridge_icons/profile-picture.png")}
          style={styles.avatar}
        />
        <Image
          source={require("../../../assets/images/fridge_icons/logo-2.png")}
          style={styles.logo}
        />
      </View>

      {/* Greeting */}
      <Text style={styles.greeting}>Hey!</Text>
      <Text style={styles.username}>Max Mustermann</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search"
          placeholderTextColor="#999"
          style={styles.searchInput}
        />
      </View>

      {/* Fridge Title */}
      <Text style={styles.title}>FRIDGE</Text>
      <Text style={styles.subtitle}>Found {fridgeItems.length} new items</Text>

      {/* Items Carousel */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.itemsList}
      >
        {fridgeItems.map((item) => {
          const { days, label } = getDaysLeft(item.mhd);
          return (
            <View key={item.$id} style={styles.itemCard}>
              <Image source={getCategoryImage(item.kategorie)} style={styles.itemImage} />
              <View style={styles.statusRow}>
                <Image
                  source={getStatusIcon(item.mhd)}
                  style={styles.statusIcon}
                />
                <Text style={styles.statusText}>
                  {days} {label}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Check Fridge Button */}
      <TouchableOpacity
        style={styles.checkButton}
        onPress={() => router.push("/(tabs)/fridge/fridge_items")}
      >
        <Text style={styles.checkButtonText}>CHECK FRIDGE</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

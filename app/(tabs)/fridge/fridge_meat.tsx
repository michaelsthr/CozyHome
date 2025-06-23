import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { getKuehlschrankInhalt, KuehlschrankItem } from "./fridgeBack/components/dbKuehlschrank";
import { fridgeCategoryStyles as styles } from "./styles";

export default function Meat() {
  const router = useRouter();
  const [meatItems, setMeatItems] = useState<KuehlschrankItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchMeatItems = async () => {
      try {
        const items = await getKuehlschrankInhalt();
        const meatProducts = items.documents.filter(item => item.kategorie === "Fleisch");
        setMeatItems(meatProducts);
      } catch (error) {
        console.error("Error fetching meat items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeatItems();
  }, []);

  const filteredItems = meatItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    if (!mhd) return 0;
    const today = new Date();
    const expDate = new Date(mhd);
    const diffTime = expDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#8B5CF6" />
          <Text style={styles.loadingText}>Loading meat & fish...</Text>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("../../../assets/images/fridge_icons/profile-picture.png")}
          style={styles.avatar}
        />
      </View>

      {/* Title Section */}
      <View style={styles.titleSection}>
        <Text style={styles.title}>Meat & Fish</Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Find meat & fish items..."
          placeholderTextColor="#94a3b8"
          style={styles.searchInput}
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>

      {/* Section Label */}
      <View style={styles.labelContainer}>
        <Text style={styles.sectionLabel}>MEAT & FISH</Text>
        <TouchableOpacity>
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {filteredItems.length === 0 ? (
        <View style={styles.emptyState}>
          <Image
            source={require("../../../assets/images/fridge_icons/meat-fish.png")}
            style={styles.emptyIcon}
          />
          <Text style={styles.emptyText}>No meat & fish items</Text>
          <Text style={styles.emptySubtext}>
            Add some meat or fish items to keep track of freshness
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Image 
                source={require("../../../assets/images/fridge_icons/meat-fish.png")} 
                style={styles.itemImage} 
              />

              <View style={styles.info}>
                <View style={styles.statusRow}>
                  <Image source={getStatusIcon(item.mhd)} style={styles.statusIcon} />
                  <Text style={styles.statusText}>
                    {getDaysLeft(item.mhd)} {getDaysLeft(item.mhd) === 1 ? "Day" : "Days"} Remaining
                  </Text>
                </View>
                <Text style={styles.itemName}>{item.name}</Text>
              </View>

              <View style={styles.countContainer}>
                <Text style={styles.itemCount}>{item.anzahl}</Text>
              </View>
            </View>
          )}
          contentContainerStyle={styles.itemsList}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Add New Item Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/(tabs)/fridge/fridge_add")}
      >
        <Text style={styles.addButtonText}>ADD NEW ITEM</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

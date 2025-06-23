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

export default function Bread() {
  const router = useRouter();
  const [breadItems, setBreadItems] = useState<KuehlschrankItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBreadItems = async () => {
      try {
        const items = await getKuehlschrankInhalt();
        // Map bread to "Sonstige" (Other) category since bread doesn't have a specific category
        const breadProducts = items.documents.filter(item => 
          item.kategorie === "Sonstige" || 
          item.name?.toLowerCase().includes('bread') || 
          item.name?.toLowerCase().includes('brot')
        );
        setBreadItems(breadProducts);
      } catch (error) {
        console.error("Error fetching bread items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBreadItems();
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
    if (!mhd) return 0;
    const today = new Date();
    const expDate = new Date(mhd);
    const diffTime = expDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
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
      <View style={styles.header}>
        <Image
          source={require("../../../assets/images/fridge_icons/profile-picture.png")}
          style={styles.avatar}
        />
      </View>

      {/* Title */}
      <Text style={styles.title}>Bread</Text>

      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Find bread"
          placeholderTextColor="#999"
          style={styles.searchInput}
        />
      </View>

      {/* Section Label */}
      <View style={styles.labelContainer}>
        <Text style={styles.sectionLabel}>BREAD</Text>
        <TouchableOpacity>
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>      {/* List */}
      <FlatList
        data={breadItems}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Image source={require("../../../assets/images/fridge_icons/bread.png")} style={styles.itemImage} />

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
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

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

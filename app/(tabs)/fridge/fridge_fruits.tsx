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

export default function Fruits() {
  const router = useRouter();
  const [fruits, setFruits] = useState<KuehlschrankItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFruits = async () => {
      try {
        const items = await getKuehlschrankInhalt();
        const fruitItems = items.documents.filter(item => item.kategorie === "Obst");
        setFruits(fruitItems);
      } catch (error) {
        console.error("Error fetching fruits:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFruits();
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
      <View style={styles.header}>        <Image
          source={require("../../../assets/images/fridge_icons/profile-picture.png")}
          style={styles.avatar}
        />
      </View>

      {/* Title */}
      <Text style={styles.title}>Fruits</Text>

      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Find fruits"
          placeholderTextColor="#999"
          style={styles.searchInput}
        />
      </View>

      {/* Section Label */}
      <View style={styles.labelContainer}>
        <Text style={styles.sectionLabel}>FRUITS</Text>
        <TouchableOpacity>
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>      {/* List */}
      <FlatList
        data={fruits}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Image source={require("../../../assets/images/fridge_icons/fruits.png")} style={styles.itemImage} />

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
              <Text style={styles.count}>{item.anzahl}</Text>              <Image
                source={require("../../../assets/images/fridge_icons/fridge.png")}
                style={styles.fridgeIcon}
              />
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}
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
  View,
} from "react-native";
import { getKuehlschrankInhalt, KuehlschrankItem } from "./fridgeBack/components/dbKuehlschrank";
import { fridgeCategoryStyles as styles } from "./styles";

export default function Dairy() {
  const router = useRouter();
  const { search } = useLocalSearchParams();
  const [dairyItems, setDairyItems] = useState<KuehlschrankItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState((search as string) || "");

  useEffect(() => {
    const fetchDairyItems = async () => {
      try {
        const items = await getKuehlschrankInhalt();
        const dairyProducts = items.documents.filter(item => item.kategorie === "Milchprodukte");
        setDairyItems(dairyProducts);
      } catch (error) {
        console.error("Error fetching dairy items:", error);
      } finally {
        setLoading(false);
      }
    };    fetchDairyItems();
  }, []);

  const filteredItems = dairyItems.filter(item =>
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
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return isNaN(days) ? 0 : days;
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
          <Text style={styles.title}>Dairy Products</Text>
        </View>        {/* Search */}
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Find dairy products..."
            placeholderTextColor="#9ca3af"
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </View>

        {/* List */}
        <View style={styles.itemsList}>
          {filteredItems.map((item) => (
            <View key={item.$id} style={styles.row}>
              <Image source={require("../../../assets/images/fridge_icons/dairy.png")} style={styles.itemImage} />
              <View style={styles.info}>                <View style={styles.statusRow}>
                  <Image source={getStatusIcon(item.mhd)} style={styles.statusIcon} />
                  <Text style={styles.statusText}>
                    {(() => {
                      const days = getDaysLeft(item.mhd);
                      return `${Math.abs(days)} ${Math.abs(days) === 1 ? "Day" : "Days"} ${days < 0 ? "Overdue" : "Remaining"}`;
                    })()}
                  </Text>
                </View>
                <Text style={styles.itemName}>{item.name}</Text>
              </View>
              <View style={styles.countContainer}>
                <Text style={styles.itemCount}>{item.anzahl}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Add New Item Button */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("/(tabs)/fridge/fridge_add")}
        >
          <Text style={styles.addButtonText}>ADD NEW DAIRY PRODUCT</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";

const data = [
  {
    id: "1",
    name: "Banana",
    img: require("../../../assets/images/fridge_icons/banana.png"),
    statusIcon: require("../../../assets/images/fridge_icons/expired.png"),
    days: 0,
    count: 4,
  },
  {
    id: "2",
    name: "Kiwi",
    img: require("../../../assets/images/fridge_icons/kiwi.png"),
    statusIcon: require("../../../assets/images/fridge_icons/eatable.png"),
    days: 5,
    count: 3,
  },
  {
    id: "3",
    name: "Apples",
    img: require("../../../assets/images/fridge_icons/apple.png"),
    statusIcon: require("../../../assets/images/fridge_icons/warning.png"),
    days: 2,
    count: 2,
  },
  {
    id: "4",
    name: "Avocado",
    img: require("../../../assets/images/fridge_icons/avocado.png"),
    statusIcon: require("../../../assets/images/fridge_icons/warning.png"),
    days: 2,
    count: 2,
  },
];

export default function Fruits() {
  const router = useRouter();

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
      </View>

      {/* List */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Image source={item.img} style={styles.itemImage} />

            <View style={styles.info}>
              <View style={styles.statusRow}>
                <Image source={item.statusIcon} style={styles.statusIcon} />
                <Text style={styles.statusText}>
                  {item.days} {item.days === 1 ? "Day" : "Days"} Remaining
                </Text>
              </View>
              <Text style={styles.itemName}>{item.name}</Text>
            </View>

            <View style={styles.countContainer}>
              <Text style={styles.count}>{item.count}</Text>
              <Image
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 20 },
  header: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  backArrow: { fontSize: 28, fontWeight: "700", marginRight: 12 },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  title: { fontSize: 32, fontWeight: "700", marginTop: 16 },
  searchContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  searchInput: { height: 40, paddingHorizontal: 12, fontSize: 16 },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 24,
  },
  sectionLabel: { fontSize: 18, fontWeight: "700" },
  filterText: { fontSize: 14, color: "#007AFF" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  itemImage: { width: 60, height: 60, resizeMode: "contain" },
  info: { flex: 1, marginLeft: 12 },
  statusRow: { flexDirection: "row", alignItems: "center" },
  statusIcon: { width: 30, height: 30, marginRight: 6 },
  statusText: { fontSize: 14, color: "#333" },
  itemName: { fontSize: 16, fontWeight: "600", marginTop: 4 },
  countContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  count: {
    fontSize: 14,
    fontWeight: "700",
    marginRight: 4,
  },
  fridgeIcon: { width: 50, height: 50 },
  separator: { height: 1, backgroundColor: "#eee" },
});
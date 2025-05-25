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
} from "react-native";

// add a `route` field matching your screen file names
const categories = [
  { id: 1, name: "Fruits",    img: require("../../../assets/images/fridge_icons/fruits.png"),    route: "fridge_fruits" },
  { id: 2, name: "Vegetable", img: require("../../../assets/images/fridge_icons/vegetables.png"), route: "" },
  { id: 3, name: "Dairy",     img: require("../../../assets/images/fridge_icons/dairy.png") },
  { id: 4, name: "Bread",     img: require("../../../assets/images/fridge_icons/bread.png") },
  { id: 5, name: "Drinks",    img: require("../../../assets/images/fridge_icons/drinks.png") },
  { id: 6, name: "Meat",      img: require("../../../assets/images/fridge_icons/meat-fish.png") },
];

export default function FridgeItems() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("../../../assets/images/fridge_icons/profile-picture.png")}
          style={styles.avatar}/>
      </View>
      <Text style={styles.title}>Fridge</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Find products"
          placeholderTextColor="#999"
          style={styles.searchInput}
        />
      </View>

      {/* Items Label */}
      <View style={styles.labelContainer}>
        <Text style={styles.itemsLabel}>ITEMS</Text>
        <TouchableOpacity>
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Categories Grid */}
      <View style={styles.itemsContainer}>
        {categories.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.itemCard}
            disabled={!item.route}
            onPress={() => router.push("/fridge/fridge_fruits")}
          >
            <Image source={item.img} style={styles.itemImage} />
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Add New Item Button */}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>ADD NEW ITEM</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
  },
  searchContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  searchInput: {
    height: 40,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  itemsLabel: {
    fontSize: 18,
    fontWeight: "700",
  },
  filterText: {
    fontSize: 14,
    color: "#007AFF",
  },
  itemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },
  itemCard: {
    width: "30%",
    alignItems: "center",
    marginBottom: 20,
  },
  itemImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  itemText: {
    marginTop: 5,
    fontSize: 14,
    color: "#333",
  },
  addButton: {
    marginTop: 30,
    backgroundColor: "#000",
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { fridgeItemsStyles as styles } from "./styles";

// add a `route` field matching your screen file names
const categories = [
  { id: 1, name: "Fruits",    img: require("../../../assets/images/fridge_icons/fruits.png"),    route: "fridge_fruits" },
  { id: 2, name: "Vegetable", img: require("../../../assets/images/fridge_icons/vegetables.png"), route: "fridge_vegetables" },
  { id: 3, name: "Dairy",     img: require("../../../assets/images/fridge_icons/dairy.png"), route: "fridge_dairy" },
  { id: 4, name: "Bread",     img: require("../../../assets/images/fridge_icons/bread.png"), route: "fridge_bread" },
  { id: 5, name: "Drinks",    img: require("../../../assets/images/fridge_icons/drinks.png"), route: "fridge_drinks" },
  { id: 6, name: "Meat",      img: require("../../../assets/images/fridge_icons/meat-fish.png"), route: "fridge_meat" },
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
            onPress={() => router.push(`/fridge/${item.route}` as any)}
          >
            <Image source={item.img} style={styles.itemImage} />
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Add New Item Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/fridge/fridge_add")}
      >
        <Text style={styles.addButtonText}>ADD NEW ITEM</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
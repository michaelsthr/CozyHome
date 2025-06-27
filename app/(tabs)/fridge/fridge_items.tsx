import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { fridgeItemsStyles as styles } from "./styles";

// Routes matching the screen file names
const categories = [
  { id: 1, name: "Fruits",      img: require("../../../assets/images/fridge_icons/fruits.png"), route: "/(tabs)/fridge/fridge_fruits" },
  { id: 2, name: "Vegetable",   img: require("../../../assets/images/fridge_icons/vegetables.png"), route: "/(tabs)/fridge/fridge_vegetables" },
  { id: 3, name: "Dairy",       img: require("../../../assets/images/fridge_icons/dairy.png"), route: "/(tabs)/fridge/fridge_dairy" },
  { id: 4, name: "Drinks",      img: require("../../../assets/images/fridge_icons/drinks.png"), route: "/(tabs)/fridge/fridge_drinks" },
  { id: 5, name: "Meat & Fish", img: require("../../../assets/images/fridge_icons/meat-fish.png"), route: "/(tabs)/fridge/fridge_meat" },
  { id: 6, name: "Frozen",      img: require("../../../assets/images/fridge_icons/freezer.png"), route: "/(tabs)/fridge/fridge_frozen" },
  { id: 7, name: "Other",       img: require("../../../assets/images/fridge_icons/fridge.png"), route: "/(tabs)/fridge/fridge_other" },
];

export default function FridgeItems() {
  const router = useRouter();
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
          <Text style={styles.title}>{"Food Categories"}</Text>
        </View>

        {/* Categories Grid */}
        <View style={styles.itemsContainer}>
          {categories.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.itemCard}
              disabled={!item.route}
              onPress={() => router.push(item.route as any)}
            >
              <Image source={item.img} style={styles.itemImage} />
              <Text style={styles.itemText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Add New Item Button */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("/(tabs)/fridge/fridge_add")}
        >
          <Text style={styles.addButtonText}>{"ADD NEW ITEM"}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
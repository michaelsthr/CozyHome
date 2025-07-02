import { fontStyles } from "@/styles/font_styles";
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
import { fridgeStyles as styles } from "../../../styles/fridge_styles";

// Routes matching the screen file names
const categories = [
  { id: 1, name: "Fruits",      img: require("../../../assets/images/fridge_icons/fruits.png"), route: "/(tabs)/fridge/fridge_fruits" },
  { id: 2, name: "Vegetables",   img: require("../../../assets/images/fridge_icons/vegetables.png"), route: "/(tabs)/fridge/fridge_vegetables" },
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
        contentContainerStyle={styles.scrollContainer}>

        {/* Header with Title and Plus Button */}
        <View style={styles.headerContainer}>
          <Text style={fontStyles.title}>{"Food Categories"}</Text>
          <TouchableOpacity
            style={styles.plusButton}
            onPress={() => router.push("/(tabs)/fridge/fridge_add")}
          >
            <Image
              source={require("../../../assets/images/symbol-plus.png")}
              style={styles.plusIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Categories Grid */}
        <View style={styles.itemsContainer}>
          {categories.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.gridItemCard}
              disabled={!item.route}
              onPress={() => router.push(item.route as any)}
            >
              <Image source={item.img} style={styles.itemImage} />
              <Text style={styles.itemName}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
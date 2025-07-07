import { ContainerStyles } from "@/styles/container_styles";
import { fontStyles } from "@/styles/font_styles";
import { useRouter } from "expo-router";
import React from "react";
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import { fridgeStyles as styles } from "../../../styles/fridge_styles";

const categories = [
  { id: 1, name: "Fruits",      img: require("../../../assets/images/fridge_icons/fruits.png"), route: "/(tabs)/fridge/fridge_category" },
  { id: 2, name: "Vegetables",  img: require("../../../assets/images/fridge_icons/vegetables.png"), route: "/(tabs)/fridge/fridge_category" },
  { id: 3, name: "Dairy",       img: require("../../../assets/images/fridge_icons/dairy.png"), route: "/(tabs)/fridge/fridge_category" },
  { id: 4, name: "Drinks",      img: require("../../../assets/images/fridge_icons/drinks.png"), route: "/(tabs)/fridge/fridge_category" },
  { id: 5, name: "Meat & Fish", img: require("../../../assets/images/fridge_icons/meat-fish.png"), route: "/(tabs)/fridge/fridge_category" },
  { id: 6, name: "Frozen",      img: require("../../../assets/images/fridge_icons/freezer.png"), route: "/(tabs)/fridge/fridge_category" },
  { id: 7, name: "Other",       img: require("../../../assets/images/fridge_icons/fridge.png"), route: "/(tabs)/fridge/fridge_category" },
];

export default function FridgeItems() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>

      <View style={styles.fridgeSection}>
        <View style={ContainerStyles.titleSection}>
          <Text style={fontStyles.title}>{"Categories"}</Text>
        </View>

        <View style={styles.itemsContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryContainer}
              onPress={() => router.push({ pathname: "/(tabs)/fridge/fridge_category", params: { category: category.name } })}
            >
              <Image source={category.img} style={styles.categoryImage} />
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}
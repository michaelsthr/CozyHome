import { useRouter } from "expo-router";
import React from "react";
import {
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { fridgeStyles as styles } from "./styles";

const fridgeItems = [
  {
    id: 1,
    name: "Milk",
    img: require("../../../assets/images/fridge_icons/milk.png"),
    statusIcon: require("../../../assets/images/fridge_icons/expired.png"),
    days: 0,
    label: "Days left",
  },
  {
    id: 2,
    name: "Bananas",
    img: require("../../../assets/images/fridge_icons/banana.png"),
    statusIcon: require("../../../assets/images/fridge_icons/warning.png"),
    days: 2,
    label: "Days left",
  },
  {
    id: 3,
    name: "Apple",
    img: require("../../../assets/images/fridge_icons/apple.png"),
    statusIcon: require("../../../assets/images/fridge_icons/eatable.png"),
    days: 10,
    label: "Days left",
  },
  // ...more items
];

export default function Fridge() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("../../../assets/images/fridge_icons/profile-picture.png")}
          style={styles.avatar}
        />
        <Image
          source={require("../../../assets/images/fridge_icons/logo-2.png")}
          style={styles.logo}
        />
      </View>

      {/* Greeting */}
      <Text style={styles.greeting}>Hey!</Text>
      <Text style={styles.username}>Max Mustermann</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search"
          placeholderTextColor="#999"
          style={styles.searchInput}
        />
      </View>

      {/* Fridge Title */}
      <Text style={styles.title}>FRIDGE</Text>
      <Text style={styles.subtitle}>Found {fridgeItems.length} new items</Text>

      {/* Items Carousel */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.itemsList}
      >
        {fridgeItems.map((item) => (
          <View key={item.id} style={styles.itemCard}>
            <Image source={item.img} style={styles.itemImage} />
            <View style={styles.statusRow}>
              <Image
                source={item.statusIcon}
                style={styles.statusIcon}
              />
              <Text style={styles.statusText}>
                {item.days} {item.label}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Check Fridge Button */}
      <TouchableOpacity
        style={styles.checkButton}
        onPress={() => router.push("/fridge/fridge_items")}
      >
        <Text style={styles.checkButtonText}>CHECK FRIDGE</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

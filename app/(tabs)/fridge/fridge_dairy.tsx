import { useRouter } from "expo-router";
import React from "react";
import {
    FlatList,
    Image,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { fridgeCategoryStyles as styles } from "./styles";

const data = [
  {
    id: "1",
    name: "Milk",
    img: require("../../../assets/images/fridge_icons/dairy.png"),
    statusIcon: require("../../../assets/images/fridge_icons/eatable.png"),
    days: 7,
    count: 1,
  },
];

export default function Dairy() {
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
      <Text style={styles.title}>Dairy</Text>

      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Find dairy products"
          placeholderTextColor="#999"
          style={styles.searchInput}
        />
      </View>

      {/* Section Label */}
      <View style={styles.labelContainer}>
        <Text style={styles.sectionLabel}>DAIRY</Text>
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
              <Text style={styles.itemCount}>{item.count}</Text>
            </View>
          </View>
        )}
      />

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

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
import { fridgeCategoryStyles as styles } from "../styles";

const data = [
  {
    id: "1",
    name: "Banana",
    img: require("../../../../assets/images/fridge_icons/banana.png"),
    statusIcon: require("../../../../assets/images/fridge_icons/expired.png"),
    days: 0,
    count: 4,
  },
  {
    id: "2",
    name: "Kiwi",
    img: require("../../../../assets/images/fridge_icons/kiwi.png"),
    statusIcon: require("../../../../assets/images/fridge_icons/eatable.png"),
    days: 5,
    count: 3,
  },
  {
    id: "3",
    name: "Apples",
    img: require("../../../../assets/images/fridge_icons/apple.png"),
    statusIcon: require("../../../../assets/images/fridge_icons/warning.png"),
    days: 2,
    count: 2,
  },
  {
    id: "4",
    name: "Avocado",
    img: require("../../../../assets/images/fridge_icons/avocado.png"),
    statusIcon: require("../../../../assets/images/fridge_icons/warning.png"),
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
          source={require("../../../../assets/images/fridge_icons/profile-picture.png")}
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
                source={require("../../../../assets/images/fridge_icons/fridge.png")}
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
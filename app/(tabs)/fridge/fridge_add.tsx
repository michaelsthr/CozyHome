import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

export default function AddItem() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");

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
      <Text style={styles.title}>Add</Text>

      {/* Form Fields */}
      <TextInput
        placeholder="Product name"
        placeholderTextColor="#999"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Weight/Volume"
        placeholderTextColor="#999"
        style={styles.input}
        value={weight}
        onChangeText={setWeight}
      />
      <TextInput
        placeholder="Quantity"
        placeholderTextColor="#999"
        style={styles.input}
        value={quantity}
        onChangeText={setQuantity}
      />
      <TextInput
        placeholder="Category"
        placeholderTextColor="#999"
        style={styles.input}
        value={category}
        onChangeText={setCategory}
      />

      {/* Add Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          // TODO: handle save
          router.back();
        }}
      >
        <Text style={styles.addButtonText}>ADD</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 20 },
  header: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  backArrow: { fontSize: 28, fontWeight: "700", marginRight: 12 },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  title: { fontSize: 32, fontWeight: "700", marginVertical: 20 },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  addButton: {
    marginTop: 10,
    backgroundColor: "#000",
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: "center",
  },
  addButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
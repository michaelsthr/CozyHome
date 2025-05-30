import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { fridgeAddStyles as styles } from "./styles";

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
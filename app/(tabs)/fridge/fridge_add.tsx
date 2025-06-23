import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    Image,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { FridgeCategoryType } from "../../../lib/constants/categories";
import { setKuehlschrankInhalt } from "./fridgeBack/components/dbKuehlschrank";
import { fridgeAddStyles as styles } from "./styles";

export default function AddItem() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [expDate, setExpDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert("Error", "Please enter a product name");
      return;
    }
    
    if (!quantity.trim() || isNaN(Number(quantity))) {
      Alert.alert("Error", "Please enter a valid quantity");
      return;
    }

    setIsSubmitting(true);
    
    try {      await setKuehlschrankInhalt({
        name: name.trim(),
        anzahl: Number(quantity),
        kategorie: (category.trim() as FridgeCategoryType) || undefined,
        mhd: expDate.trim() || undefined,
      });
      
      Alert.alert("Success", "Item added successfully!", [
        { text: "OK", onPress: () => router.back() }
      ]);
    } catch (error) {
      console.error("Error adding item:", error);
      Alert.alert("Error", "Failed to add item. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>        <Image
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
      />      <TextInput
        placeholder="Category"
        placeholderTextColor="#999"
        style={styles.input}
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        placeholder="Expiration Date (YYYY-MM-DD)"
        placeholderTextColor="#999"
        style={styles.input}
        value={expDate}
        onChangeText={setExpDate}
      />

      {/* Add Button */}
      <TouchableOpacity
        style={[styles.addButton, isSubmitting && { opacity: 0.5 }]}
        onPress={handleSave}
        disabled={isSubmitting}
      >
        <Text style={styles.addButtonText}>
          {isSubmitting ? "ADDING..." : "ADD"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
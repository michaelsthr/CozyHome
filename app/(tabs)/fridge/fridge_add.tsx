import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
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
          <Text style={styles.title}>Add New Item</Text>
        </View>

        {/* Form Container */}
        <View style={styles.formContainer}>
          {/* Product Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Product Name *</Text>
            <TextInput
              placeholder="Enter product name..."
              placeholderTextColor="#9ca3af"
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Weight/Volume */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Weight/Volume</Text>
            <TextInput
              placeholder="e.g., 500g, 1L..."
              placeholderTextColor="#9ca3af"
              style={styles.input}
              value={weight}
              onChangeText={setWeight}
            />
          </View>

          {/* Quantity */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Quantity *</Text>
            <TextInput
              placeholder="Enter quantity..."
              placeholderTextColor="#9ca3af"
              style={styles.input}
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="numeric"
            />
          </View>

          {/* Category */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Category</Text>
            <TextInput
              placeholder="e.g., Obst, Gemüse, Milchprodukte..."
              placeholderTextColor="#9ca3af"
              style={styles.input}
              value={category}
              onChangeText={setCategory}
            />
          </View>

          {/* Expiration Date */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Expiration Date</Text>
            <TextInput
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#9ca3af"
              style={styles.input}
              value={expDate}
              onChangeText={setExpDate}
            />
          </View>
        </View>

        {/* Add Button */}
        <TouchableOpacity
          style={[styles.addButton, isSubmitting && { opacity: 0.5 }]}
          onPress={handleSave}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <View style={styles.buttonContent}>
              <ActivityIndicator size="small" color="#ffffff" style={{ marginRight: 10 }} />
              <Text style={styles.addButtonText}>ADDING...</Text>
            </View>
          ) : (
            <Text style={styles.addButtonText}>ADD TO FRIDGE</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
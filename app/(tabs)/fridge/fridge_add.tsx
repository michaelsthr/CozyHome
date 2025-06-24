import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FridgeCategories, FridgeCategoryType, getAllFridgeCategories } from "../../../lib/constants/categories";
import { setKuehlschrankInhalt } from "./fridgeBack/components/dbKuehlschrank";
import { fridgeAddStyles as styles } from "./styles";

export default function AddItem() {
  const router = useRouter();  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState<FridgeCategoryType>(FridgeCategories.OTHER);
  const [expDate, setExpDate] = useState<Date | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const categories = getAllFridgeCategories();  // Generate calendar days for web
  const generateCalendarDays = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day for accurate comparison
    
    const currentMonth = selectedMonth;
    const currentYear = selectedYear;
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      date.setHours(0, 0, 0, 0); // Reset time for accurate comparison
      
      // Include today and all future dates
      if (date >= today) {
        days.push(day);
      } else {
        days.push(-day); // Negative number for past dates (to show but disable)
      }
    }
    
    return days;
  };  const selectDate = (day: number) => {
    const selectedDate = new Date(selectedYear, selectedMonth, day);
    setExpDate(selectedDate);
    if (Platform.OS === 'web') {
      // Auto-close on web after a short delay to show selection
      setTimeout(() => {
        setShowDatePicker(false);
      }, 300);
    }
  };

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      setExpDate(selectedDate);
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "Select expiration date";
    return date.toLocaleDateString('en-GB'); // DD/MM/YYYY format
  };

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
        kategorie: category,
        mhd: expDate ? expDate.toISOString().split('T')[0] : undefined,
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
  };  return (
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
        </View>        {/* Form Container */}
        <View style={styles.formContainer}>{/* Product Name */}
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
          </View>          {/* Category */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Category</Text><TouchableOpacity
              style={styles.dropdownInput}
              onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}
            >
              <Text style={styles.dropdownText}>
                {category}
              </Text>
              <Text style={styles.dropdownArrow}>
                {showCategoryDropdown ? "▲" : "▼"}
              </Text>
            </TouchableOpacity>
          </View>          {/* Expiration Date */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Expiration Date</Text>            <TouchableOpacity
              style={styles.input}
              onPress={() => {
                console.log('Date picker button pressed');
                // Reset to current month when opening
                const now = new Date();
                setSelectedMonth(now.getMonth());
                setSelectedYear(now.getFullYear());
                setShowDatePicker(true);
              }}
            >
              <Text style={[styles.dropdownText, !expDate && { color: "#9ca3af" }]}>
                {formatDate(expDate)}
              </Text>
            </TouchableOpacity>
            {expDate && (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => setExpDate(null)}
              >
                <Text style={styles.clearButtonText}>Clear</Text>
              </TouchableOpacity>            )}
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
          ) : (            <Text style={styles.addButtonText}>ADD TO FRIDGE</Text>
          )}        </TouchableOpacity>        {/* Date Picker */}
        {showDatePicker && (
          <Modal
            visible={showDatePicker}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setShowDatePicker(false)}
          >
            <TouchableOpacity 
              style={styles.modalOverlay}
              activeOpacity={1}
              onPress={() => setShowDatePicker(false)}
            >
              <TouchableOpacity activeOpacity={1}>                <View style={[styles.modalContent, { alignItems: 'center', maxHeight: '90%', minHeight: 520 }]}>
                  <Text style={styles.modalTitle}>Select Expiration Date</Text><View style={{ width: '100%', alignItems: 'center', paddingVertical: 20 }}>
                    {Platform.OS === 'web' ? (                      <View style={{ width: '100%', maxWidth: 300 }}>
                        {/* Month/Year Navigation */}
                        <View style={{ 
                          flexDirection: 'row', 
                          justifyContent: 'space-between', 
                          alignItems: 'center',
                          marginBottom: 20,
                          paddingHorizontal: 10
                        }}>                          {/* Previous Month Button */}
                          <TouchableOpacity
                            style={{
                              padding: 8,
                              borderRadius: 6,
                              backgroundColor: '#f3f4f6',
                              opacity: (selectedYear === new Date().getFullYear() && selectedMonth <= new Date().getMonth()) ? 0.5 : 1
                            }}
                            onPress={() => {
                              // Don't allow going to past months in current year
                              if (selectedYear === new Date().getFullYear() && selectedMonth <= new Date().getMonth()) {
                                return;
                              }
                              
                              if (selectedMonth === 0) {
                                setSelectedMonth(11);
                                setSelectedYear(selectedYear - 1);
                              } else {
                                setSelectedMonth(selectedMonth - 1);
                              }
                            }}
                            disabled={selectedYear === new Date().getFullYear() && selectedMonth <= new Date().getMonth()}
                          >
                            <Text style={{ fontSize: 16, fontWeight: '600' }}>‹</Text>
                          </TouchableOpacity>

                          {/* Month/Year Display */}
                          <Text style={[styles.modalTitle, { fontSize: 18, margin: 0, color: '#1e293b' }]}>
                            {new Date(selectedYear, selectedMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                          </Text>

                          {/* Next Month Button */}
                          <TouchableOpacity
                            style={{
                              padding: 8,
                              borderRadius: 6,
                              backgroundColor: '#f3f4f6'
                            }}
                            onPress={() => {
                              if (selectedMonth === 11) {
                                setSelectedMonth(0);
                                setSelectedYear(selectedYear + 1);
                              } else {
                                setSelectedMonth(selectedMonth + 1);
                              }
                            }}
                          >
                            <Text style={{ fontSize: 16, fontWeight: '600' }}>›</Text>
                          </TouchableOpacity>
                        </View>
                        
                        {/* Days of week header */}
                        <View style={{ 
                          flexDirection: 'row', 
                          marginBottom: 15,
                          paddingBottom: 10,
                          borderBottomWidth: 1,
                          borderBottomColor: '#e5e7eb'
                        }}>
                          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <Text key={day} style={{
                              flex: 1,
                              textAlign: 'center',
                              fontWeight: '600',
                              color: '#6b7280',
                              fontSize: 13,
                              paddingVertical: 5
                            }}>
                              {day}
                            </Text>
                          ))}
                        </View>
                          {/* Calendar Grid */}                        <View style={{ 
                          flexDirection: 'row', 
                          flexWrap: 'wrap',
                          height: 240, // Fixed height for 6 weeks (6 * 40px)
                          overflow: 'visible'
                        }}>
                          {generateCalendarDays().map((day, index) => {
                            const isSelected = day && day > 0 && expDate && 
                              expDate.getDate() === day && 
                              expDate.getMonth() === selectedMonth && 
                              expDate.getFullYear() === selectedYear;
                            const isPastDate = day && day < 0;
                            const actualDay = Math.abs(day || 0);
                            const isClickable = day && day > 0;
                            
                            return (                              <TouchableOpacity
                                key={index}
                                style={{
                                  width: '14.28%', // 100% / 7 days
                                  height: 38, // Fixed height instead of aspectRatio
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  backgroundColor: isSelected ? '#059669' : isClickable ? '#f9fafb' : 'transparent',
                                  borderRadius: 6,
                                  margin: 1,
                                  opacity: isPastDate ? 0.3 : 1,
                                  borderWidth: isClickable ? 1 : 0,
                                  borderColor: isSelected ? '#059669' : '#e5e7eb'
                                }}
                                onPress={() => isClickable && selectDate(actualDay)}
                                disabled={!isClickable}
                              >
                                {(day !== null && day !== 0) && (
                                  <Text style={{
                                    color: isSelected ? '#ffffff' : isPastDate ? '#9ca3af' : '#374151',
                                    fontWeight: isSelected ? '700' : '500',
                                    fontSize: 14
                                  }}>
                                    {actualDay}
                                  </Text>
                                )}
                              </TouchableOpacity>
                            );
                          })}
                        </View>
                      </View>
                    ) : (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={expDate || new Date()}
                        mode="date"
                        display={Platform.OS === "ios" ? "spinner" : "default"}
                        onChange={handleDateChange}
                        minimumDate={new Date()}
                      />
                    )}
                  </View>
                  
                  <TouchableOpacity
                    style={[styles.addButton, { marginTop: 10, marginHorizontal: 0, width: '100%' }]}
                    onPress={() => setShowDatePicker(false)}
                  >
                    <Text style={styles.addButtonText}>DONE</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </TouchableOpacity>
          </Modal>
        )}
        
        {/* Category Selection Modal */}
        <Modal
          visible={showCategoryDropdown}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowCategoryDropdown(false)}
        >
          <TouchableOpacity 
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setShowCategoryDropdown(false)}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Category</Text>
              <ScrollView showsVerticalScrollIndicator={false}>
                {categories.map((cat, index) => (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      styles.modalItem,
                      category === cat && styles.selectedItem
                    ]}
                    onPress={() => {
                      setCategory(cat);
                      setShowCategoryDropdown(false);
                    }}
                  >
                    <Text style={[
                      styles.modalItemText,
                      category === cat && styles.selectedItemText
                    ]}>
                      {cat}
                    </Text>
                    {category === cat && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </TouchableOpacity>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}
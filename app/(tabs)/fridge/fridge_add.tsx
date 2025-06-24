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
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [showYearPicker, setShowYearPicker] = useState(false);

  const categories = getAllFridgeCategories();

  // Generate available years (current year + next 10 years)
  const generateYearList = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 0; i <= 10; i++) {
      years.push(currentYear + i);
    }
    return years;
  };  // Generate calendar days for web
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
    // Auto-close after a short delay to show selection
    setTimeout(() => {
      setShowDatePicker(false);
    }, Platform.OS === 'web' ? 300 : 500); // Slightly longer delay on mobile
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
          >            <TouchableOpacity 
              style={styles.modalOverlay}
              activeOpacity={1}
              onPress={() => {
                setShowDatePicker(false);
                setShowYearPicker(false);
              }}
            >
              <TouchableOpacity activeOpacity={1}>                <View style={[styles.modalContent, { 
                  alignItems: 'center', 
                  maxHeight: '90%', 
                  minHeight: Platform.OS === 'web' ? 550 : 580, // Slightly taller on mobile
                  paddingBottom: 15,
                  width: Platform.OS === 'web' ? '100%' : '95%' // Slightly narrower on mobile for better margins
                }]}>                  <Text style={[styles.modalTitle, { marginBottom: 25, fontSize: 20, color: '#059669' }]}>Select Expiration Date</Text>                  <View style={{ width: '100%', alignItems: 'center' }}>
                    {/* Always show custom calendar - it works great on mobile too! */}
                    <View style={{ width: '100%', maxWidth: Platform.OS === 'web' ? 320 : 300 }}>{/* Year/Month Navigation Header */}
                        <View style={{ 
                          backgroundColor: '#f8fafc',
                          borderRadius: 12,
                          padding: 15,
                          marginBottom: 20,
                          shadowColor: "#000",
                          shadowOffset: { width: 0, height: 1 },
                          shadowOpacity: 0.05,
                          shadowRadius: 2,
                          elevation: 2,
                        }}>
                          {/* Year Selection Row */}
                          <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: showYearPicker ? 15 : 0,
                          }}>
                            <TouchableOpacity
                              style={{
                                backgroundColor: '#ffffff',
                                paddingHorizontal: 15,
                                paddingVertical: 8,
                                borderRadius: 8,
                                borderWidth: 1,
                                borderColor: '#e2e8f0',
                                minWidth: 80,
                                alignItems: 'center',
                              }}
                              onPress={() => setShowYearPicker(!showYearPicker)}
                            >
                              <Text style={{ fontSize: 16, fontWeight: '600', color: '#1e293b' }}>
                                {selectedYear} {showYearPicker ? '▲' : '▼'}
                              </Text>
                            </TouchableOpacity>

                            <Text style={{ fontSize: 18, fontWeight: '700', color: '#059669', flex: 1, textAlign: 'center' }}>
                              {new Date(selectedYear, selectedMonth).toLocaleDateString('en-US', { month: 'long' })}
                            </Text>                            <View style={{ flexDirection: 'row', gap: Platform.OS === 'web' ? 8 : 12 }}>
                              <TouchableOpacity
                                style={{
                                  backgroundColor: '#ffffff',
                                  padding: Platform.OS === 'web' ? 8 : 12, // Larger touch targets on mobile
                                  borderRadius: 8,
                                  borderWidth: 1,
                                  borderColor: '#e2e8f0',
                                  opacity: (selectedYear === new Date().getFullYear() && selectedMonth <= new Date().getMonth()) ? 0.5 : 1
                                }}
                                onPress={() => {
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
                                <Text style={{ fontSize: 16, fontWeight: '600', color: '#1e293b' }}>‹</Text>
                              </TouchableOpacity>                              <TouchableOpacity
                                style={{
                                  backgroundColor: '#ffffff',
                                  padding: Platform.OS === 'web' ? 8 : 12, // Larger touch targets on mobile
                                  borderRadius: 8,
                                  borderWidth: 1,
                                  borderColor: '#e2e8f0',
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
                                <Text style={{ fontSize: 16, fontWeight: '600', color: '#1e293b' }}>›</Text>
                              </TouchableOpacity>
                            </View>
                          </View>

                          {/* Year Picker Dropdown */}
                          {showYearPicker && (
                            <View style={{
                              backgroundColor: '#ffffff',
                              borderRadius: 8,
                              maxHeight: 120,
                              borderWidth: 1,
                              borderColor: '#e2e8f0',
                            }}>
                              <ScrollView showsVerticalScrollIndicator={false}>
                                {generateYearList().map((year) => (
                                  <TouchableOpacity
                                    key={year}
                                    style={{
                                      paddingVertical: 10,
                                      paddingHorizontal: 15,
                                      backgroundColor: year === selectedYear ? '#f0f9ff' : 'transparent',
                                      borderBottomWidth: year !== generateYearList()[generateYearList().length - 1] ? 1 : 0,
                                      borderBottomColor: '#f1f5f9',
                                    }}
                                    onPress={() => {
                                      setSelectedYear(year);
                                      setShowYearPicker(false);
                                    }}
                                  >
                                    <Text style={{
                                      fontSize: 16,
                                      fontWeight: year === selectedYear ? '600' : '400',
                                      color: year === selectedYear ? '#0369a1' : '#374151',
                                      textAlign: 'center',
                                    }}>
                                      {year}
                                    </Text>
                                  </TouchableOpacity>
                                ))}
                              </ScrollView>
                            </View>
                          )}
                        </View>
                          {/* Days of week header */}
                        <View style={{ 
                          flexDirection: 'row', 
                          marginBottom: 12,
                          paddingBottom: 8,
                          borderBottomWidth: 2,
                          borderBottomColor: '#e0f2fe'
                        }}>
                          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <Text key={day} style={{
                              flex: 1,
                              textAlign: 'center',
                              fontWeight: '700',
                              color: '#059669',
                              fontSize: 14,
                              paddingVertical: 5
                            }}>
                              {day}
                            </Text>
                          ))}
                        </View>
                          {/* Calendar Grid */}
                        <View style={{ 
                          flexDirection: 'row', 
                          flexWrap: 'wrap',
                          height: Platform.OS === 'web' ? 250 : 280, // Slightly taller on mobile for better touch targets
                          overflow: 'visible',
                          backgroundColor: '#ffffff',
                          borderRadius: 8,
                          padding: Platform.OS === 'web' ? 5 : 8 // More padding on mobile
                        }}>
                          {generateCalendarDays().map((day, index) => {
                            const isSelected = day && day > 0 && expDate && 
                              expDate.getDate() === day && 
                              expDate.getMonth() === selectedMonth && 
                              expDate.getFullYear() === selectedYear;
                            const isPastDate = day && day < 0;
                            const actualDay = Math.abs(day || 0);
                            const isClickable = day && day > 0;                            
                            return (
                              <View
                                key={index}
                                style={{
                                  width: '14.28%',
                                  height: Platform.OS === 'web' ? 40 : 44, // Larger touch targets on mobile
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  margin: Platform.OS === 'web' ? 1.5 : 2, // More spacing on mobile
                                }}
                              >
                                {day !== null && (
                                  <TouchableOpacity
                                    style={{
                                      width: '100%',
                                      height: '100%',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      backgroundColor: isSelected ? '#059669' : isClickable ? '#ffffff' : 'transparent',
                                      borderRadius: 8,
                                      opacity: isPastDate ? 0.3 : 1,
                                      borderWidth: isClickable ? (isSelected ? 0 : 1) : 0,
                                      borderColor: '#e2e8f0',
                                      shadowColor: isSelected ? '#059669' : '#000',
                                      shadowOffset: { width: 0, height: isSelected ? 2 : 1 },
                                      shadowOpacity: isSelected ? 0.3 : (isClickable ? 0.05 : 0),
                                      shadowRadius: isSelected ? 3 : 1,
                                      elevation: isSelected ? 3 : (isClickable ? 1 : 0),
                                    }}
                                    onPress={() => isClickable && selectDate(actualDay)}
                                    disabled={!isClickable}
                                  >
                                    <Text style={{
                                      color: isSelected ? '#ffffff' : isPastDate ? '#9ca3af' : '#1e293b',
                                      fontWeight: isSelected ? '700' : (isClickable ? '600' : '400'),
                                      fontSize: Platform.OS === 'web' ? 15 : 16 // Slightly larger on mobile
                                    }}>
                                      {actualDay}
                                    </Text>
                                  </TouchableOpacity>
                                )}
                              </View>
                            );
                          })}</View>
                      </View>
                  </View>
                    <TouchableOpacity
                    style={[styles.addButton, { 
                      marginTop: 25, 
                      marginHorizontal: 0, 
                      width: '100%',
                      paddingVertical: 15,
                      borderRadius: 12,
                      shadowColor: '#059669',
                      shadowOffset: { width: 0, height: 3 },
                      shadowOpacity: 0.3,
                      shadowRadius: 4,
                      elevation: 6
                    }]}
                    onPress={() => setShowDatePicker(false)}
                  >
                    <Text style={[styles.addButtonText, { fontSize: 16, letterSpacing: 1 }]}>DONE</Text>
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
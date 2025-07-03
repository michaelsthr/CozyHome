import TimePickerModal from "@/components/calendar/time_picker_modal";
import { ContainerStyles } from "@/styles/container_styles";
import { fontStyles } from "@/styles/font_styles";
import { inputStyles } from "@/styles/input_styles";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Modal,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { setKuehlschrankInhalt } from "../../../lib/appwrite/dbKuehlschrank";
import {
    FridgeCategories,
    FridgeCategoryType,
    getAllFridgeCategories,
} from "../../../lib/constants/categories";
import { fridgeStyles as styles } from "../../../styles/fridge_styles";

export default function AddItem() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("1");
    const [category, setCategory] = useState<FridgeCategoryType>(FridgeCategories.OTHER);
    const [expDate, setExpDate] = useState<Date | null>(new Date());
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    useEffect(() => {
        if (params.category) {
            setCategory(params.category as FridgeCategoryType);
        }
    }, [params.category]);

    const categories = getAllFridgeCategories();

    // Generate calendar
    const generateCalendar = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const firstDay = new Date(selectedYear, selectedMonth, 1);
        const lastDay = new Date(selectedYear, selectedMonth + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const startingDay = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;

        const days = [];

        for (let i = 0; i < startingDay; i++) {
            days.push(null);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(selectedYear, selectedMonth, day);
            date.setHours(0, 0, 0, 0);

            days.push({
                day,
                date,
                isPast: date < today,
                isToday: date.getTime() === today.getTime(),
            });
        }
        return days;
    };

    const selectDate = (day: any) => {
        setExpDate(day);
        setShowDatePicker(false);
    };

    const goToPreviousMonth = () => {
        if (selectedMonth === 0) {
            setSelectedMonth(11);
            setSelectedYear(selectedYear - 1);
        } else {
            setSelectedMonth(selectedMonth - 1);
        }
    };

    const goToNextMonth = () => {
        if (selectedMonth === 11) {
            setSelectedMonth(0);
            setSelectedYear(selectedYear + 1);
        } else {
            setSelectedMonth(selectedMonth + 1);
        }
    };

    const goToToday = () => {
        const today = new Date();
        setSelectedMonth(today.getMonth());
        setSelectedYear(today.getFullYear());
    };

    const formatDate = (date: Date | null) => {
        if (!date) return "Select expiration date";
        return date.toLocaleDateString("en-GB");
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
        try {
            await setKuehlschrankInhalt({
                name: name.trim(),
                anzahl: Number(quantity),
                kategorie: category,
                mhd: expDate ? expDate.toISOString().split("T")[0] : undefined,
            });

            Alert.alert("Success", "Item added successfully!", [
                { text: "OK", onPress: () => router.back() },
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
                contentContainerStyle={styles.scrollContainer}>

                <View style={styles.fridgeSection}>        
                {/* Title Section */}
                <View style={ContainerStyles.titleSection}>
                    <Text style={fontStyles.title}>{"Add New Item"}</Text>
                </View>
            
                {/* Form Container */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>{"Product Name"}</Text>
                        <TextInput
                            placeholder='Enter product name...'
                            placeholderTextColor='#9ca3af'
                            style={inputStyles.input}
                            value={name}
                            onChangeText={setName}
                            returnKeyType='done'
                        />
                    </View>

                    {/* Quantity */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>{"Quantity"} </Text>
                        <TextInput
                            placeholder='Enter quantity...'
                            placeholderTextColor='#9ca3af'
                            style={inputStyles.input}
                            value={quantity}
                            onChangeText={setQuantity}
                            keyboardType='numeric'
                            returnKeyType='done'
                        />
                    </View>

                    {/* Category */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>{"Category"}</Text>
                        <TouchableOpacity
                            style={styles.dropdownInput}
                            onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}>
                            <Text style={styles.dropdownText}>{category}</Text>
                            <Text style={styles.dropdownArrow}>
                                {showCategoryDropdown ? "▲" : "▼"}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Expiration Date */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>{"Expiration Date"}</Text>
                        <TouchableOpacity
                            style={inputStyles.input}
                            onPress={() => {
                                const now = new Date();
                                setSelectedMonth(now.getMonth());
                                setSelectedYear(now.getFullYear());
                                setShowDatePicker(true);
                            }}>
                            <Text style={[styles.dropdownText, !expDate && { color: "#9ca3af" }]}>
                                {formatDate(expDate)}
                            </Text>
                        </TouchableOpacity>
                        {expDate && (
                            <TouchableOpacity
                                style={styles.clearButton}
                                onPress={() => setExpDate(null)}>
                                <Text style={styles.clearButtonText}>{"Clear"}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
                {/* Add Button */}
                <TouchableOpacity
                    style={[styles.addButton, isSubmitting && { opacity: 0.5 }]}
                    onPress={handleSave}
                    disabled={isSubmitting}>
                    {isSubmitting ? (
                        <View style={styles.buttonContent}>
                            <ActivityIndicator
                                size='small'
                                color='#ffffff'
                                style={{ marginRight: 10 }}
                            />
                            <Text style={styles.addButtonText}>{"ADDING..."}</Text>
                        </View>
                    ) : (
                        <Text style={styles.addButtonText}>{"ADD TO FRIDGE"}</Text>
                    )}
                </TouchableOpacity>

                {/* Date Picker Modal */}
                <TimePickerModal
                    showStartDatePicker={showDatePicker}
                    value={new Date()}
                    onDateChanges={(event, date) => selectDate(date)}
                    title='Select a date'
                    onDismiss={() => setShowDatePicker(false)}
                />

                {/* Category Selection Modal */}
                <Modal
                    visible={showCategoryDropdown}
                    transparent={true}
                    animationType='fade'
                    onRequestClose={() => setShowCategoryDropdown(false)}>
                    <TouchableOpacity
                        style={styles.modalOverlay}
                        activeOpacity={1}
                        onPress={() => setShowCategoryDropdown(false)}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>{"Select Category"}</Text>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {categories.map((cat, index) => (
                                    <TouchableOpacity
                                        key={cat}
                                        style={[
                                            styles.modalItem,
                                            category === cat && styles.selectedItem,
                                        ]}
                                        onPress={() => {
                                            setCategory(cat);
                                            setShowCategoryDropdown(false);
                                        }}>
                                        <Text
                                            style={[
                                                styles.modalItemText,
                                                category === cat && styles.selectedItemText,
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

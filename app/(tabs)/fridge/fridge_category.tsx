import { useQuantityManager } from "@/hooks/useQuantityManager";
import { getKuehlschrankInhalt, KuehlschrankItem } from "@/lib/appwrite/dbKuehlschrank";
import { ContainerStyles } from "@/styles/container_styles";
import { fontStyles } from "@/styles/font_styles";
import { fridgeStyles as styles } from "@/styles/fridge_styles";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View, } from "react-native";

const getCategoryIcon = (category?: string) => {
    switch (category) {
        case "Fruits":
        case "Obst":
            return require("@/assets/images/fridge_icons/fruits.png");
        case "Vegetables":
        case "Gemüse":
            return require("@/assets/images/fridge_icons/vegetables.png");
        case "Dairy":
        case "Milchprodukte":
            return require("@/assets/images/fridge_icons/dairy.png");
        case "Drinks":
        case "Getränke":
            return require("@/assets/images/fridge_icons/drinks.png");
        case "Meat & Fish":
        case "Fleisch/Fisch":
        case "Fleisch":
            return require("@/assets/images/fridge_icons/meat-fish.png");
        case "Frozen":
        case "Tiefkühlkost":
            return require("@/assets/images/fridge_icons/freezer.png");
        case "Other":
        case "Sonstige":
        default:
            return require("@/assets/images/placeholder_icon.png");
    }
};

const categoryFilters: Record<string, (item: KuehlschrankItem) => boolean> = {
    "Fruits": (item) => item.kategorie === "Fruits" || (item.kategorie as any) === "Obst",
    "Vegetables": (item) => item.kategorie === "Vegetables" || (item.kategorie as any) === "Gemüse",
    "Dairy": (item) => item.kategorie === "Dairy" || (item.kategorie as any) === "Milchprodukte",
    "Drinks": (item) => item.kategorie === "Drinks" || (item.kategorie as any) === "Getränke",
    "Meat & Fish": (item) => item.kategorie === "Meat & Fish" || (item.kategorie as any) === "Fleisch/Fisch" || (item.kategorie as any) === "Fleisch",
    "Frozen": (item) => item.kategorie === "Frozen" || (item.kategorie as any) === "Tiefkühlkost",
    "Other": (item) => item.kategorie === "Other" || (item.kategorie as any) === "Sonstige" || !item.kategorie,
};

export default function FridgeCategory() {
    const router = useRouter();
    const { category, search } = useLocalSearchParams();
    const [items, setItems] = useState<KuehlschrankItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState((search as string) || "");
    const {
        handleQuantityChange,
        isUpdating,
        editingItemId,
        editingQuantity,
        setEditingQuantity,
        startEditing,
        submitEditing,
    } = useQuantityManager();

    const categoryName = typeof category === "string" ? category : "Other";

    const fetchItems = useCallback(async () => {
        setLoading(true);
        try {
            const allItems = await getKuehlschrankInhalt();
            const filterFunction = categoryFilters[categoryName] || categoryFilters["Other"];
            const categoryItems = allItems.documents.filter(filterFunction);
            setItems(categoryItems);
        } catch (error) {
            console.error(`Error fetching ${categoryName} items:`, error);
        } finally {
            setLoading(false);
        }
    }, [categoryName]);

    useFocusEffect(
        useCallback(() => {
            fetchItems();
        }, [fetchItems])
    );

    const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const onQuantityChange = (item: KuehlschrankItem, change: number) => {
        handleQuantityChange(item, change, setItems, items);
    };

    const getStatusIcon = (mhd?: string) => {
        if (!mhd) return require("@/assets/images/fridge_icons/eatable.png");
        const today = new Date();
        const expDate = new Date(mhd);
        const diffTime = expDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) {
            return require("@/assets/images/fridge_icons/expired.png");
        } else if (diffDays <= 2) {
            return require("@/assets/images/fridge_icons/warning.png");
        } else {
            return require("@/assets/images/fridge_icons/eatable.png");
        }
    };

    const getDaysLeft = (mhd?: string) => {
        if (!mhd) return { days: 0, label: "No expiration date" };
        const today = new Date();
        const expDate = new Date(mhd);
        const diffTime = expDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) {
            return { days: Math.abs(diffDays), label: diffDays === -1 ? "day over" : "days over" };
        } else {
            return { days: diffDays, label: diffDays === 1 ? "day left" : "days left" };
        }
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#8B5CF6" />
                    <Text style={styles.loadingText}>{`Loading ${categoryName}...`}</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
            >
                <View style={styles.fridgeSection}>
                    <View style={ContainerStyles.titleSection}>
                        <Text style={fontStyles.title}>{categoryName}</Text>
                    </View>

                    <View style={styles.searchContainer}>
                        <TextInput
                            placeholder={`Find in ${categoryName}...`}
                            placeholderTextColor="#9ca3af"
                            style={styles.searchInput}
                            value={searchTerm}
                            onChangeText={setSearchTerm}
                        />
                    </View>

                    {filteredItems.length === 0 ? (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>{"No items found."}</Text>
                        </View>
                    ) : (
                        filteredItems.map((item) => (
                            <View key={item.$id} style={styles.itemContainer}>
                                <Image source={getStatusIcon(item.mhd)} style={styles.statusIcon} />
                                <Image
                                    source={getCategoryIcon(item.kategorie)}
                                    style={styles.itemIcon}
                                />
                                <View style={styles.itemDetails}>
                                    <Text style={styles.itemName}>{item.name}</Text>
                                    <Text style={styles.itemDate}>
                                        {item.mhd
                                            ? new Date(item.mhd).toLocaleDateString()
                                            : "No date"}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.daysLeft,
                                            {
                                                color:
                                                    getDaysLeft(item.mhd).label.includes("over") ||
                                                    (getDaysLeft(item.mhd).days <= 2 &&
                                                        getDaysLeft(item.mhd).label.includes("left"))
                                                        ? "#ef4444"
                                                        : "#22c55e",
                                            },
                                        ]}
                                    >
                                        {getDaysLeft(item.mhd).days} {getDaysLeft(item.mhd).label}
                                    </Text>
                                </View>
                                <View style={styles.quantityContainer}>
                                    <TouchableOpacity
                                        onPress={() => onQuantityChange(item, -1)}
                                        style={styles.quantityButton}
                                        disabled={isUpdating}
                                    >
                                        <Text style={styles.quantityButtonText}>{"-"}</Text>
                                    </TouchableOpacity>
                                    {editingItemId === item.$id ? (
                                        <TextInput
                                            style={styles.quantityInput}
                                            value={editingQuantity}
                                            onChangeText={setEditingQuantity}
                                            keyboardType="numeric"
                                            autoFocus
                                            onBlur={() => submitEditing(item, setItems, items)}
                                            returnKeyType="done"
                                            onSubmitEditing={() => submitEditing(item, setItems, items)}
                                        />
                                    ) : (
                                        <TouchableOpacity onPress={() => startEditing(item)} style={styles.quantityDisplay}>
                                            <Text style={styles.quantityText}>{item.anzahl}</Text>
                                        </TouchableOpacity>
                                    )}
                                    <TouchableOpacity
                                        onPress={() => onQuantityChange(item, 1)}
                                        style={styles.quantityButton}
                                        disabled={isUpdating}
                                    >
                                        <Text style={styles.quantityButtonText}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))
                    )}
                </View>

                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => router.push({ pathname: "/(tabs)/fridge/fridge_add", params: { category: categoryName } })}
                >
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

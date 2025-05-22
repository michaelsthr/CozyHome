import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const fridgeItems = [
    {
        id: 1,
        name: "Milk",
        img: require("../../../assets/images/placeholder_icon.png"),
        statusIcon: require("../../../assets/images/placeholder_icon.png"),
        days: 1,
        label: "Day left",
    },
    {
        id: 2,
        name: "Bananas",
        img: require("../../../assets/images/placeholder_icon.png"),
        statusIcon: require("../../../assets/images/placeholder_icon.png"),
        days: 2,
        label: "Days left",
    },
    {
        id: 3,
        name: "Apple",
        img: require("../../../assets/images/placeholder_icon.png"),
        statusIcon: require("../../../assets/images/placeholder_icon.png"),
        days: 3,
        label: "Days left",
    },
    // ...more items
];

export default function Fridge() {
  const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Image
                    source={require("../../../assets/images/placeholder_icon.png")}
                    style={styles.avatar}
                />
                <Image
                    source={require("../../../assets/images/placeholder_icon.png")}
                    style={styles.logo}
                />
            </View>

            {/* Greeting */}
            <Text style={styles.greeting}>Hey!</Text>
            <Text style={styles.username}>Max Mustermann</Text>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <TextInput
                    placeholder="Search"
                    placeholderTextColor="#999"
                    style={styles.searchInput}
                />
            </View>

            {/* Fridge Title */}
            <Text style={styles.title}>FRIDGE</Text>
            <Text style={styles.subtitle}>Found {fridgeItems.length} new items</Text>

            {/* Items Carousel */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.itemsList}
            >
                {fridgeItems.map((item) => (
                    <View key={item.id} style={styles.itemCard}>
                        <Image source={item.img} style={styles.itemImage} />
                        <View style={styles.statusRow}>
                            <Image
                                source={item.statusIcon}
                                style={styles.statusIcon}
                            />
                            <Text style={styles.statusText}>
                                {item.days} {item.label}
                            </Text>
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* Check Fridge Button */}
            <TouchableOpacity
                style={styles.checkButton}
                onPress={() => router.push("/fridge/fridge_items")}
            >
                <Text style={styles.checkButtonText}>CHECK FRIDGE</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: "#fff",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    logo: {
        width: 50,
        height: 50,
        resizeMode: "contain",
    },
    greeting: {
        fontSize: 24,
        fontWeight: "600",
        marginTop: 20,
    },
    username: {
        fontSize: 32,
        fontWeight: "700",
    },
    searchContainer: {
        marginTop: 15,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
    },
    searchInput: {
        paddingHorizontal: 15,
        height: 40,
        fontSize: 16,
    },
    title: {
        marginTop: 25,
        fontSize: 18,
        fontWeight: "700",
    },
    subtitle: {
        color: "#666",
        marginBottom: 15,
    },
    itemsList: {
        paddingVertical: 10,
    },
    itemCard: {
        width: 100,
        marginRight: 15,
        alignItems: "center",
    },
    itemImage: {
        width: 80,
        height: 80,
        resizeMode: "contain",
    },
    statusRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
    },
    statusIcon: {
        width: 16,
        height: 16,
        marginRight: 4,
    },
    statusText: {
        fontSize: 14,
        color: "#333",
    },
    checkButton: {
        marginTop: 30,
        backgroundColor: "#000",
        borderRadius: 25,
        paddingVertical: 14,
        alignItems: "center",
    },
    checkButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});

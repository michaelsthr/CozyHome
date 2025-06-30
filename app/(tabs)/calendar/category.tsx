import { Link, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Models } from "react-native-appwrite";
import { getCategory } from "../../../lib/appwrite/dbKalender";

const Category = () => {
    const [categories, setCategories] = useState<Models.Document[]>([]);

    const fetchCategories = async () => {
        try {
            const response = await getCategory();
            setCategories(response.documents);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchCategories();
        }, [])
    );

    const renderItem = ({ item }: { item: Models.Document }) => (
        <Link
            href={{
                pathname: "/(tabs)/calendar/add_category",
                params: { id: item.$id, name: item.name, color: item.color },
            }}
            asChild>
            <Pressable style={styles.itemContainer}>
                <View style={[styles.colorBox, { backgroundColor: item.color }]} />
                <Text style={styles.itemText}>{item.name}</Text>
            </Pressable>
        </Link>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignContent: "center",
                    marginRight: 30,
                }}>
                <Text style={styles.title}>Categories</Text>
                <Link href='/(tabs)/calendar/add_category' push asChild>
                    <Pressable
                        style={{
                            alignSelf: "center",
                        }}>
                        <Image
                            source={require("../../../assets/symbol-plus.png")}
                            style={{ width: 17, height: 17 }}
                        />
                    </Pressable>
                </Link>
            </View>
            <FlatList data={categories} renderItem={renderItem} keyExtractor={(item) => item.$id} />
        </SafeAreaView>
    );
};

export default Category;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        margin: 20,
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    colorBox: {
        width: 20,
        height: 20,
        marginRight: 15,
        borderRadius: 4,
    },
    itemText: {
        fontSize: 18,
    },
});

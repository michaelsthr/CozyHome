import CategoryItem from "@/components/calendar/category_item";
import { getAllCategory } from "@/lib/appwrite/dbKalender";
import { cardStyles } from "@/styles/card_styles";
import { ContainerStyles } from "@/styles/container_styles";
import { fontStyles } from "@/styles/font_styles";
import { iconStyles } from "@/styles/icon_styles";
import { Link, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { FlatList, Image, Pressable, SafeAreaView, Text, View } from "react-native";
import { Models } from "react-native-appwrite";

const CategoryView = () => {
    const [categories, setCategories] = useState<Models.Document[]>([]);

    const fetchCategories = async () => {
        try {
            const response = await getAllCategory();
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

    return (
        <SafeAreaView style={ContainerStyles.ModalContainer}>
            <View style={ContainerStyles.titleSection}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                    <Text style={fontStyles.title}>Categories</Text>
                    <Link href='/(tabs)/calendar/category_form' push asChild>
                        <Pressable>
                            <Image
                                source={require("@/assets/images/symbol-plus.png")}
                                style={iconStyles.icon2}
                            />
                        </Pressable>
                    </Link>
                </View>
            </View>
            <FlatList
                data={categories}
                renderItem={({ item }) => <CategoryItem item={item} />}
                keyExtractor={(item) => item.$id}
                style={[cardStyles.BasicCard, {width: "100%"}]}
            />
            <Text
                style={[
                    fontStyles.subtitle,
                    { textAlign: "left", marginVertical: 30, marginBottom: 50},
                ]}>
                Categories help you organize and color-code your calendar events. Click the '+' icon to create one :)
            </Text>
        </SafeAreaView>
    );
};

export default CategoryView;

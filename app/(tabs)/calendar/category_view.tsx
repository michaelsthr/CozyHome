import CategoryItem from "@/components/calendar/category_item";
import { fontStyles } from "@/styles/font_styles";
import { iconStyles } from "@/styles/icon_styles";
import { Link, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { FlatList, Image, Pressable, SafeAreaView, Text, View } from "react-native";
import { Models } from "react-native-appwrite";
import { getCategory } from "../../../lib/appwrite/dbKalender";
import { ContainerStyles } from "@/styles/container_styles";

const CategoryView = () => {
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

    return (
        <SafeAreaView style={ContainerStyles.ModalContainer}>
            <View style={{flexDirection: "row", justifyContent: "center", alignContent: "center"}}>
                <Text style={fontStyles.h1}>Categories</Text>
                <Link href='/(tabs)/calendar/category_form' push asChild>
                    <Pressable>
                        <Image
                            source={require("@/assets/images/symbol-plus.png")}
                            style={iconStyles.icon1}
                        />
                    </Pressable>
                </Link>
            </View>
            <FlatList
                data={categories}
                renderItem={({ item }) => <CategoryItem item={item} />}
                keyExtractor={(item) => item.$id}
            />
        </SafeAreaView>
    );
};

export default CategoryView;

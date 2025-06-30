import { ContainerStyles } from "@/styles/container_styles";
import { fontStyles } from "@/styles/font_styles";
import { swatchStyles } from "@/styles/swatch_styles";
import { Link } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { Models } from "react-native-appwrite";

const CategoryItem = ({ item }: { item: Models.Document }) => {
    return (
        <>
            <Link
                href={{
                    pathname: "/(tabs)/calendar/category_form",
                    params: { id: item.$id, name: item.name, color: item.color },
                }}
                asChild>
                <Pressable style={ContainerStyles.categoryContainer}>
                    <View
                        style={[swatchStyles.categegorySwatch, { backgroundColor: item.color }]}
                    />
                    <Text style={fontStyles.large}>{item.name}</Text>
                </Pressable>
            </Link>
        </>
    );
};

export default CategoryItem;

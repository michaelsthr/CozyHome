import ColorPicker from "@/components/calendar/color_picker";
import DeleteEventModal from "@/components/calendar/delete_event_modal";
import { createNewCategory, deleteCategory, updateCategory } from "@/lib/appwrite/dbKalender";
import { Category } from "@/lib/types/calendar";
import { ContainerStyles } from "@/styles/container_styles";
import { inputStyles } from "@/styles/input_styles";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useState } from "react";
import { Button, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const COLORS = [
    "tomato",
    "skyblue",
    "gold",
    "lightgreen",
    "coral",
    "plum",
    "lightpink",
    "lightgray",
];

const CategoryForm = () => {
    const navigation = useNavigation();
    const params = useLocalSearchParams();
    const isEdit = !!params.id;

    // Helper function to safely extract string parameter
    const getStringParam = (param: string | string[] | undefined, defaultValue = ""): string => {
        if (typeof param === "string") return param;
        if (Array.isArray(param)) return param[0] || defaultValue;
        return defaultValue;
    };

    const [name, setName] = useState(getStringParam(params.name));
    const [selectedColor, setSelectedColor] = useState(getStringParam(params.color, "tomato"));
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleAddOrUpdateCategory = async () => {
        if (name === "") {
            alert("Please enter a name for the category.");
            return null;
        }
        try {
            if (isEdit) {
                await updateCategory(params.id as string, { name, color: selectedColor });
                console.log("Category updated");
            } else {
                await createNewCategory({ name, color: selectedColor } as Category);
                console.log("Category created");
            }
            navigation.goBack();
        } catch (error) {
            console.error("Error saving category:", error);
        }
    };

    const handleDeleteCategory = async () => {
        try {
            if (isEdit) {
                await deleteCategory(params.id as string);
                navigation.goBack();
            }
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    return (
        <SafeAreaView style={ContainerStyles.ModalContainer}>
            <TextInput
                placeholder='Titel'
                placeholderTextColor={"grey"}
                onChangeText={(text) => setName(text)}
                value={name}
                style={inputStyles.input}
            />
            <View>
                <ColorPicker
                    colors={COLORS}
                    selectedColor={selectedColor}
                    onSelectColor={setSelectedColor}
                />
                <View style={[{ backgroundColor: selectedColor }]} />
            </View>
            <View>
                <Button
                    title={isEdit ? "Update Category" : "Add Category"}
                    onPress={handleAddOrUpdateCategory}
                />
                {isEdit && (
                    <Button
                        title='Delete Category'
                        color='red'
                        onPress={() => setShowDeleteModal(true)}
                    />
                )}
            </View>
            <DeleteEventModal
                visible={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onDelete={handleDeleteCategory}
            />
        </SafeAreaView>
    );
};

export default CategoryForm;

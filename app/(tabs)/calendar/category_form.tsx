import ColorPicker from "@/components/calendar/color_picker";
import DeleteEventModal from "@/components/calendar/delete_event_modal";
import {
    Category,
    createNewCategory,
    deleteCategory,
    updateCategory,
} from "@/lib/appwrite/dbKalender";
import { ContainerStyles } from "@/styles/container_styles";
import { inputStyles } from "@/styles/input_styles";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useState } from "react";
import { Button, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CategoryForm = () => {
    const navigation = useNavigation();
    const params = useLocalSearchParams();
    const isEdit = !!params.id;
    const colors = [
        "tomato",
        "skyblue",
        "gold",
        "lightgreen",
        "coral",
        "plum",
        "lightpink",
        "lightgray",
    ];

    const [name, setName] = useState(
        typeof params.name === "string" ? params.name
        : Array.isArray(params.name) ? params.name[0]
        : ""
    );
    const [selectedColor, setSelectedColor] = useState(
        typeof params.color === "string" ? params.color
        : Array.isArray(params.color) ? params.color[0]
        : "tomato"
    );
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleAddOrUpdateCategory = async () => {
        if (isEdit) {
            await updateCategory(params.id as string, { name, color: selectedColor });
            console.log("Category updated");
            navigation.goBack();
        } else {
            const newCat = await createNewCategory({ name, color: selectedColor } as Category);
            console.log("Category created");
            if(newCat !== null) {
                navigation.goBack();
            }
        }
    };

    const handleDeleteCategory = async () => {
        if (isEdit) {
            await deleteCategory(params.id as string);
            navigation.goBack();
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
                    colors={colors}
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

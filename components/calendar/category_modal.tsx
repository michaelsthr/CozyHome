import { ContainerStyles } from "@/styles/container_styles";
import { fontStyles } from "@/styles/font_styles";
import { modalStyles } from "@/styles/modal_styles";
import { swatchStyles } from "@/styles/swatch_styles";
import React from "react";
import { Button, FlatList, Modal, Pressable, Text, View } from "react-native";
import { Models } from "react-native-appwrite";

interface CategoryModalProps {
    visible: boolean;
    categories: Models.Document[];
    onClose: () => void;
    onSelectCategory: (category: any) => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
    visible,
    categories,
    onClose,
    onSelectCategory,
}) => {
    return (
        <Modal visible={visible} animationType='fade' transparent={true} onRequestClose={onClose}>
            <View style={modalStyles.modalBackdrop}>
                <View style={modalStyles.modalContainer}>
                    <Text style={modalStyles.modalTitle}>Choose category</Text>
                    <FlatList
                        data={categories}
                        keyExtractor={(item) => item.$id}
                        renderItem={({ item }) => (
                            <Pressable
                                style={ContainerStyles.categoryContainer}
                                onPress={() => {
                                    onSelectCategory(item);
                                }}>
                                <View
                                    style={[
                                        swatchStyles.categegorySwatch,
                                        {
                                            backgroundColor: item.color,
                                        },
                                    ]}
                                />
                                <Text style={fontStyles.large}>{item.name}</Text>
                            </Pressable>
                        )}
                    />
                    <Button title='Cancel' onPress={onClose} />
                </View>
            </View>
        </Modal>
    );
};

export default CategoryModal;

import {
    Category,
    createNewCategory,
    deleteCategory,
    updateCategory,
} from "@/lib/appwrite/dbKalender";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useState } from "react";
import {
    Button,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AddCategory = () => {
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
        typeof params.name === 'string' ? params.name : Array.isArray(params.name) ? params.name[0] : ""
    );
    const [selectedColor, setSelectedColor] = useState(
        typeof params.color === 'string' ? params.color : Array.isArray(params.color) ? params.color[0] : "tomato"
    );

    const handleAddOrUpdateCategory = async () => {
        if (isEdit) {
            await updateCategory(params.id as string, { name, color: selectedColor });
            console.log("Category updated");
        } else {
            await createNewCategory({ name, color: selectedColor } as Category);
            console.log("Category created");
        }
        navigation.goBack();
    };

    const handleDeleteCategory = async () => {
        if (isEdit) {
            await deleteCategory(params.id as string);
            navigation.goBack();
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                style={{
                    fontSize: 25,
                    fontWeight: "bold",
                    textAlign: "left",
                    width: "100%",
                }}
                placeholder='Titel'
                placeholderTextColor={"grey"}
                onChangeText={(text) => setName(text)}
                value={name}
            />
            <View
                style={{
                    borderBottomColor: "grey",
                    borderBottomWidth: 1,
                    width: "100%",
                    marginVertical: 10,
                }}
            />
            <View
                style={{
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: 30,
                    width: "100%",
                }}>
                <Text>Color</Text>
                <FlatList
                    data={colors}
                    numColumns={4}
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={false}
                    contentContainerStyle={{ padding: 10 }}
                    keyExtractor={(item: string) => item}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[
                                {
                                    backgroundColor: item,
                                    width: 40,
                                    height: 40,
                                    margin: 10,
                                    borderRadius: 10,
                                    borderWidth: 2,
                                    borderColor: "transparent",
                                },
                                selectedColor === item && styles.selectedColor,
                            ]}
                            onPress={() => setSelectedColor(item)}
                        />
                    )}
                />
            </View>
            <Button
                title={isEdit ? "Save category" : "Add Category"}
                onPress={handleAddOrUpdateCategory}
            />
            {isEdit && (
                <Button title='Delete category' color='red' onPress={handleDeleteCategory} />
            )}
        </SafeAreaView>
    );
};

export default AddCategory;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        marginHorizontal: 30,
        paddingTop: 30,
    },
    colorCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
        borderWidth: 2,
        borderColor: "transparent",
    },
    selectedColor: {
        borderColor: "black",
    },
});

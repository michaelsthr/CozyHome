import { swatchStyles } from "@/styles/swatch_styles";
import React from "react";
import { FlatList, TouchableOpacity } from "react-native";

interface ColorPickerProps {
    colors: string[];
    selectedColor: string;
    onSelectColor: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ colors, selectedColor, onSelectColor }) => {
    return (
        <FlatList
            contentContainerStyle={{ alignItems: "center" }}
            data={colors}
            renderItem={({ item }) => (
                <TouchableOpacity
                    style={[
                        swatchStyles.colorSwatch,
                        {
                            backgroundColor: item,
                            borderColor: selectedColor === item ? "black" : "transparent",
                        },
                    ]}
                    onPress={() => onSelectColor(item)}
                />
            )}
            keyExtractor={(item) => item}
            numColumns={4}
        />
    );
};

export default ColorPicker;

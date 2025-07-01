import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

const BackButton = () => {
    return (
        <TouchableOpacity onPress={() => router.back()}>
            <Text style={{ color: "blue", marginLeft: 10 }}>Back</Text>
        </TouchableOpacity>
    );
};

export default BackButton;

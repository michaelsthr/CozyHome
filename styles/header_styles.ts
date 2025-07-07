import { Image, Pressable, StyleSheet, Text, View } from "react-native";


export const headerStyles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 10,
        alignItems: "center",
        width: "100%",
    },
    leftContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    rightContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 30,
    },
});

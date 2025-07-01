import { StyleSheet } from "react-native";

export const inputStyles = StyleSheet.create({
    searchInput: {
        height: 50,
        fontSize: 16,
        color: "#374151",
      },
      quantityInput: {
        fontSize: 12,
        fontWeight: "700",
        color: "#475569",
        textAlign: "center",
        borderWidth: 1,
        borderColor: "#059669",
        backgroundColor: "#ffffff",
      },
    input: {
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "left",
        width: "100%",
        borderBottomColor: "grey",
        borderBottomWidth: 1,
        marginVertical: 10,
    },
    descriptionInput: {
        borderRadius: 10,
        borderColor: "black",
        borderWidth: 1,
        color: "black",
        fontSize: 17,
        marginVertical: 10,
        padding: 10,
        alignItems: "center",
    },
});

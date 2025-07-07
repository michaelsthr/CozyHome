import { StyleSheet } from "react-native";

export const modalStyles = StyleSheet.create({
    bottomSheetContainer: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.2)",
    },
    bottomSheetContent: {
        backgroundColor: "white",
        padding: 24,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        marginBottom: 0,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    modalBackdrop: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.2)",
        justifyContent: "center",
    },
    modalContainer: {
        backgroundColor: "white",
        margin: 30,
        borderRadius: 12,
        padding: 20,
        maxHeight: 400,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
});

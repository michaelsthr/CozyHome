import { StyleSheet } from "react-native";

export const ContainerStyles = StyleSheet.create({
    categoryContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    ModalContainer: {
        alignContent: "center",
        flexGrow: 1,
        justifyContent: "center",
        marginHorizontal: 30,
        marginVertical: 30,
    },
    timePickerContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        marginVertical: 20,
        alignContent: "center",
    },
    categoryPicker: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        borderWidth: 1,
        borderColor: "#eee",
        borderRadius: 8,
        marginBottom: 10,
    },
    categoryPickerText: {
        fontSize: 16,
        marginRight: 8,
    },
    categoryPickerValueContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: "auto",
    },
    categoryPickerValueText: {
        fontSize: 16,
    },
    categoryPickerPlaceholder: {
        color: "#888",
        marginLeft: "auto",
    },
});

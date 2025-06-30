import { StyleSheet } from "react-native";

export const ContainerStyles = StyleSheet.create({
    categoryContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    eventFormContainer: {
        alignContent: "center",
        height: "30%",
        flexGrow: 1,
        justifyContent: "center",
        marginHorizontal: 30,
    },
    timePickerContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        marginVertical: 20,
        alignContent: "center",
    },
    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
        justifyContent: "space-between",
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

import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    separator: {
        borderBottomColor: "grey",
        borderBottomWidth: 1,
        width: "100%",
        marginVertical: 10,
    },
    timePickerArrow: {
        alignSelf: "center",
        marginHorizontal: 20,
    },
    categoryPickerColorSwatch: {
        width: 20,
        height: 20,
        marginRight: 10,
        borderRadius: 4,
    },
    logo: {
        width: 55,
        height: 55,
        resizeMode: "contain",
      },
      itemImage: {
        width: 60,
        height: 60,
        resizeMode: "contain",
        marginBottom: 10,
      },
      statusIcon: {
        width: 16,
        height: 16,
        marginRight: 4,
      },
      emptyIcon: {
        width: 80,
        height: 80,
        marginBottom: 15,
        opacity: 0.5,
      },
      loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 40,
      },
})

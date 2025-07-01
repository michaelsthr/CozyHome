import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    logo: {
        width: 55,
        height: 55,
        resizeMode: "contain",
      },
      fridgeIcon: {
        width: 28,
        height: 28,
        marginRight: 10,
        tintColor: "#059669",
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
      itemsContainer_itemImage: {
        width: 70,
        height: 70,
        resizeMode: "contain",
        marginBottom: 12,
      },
      category_itemImage: {
        width: 55,
        height: 55,
        resizeMode: "contain",
        marginRight: 15,
      },
      category_statusIcon: {
        width: 20,
        height: 20,
        marginRight: 6,
      },
      separator: {
        height: 1,
        backgroundColor: "#e2e8f0",
        marginVertical: 8,
      },
      loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 40,
      },
})
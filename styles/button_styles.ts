import { StyleSheet } from "react-native";

export const buttonStyles = StyleSheet.create({
    homeQuantityButton: {
        backgroundColor: "#059669",
        borderRadius: 6,
        width: 24,
        height: 24,
        alignItems: "center",
        justifyContent: "center",
      },
      homeQuantityButtonText: {
        color: "#ffffff",
        fontSize: 14,
        fontWeight: "700",
      },
      addButton: {
        marginHorizontal: 20,
        marginBottom: 30,
        backgroundColor: "#059669",
        borderRadius: 16,
        paddingVertical: 18,
        alignItems: "center",
        shadowColor: "#059669",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
      },
      addButtonText: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: "700",
        letterSpacing: 0.5,
      },
      quantityButton: {
        backgroundColor: "#059669",
        borderRadius: 8,
        width: 32,
        height: 32,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#059669",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
      },
      quantityButtonDisabled: {
        backgroundColor: "#94a3b8",
        shadowColor: "#94a3b8",
      },
      quantityButtonText: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: "700",
      },
})
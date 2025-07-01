import { StyleSheet } from "react-native";

export const cardStyles = StyleSheet.create({  
  Card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    width: "90%",
    marginBottom: 15,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4.65,
    elevation: 6,
  },

  BasicCard: {
      backgroundColor: "#ffffff",
      borderRadius: 12,
      paddingHorizontal: 15,
      paddingVertical: 12,
      borderWidth: 1,
      borderColor: "#e2e8f0",
      marginVertical: 10
  }
});
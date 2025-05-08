import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function fridge() {
  return (
    <View style={styles.container}>
      <Text>fridge</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});

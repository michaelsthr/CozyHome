import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function calendar() {
  return (
    <View style={styles.container}>
      <Text>calendar</Text>
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

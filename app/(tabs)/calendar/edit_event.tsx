import { useNavigation } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

const EditEvent = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
    </View>
  );
};

export default EditEvent;

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    height: "80%",
    flexGrow: 1,
    justifyContent: "center",
    marginHorizontal: 30,
  }
});

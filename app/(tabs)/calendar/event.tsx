import CozyInput from "@/components/cozy_input";
import { useNavigation } from "expo-router";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const Event = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, fontWeight: "bold", textAlign: "center", marginBottom: 20 }}>Event</Text>
    </View>
  );
};

export default Event;

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    height: "80%",
    flexGrow: 1,
    justifyContent: "center",
    marginHorizontal: 30,
  },


});

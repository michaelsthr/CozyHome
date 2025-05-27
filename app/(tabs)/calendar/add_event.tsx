import CozyInput from "@/components/cozy_input";
import { useNavigation } from "expo-router";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { getKalender } from "../../../lib/appwrite/dbKalender"; //für db

const AddEvent = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 20,
        }}>
        Add new Event
      </Text>
      {/* <Button onPress={() => navigation.goBack()} title='Dismiss' /> */}
      <CozyInput placeholder='Name' placeholderTextColor={"black"} />
      <CozyInput placeholder='Creator' placeholderTextColor={"black"} />
      <CozyInput placeholder='Color' placeholderTextColor={"black"} />
      <CozyInput placeholder='Date' placeholderTextColor={"black"} />
      <CozyInput placeholder='Description' placeholderTextColor={"black"} />
      <Button
        title='Create'
         onPress={async () => {
         const inhalt = await getKalender();
         console.log("Kalenderinhalt: ", inhalt);
        }}
      />
    </View>
  );
};

export default AddEvent;

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    height: "80%",
    flexGrow: 1,
    justifyContent: "center",
    marginHorizontal: 30,
  },

  button: {
    borderRadius: 10,
  },
});

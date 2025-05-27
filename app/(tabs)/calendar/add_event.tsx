import CozyInput from "@/components/cozy_input";
import { useNavigation } from "expo-router";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { getCalender, getCategory, createNewEvent, createNewCategory, deleteEvent} from "../../../lib/appwrite/dbKalender";
import {placeholder} from "@babel/types"; //für db

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
      <CozyInput placeholder='Startdate' placeholderTextColor={"black"} />
      <CozyInput placeholder='Enddate' placeholderTextColor={"black"} />
      <CozyInput placeholder='Description' placeholderTextColor={"black"} />
      <Button
        title='Create'
         onPress={async () => {
          await deleteEvent("6835adee000616f6a65a");
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

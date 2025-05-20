import Timetable from "@/components/timetable";
import React from "react";
import { StyleSheet, Text, ScrollView } from "react-native";

export default function calendar() {
  return (
    <ScrollView style={styles.container}>
      <Timetable />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

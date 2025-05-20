import Timetable from "@/components/timetable";
import React from "react";
import { StyleSheet, Text, ScrollView } from "react-native";

export default function calendar() {
  return (
      <Timetable />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

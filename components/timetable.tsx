import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

// Hours from 0:00 to 23:00
const HOURS = Array.from({ length: 24 }, (_, i) => `${i}:00`);
const CELL_HEIGHT = 30;
const CELL_WIDTH = 40;

console.log(HOURS);

function SideTimes() {
  return (
    <>
      {HOURS.map((hour, index) => (
        <View style={styles.timecell} key={index}>
          <Text style={{color: "gray"}}>{hour}</Text>
        </View>
      ))}
    </>
  );
}

export default function Timetable() {
  return (
      <View >
        <SideTimes />
      </View>
  );
}

const styles = StyleSheet.create({
  timecell: {
    height: CELL_HEIGHT,
    width: CELL_WIDTH,
    borderBottomWidth: 1,
    color: "gray",
    borderColor: "gray",
    alignItems: "center",
    justifyContent: "center",
  },
});

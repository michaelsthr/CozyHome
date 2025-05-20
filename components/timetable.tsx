import React from "react";
import { StyleSheet, Text, View } from "react-native";

// Hours from 0:00 to 23:00
const HOURS = Array.from({ length: 24 }, (_, i) => `${i}:00`);
const CELL_HEIGHT = 30;
const CELL_WIDTH = 40;

const WEEKDAYS = ["MO", "DI", "MI", "DO", "FR", "SA", "SO"];
const DAY_WIDTH = 50;

console.log(HOURS);

function HeaderRow() {
  return (
    <View style={styles.headerRow}>
      <View style={{ width: CELL_WIDTH }} />
      {WEEKDAYS.map((day, index) => (
        <Text style={styles.weekday} key={index}>
          {day}
        </Text>
      ))}
    </View>
  );
}

function DayGrid() {
  return (
    <View style={styles.gridWrapper}>
      {HOURS.map((_, rowIndex) => (
        <View style={styles.row} key={rowIndex}>
          {WEEKDAYS.map((_, colIndex) => (
            <View style={styles.cell} key={colIndex} />
          ))}
        </View>
      ))}
    </View>
  );
}

function SideTimes() {
  return (
    <>
      {HOURS.map((hour, index) => (
        <View style={styles.timecell} key={index}>
          <Text style={styles.lightText}>{hour}</Text>
        </View>
      ))}
    </>
  );
}

export default function Timetable() {
  return (
    <View>
      <HeaderRow />
      <View style={{ flexDirection: "row" }}>
        <View>
          <SideTimes />
        </View>
        <DayGrid />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
  },
  timecell: {
    height: CELL_HEIGHT,
    width: CELL_WIDTH,
    color: "gray",
    alignItems: "center",
    justifyContent: "center",
  },
  gridWrapper: {},
  row: {
    flexDirection: "row",
  },
  cell: {
    width: DAY_WIDTH,
    height: CELL_HEIGHT,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: "#eee",
  },
  weekday: {
    width: DAY_WIDTH,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  lightText: {
    color: "gray",
  },
});

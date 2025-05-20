import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

// Hours from 0:00 to 23:00
const HOURS = Array.from({ length: 24 }, (_, i) => `${i}:00`);
const CELL_HEIGHT = 30;
const CELL_WIDTH = 40;

const WEEKDAYS = ["MO", "DI", "MI", "DO", "FR", "SA", "SO"];
const DAY_WIDTH = 50;

interface Event {
  name: string;
  dayIndex: number;
  startDate: string;
  endDate: string;
  repeat: boolean;
  creator: string;
  description: string;
  color: string;
}

export function EventBlock(event: Event) {

  const startDate = new Date(event.startDate)
  const endDate = new Date(event.endDate)

  const startHour = startDate.getHours()
  const endHour = endDate.getHours()

  const top = startHour * CELL_HEIGHT;
  const height = (endHour - startHour) * CELL_HEIGHT;
  const left = event.dayIndex * DAY_WIDTH;
  const width = DAY_WIDTH;

  return (
    <View
      style={[
        styles.eventBlock,
        {
          top: top,
          left: left,
          height: height,
          width: width,
          backgroundColor: event.color
        },
      ]}
    >
      <Text style={styles.eventText}>{event.name}</Text>
    </View>
  );
}

function HeaderRow() {
  return (
    <View style={styles.headerRow}>
      <View style={{ width: CELL_WIDTH }} />
      {WEEKDAYS.map((day, index) => (
        <View style={styles.headerCell} key={index}>
          <Text style={styles.weekday}>{day}</Text>
        </View>
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
      <ScrollView>
        <View style={{ flexDirection: "row" }}>
          <View>
            <SideTimes />
          </View>
          <View style={{ position: "relative" }}>
            <DayGrid />
            <EventBlock
              name="test"
              startDate="2025-05-20T13:48:10"
              endDate="2025-05-20T16:48:10"
              repeat={false}
              creator="Michi"
              description="it is cool"
              color="#4caf50"
              dayIndex={3}
            />
            <EventBlock
              name="Termin2"
              startDate="2025-05-20T4:48:10"
              endDate="2025-05-20T9:48:10"
              repeat={false}
              creator="Michi"
              description="it is cool"
              color="lightblue"
              dayIndex={1}
            />
          </View>
        </View>
      </ScrollView>
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
  headerCell: {
    height: CELL_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  eventBlock: {
    position: "absolute",
    opacity: 0.9,
    borderRadius: 4,
    padding: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  eventText: {
    color: "white",
    fontSize: 10,
  },
});

import { Link } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

// Hours from 0:00 to 23:00
const HOURS = Array.from({ length: 24 }, (_, i) => `${i}:00`);
const CELL_HEIGHT = 30;
const CELL_WIDTH = 40;

const WEEKDAYS = ["M", "D", "M", "D", "F", "S", "S"];
const DAY_WIDTH = 50;

const CURRENT_DAY = new Date().getDate();

interface Event {
  name: string;
  dayIndex: number;
  startDate: string;
  endDate: string;
  repeat: boolean;
  creator: string;
  description: string;
  color: string;
  borderColor: string;
}

export function EventBlock(event: Event) {
  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);

  const startHour = startDate.getHours();
  const endHour = endDate.getHours();

  const top = startHour * CELL_HEIGHT;
  const height = (endHour - startHour) * CELL_HEIGHT;
  const left = event.dayIndex * DAY_WIDTH;
  const width = DAY_WIDTH;

  return (
    <Link
      href='/(tabs)/calendar/event'
      push
      asChild
      style={[
        styles.eventBlock,
        {
          top: top,
          left: left,
          height: height,
          width: width,
          backgroundColor: event.color,
          borderColor: event.borderColor,
        },
      ]}>
      <Pressable>
        <View>
          <Text style={styles.eventText} numberOfLines={1} ellipsizeMode='tail'>
            {event.name}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}

function HeaderRow() {
  let date;

  function headerCell(day: string, day_date: number, index: number) {
    return (
      <View style={styles.headerCell} key={index}>
        <Text style={styles.weekday}>{day}</Text>
        <Text style={styles.weekday}>{day_date}</Text>
      </View>
    );
  }

  return (
    <View style={styles.headerRow}>
      <View style={{ width: CELL_WIDTH }} />
      {WEEKDAYS.map((day, index) =>
        headerCell(day, CURRENT_DAY - 10 + index, index)
      )}
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
    <View style={{ flex: 1 }}>
      <HeaderRow />
      <ScrollView style={{ flex: 1 }}>
        <View style={{ flexDirection: "row" }}>
          <View>
            <SideTimes />
          </View>
          <View style={{ position: "relative", flex: 1 }}>
            <DayGrid />
            <EventBlock
              name='G.Feier'
              startDate='2025-05-20T13:48:10'
              endDate='2025-05-20T16:48:10'
              repeat={false}
              creator='Michi'
              description='it is cool'
              color='#004e64'
              borderColor='#004e64'
              dayIndex={3}
            />
            <EventBlock
              name='BioMüll'
              startDate='2025-05-20T4:48:10'
              endDate='2025-05-20T9:48:10'
              repeat={false}
              creator='Michi'
              description='it is cool'
              color='#4d908e'
              borderColor='#4d908e'
              dayIndex={1}
            />
            <EventBlock
              name='Filmeabend'
              startDate='2025-05-20T0:48:10'
              endDate='2025-05-20T18:48:10'
              repeat={false}
              creator='Michi'
              description='it is cool'
              color='#edafb8'
              borderColor='#edafb8'
              dayIndex={5}
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
    marginVertical: 10,
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
    textAlign: "center",
    fontSize: 15,
  },
  lightText: {
    color: "gray",
    fontSize: 11,
  },
  headerCell: {
    height: 51,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: DAY_WIDTH - 16,
    marginHorizontal: 8,
    gap: 5,
  },

  eventBlock: {
    position: "absolute",
    opacity: 0.9,
    borderRadius: 15, // Squircle-like rounded corners
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    flex: 1,
    flexWrap: "wrap",
  },
  eventText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 10,
  },
});

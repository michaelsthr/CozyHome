import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import Event from "./event"


const CalendarLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false, contentStyle: { backgroundColor: "white" } }} />
      <Stack.Screen
        name='add_event'
        options={{
          headerShown: false,
          presentation: "formSheet",
        }}
      />
      <Stack.Screen
        name='event'
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name='edit_event'
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
    </Stack>
  );
};

export default CalendarLayout;

const styles = StyleSheet.create({});

import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const CalendarLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen
        name='add_event'
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name='event'
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

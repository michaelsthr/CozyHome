import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ animation: "shift" }}>
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen name="calendar" />
      <Tabs.Screen name="fridge" options={{ headerShown: false }} />
      <Tabs.Screen name="todo" />
    </Tabs>
  );
}

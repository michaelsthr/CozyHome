import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ animation: "shift" }}>
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen name="(calendar)/index" options={{ headerShown: false}} />
      <Tabs.Screen name="fridge" />
      <Tabs.Screen name="todo" />
    </Tabs>
  );
}

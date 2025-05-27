import { Tabs } from "expo-router";
import React from "react";
import { Image } from "react-native"

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ animation: "shift" }}>
      <Tabs.Screen name='index' options={{ href: null }} />
      <Tabs.Screen
        name='calendar'
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Image
              source={require("../../assets/calendar.png")}
              style={{
                width: 24,
                height: 24,
                marginRight: "auto",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          ),
        }}
      />
      <Tabs.Screen name='fridge' />
      <Tabs.Screen name='todo' />
    </Tabs>
  );
}

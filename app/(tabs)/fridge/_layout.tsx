import { Stack } from "expo-router";
import React from "react";

export default function FridgeStack() {
  return (
    <Stack>
      {/* this will render fridge_home.tsx on /fridge or /fridge/fridge_home */}
      <Stack.Screen 
        name="fridge_home" 
        options={{ headerTitle: "Home" }} 
      />

      {/* screen for the “Check Fridge” grid */}
      <Stack.Screen 
        name="fridge_items" 
        options={{ headerTitle: "Fridge" }} 
      />

      {/* screen for Fruits detail */}
      <Stack.Screen 
        name="fridge_fruits" 
        options={{ headerTitle: "Fruits" }} 
      />

      {/* screen for adding new item, no header shown */}
      <Stack.Screen 
        name="fridge_add" 
        options={{ headerTitle: "New Item" }} 
      />
    </Stack>
  );
}
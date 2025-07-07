import { Stack } from "expo-router";
import React from "react";

export default function FridgeStack() {
  return (
    <Stack >
      <Stack.Screen 
        name="fridge_home" 
        options={{ headerShown: false }} 
      />

      <Stack.Screen 
        name="fridge_items" 
        options={{ headerShown: false, presentation: "formSheet" }} 
      />

      <Stack.Screen 
        name="fridge_category" 
        options={{ headerShown: false, presentation: "formSheet" }} 
      />

      <Stack.Screen 
        name="fridge_add" 
        options={{ headerShown: false, presentation: "formSheet" }} 
      />
    </Stack>
  );
}

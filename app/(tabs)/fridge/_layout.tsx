import { Stack } from "expo-router";
import React from "react";
import BackButton from "../../../components/BackButton";

export default function FridgeStack() {
  return (
    <Stack >
      <Stack.Screen 
        name="fridge_home" 
        options={{ headerShown: false }} 
      />

      <Stack.Screen 
        name="fridge_items" 
        options={{ headerTitle: "Fridge", presentation: "formSheet" }} 
      />
      
      <Stack.Screen 
        name="fridge_fruits" 
        options={{ headerTitle: "Fruits", presentation: "formSheet" }} 
      />

      <Stack.Screen 
        name="fridge_vegetables" 
        options={{ headerTitle: "Vegetables", presentation: "formSheet" }} 
      />

      <Stack.Screen 
        name="fridge_dairy" 
        options={{ headerTitle: "Dairy", presentation: "formSheet" }} 
      />
      
      <Stack.Screen 
        name="fridge_meat" 
        options={{ headerTitle: "Meat & Fish", presentation: "formSheet" }} 
      />

      <Stack.Screen 
        name="fridge_drinks" 
        options={{ headerTitle: "Drinks", presentation: "formSheet" }} 
      />

      <Stack.Screen 
        name="fridge_frozen" 
        options={{ headerTitle: "Frozen Foods", presentation: "formSheet" }} 
      />

      <Stack.Screen 
        name="fridge_other" 
        options={{ headerTitle: "Other Items", presentation: "formSheet" }} 
      />

      <Stack.Screen 
        name="fridge_add" 
        options={{ headerTitle: "Add Item", presentation: "formSheet" }} 
      />
    </Stack>
  );
}

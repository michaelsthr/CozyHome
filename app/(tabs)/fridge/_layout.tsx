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
      />      {/* screen for Fruits detail */}
      <Stack.Screen 
        name="fridge_fruits" 
        options={{ headerTitle: "Fruits" }} 
      />

      {/* screen for Vegetables detail */}
      <Stack.Screen 
        name="fridge_vegetables" 
        options={{ headerTitle: "Vegetables" }} 
      />

      {/* screen for Dairy detail */}
      <Stack.Screen 
        name="fridge_dairy" 
        options={{ headerTitle: "Dairy" }} 
      />

      {/* screen for Meat detail */}
      <Stack.Screen 
        name="fridge_meat" 
        options={{ headerTitle: "Meat" }} 
      />

      {/* screen for Drinks detail */}
      <Stack.Screen 
        name="fridge_drinks" 
        options={{ headerTitle: "Drinks" }} 
      />

      {/* screen for Bread detail */}
      <Stack.Screen 
        name="fridge_bread" 
        options={{ headerTitle: "Bread" }} 
      />

      {/* screen for adding new item */}
      <Stack.Screen 
        name="fridge_add" 
        options={{ headerTitle: "Add Item" }} 
      />
    </Stack>
  );
}
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
        options={{ headerTitle: "Fridge", presentation: "formSheet" }} 
      />
      
      {/* screen for Fruits detail */}
      <Stack.Screen 
        name="fridge_fruits" 
        options={{ headerTitle: "Fruits", presentation: "formSheet" }} 
      />

      {/* screen for Vegetables detail */}
      <Stack.Screen 
        name="fridge_vegetables" 
        options={{ headerTitle: "Vegetables", presentation: "formSheet" }} 
      />

      {/* screen for Dairy detail */}
      <Stack.Screen 
        name="fridge_dairy" 
        options={{ headerTitle: "Dairy", presentation: "formSheet" }} 
      />
      
      {/* screen for Meat & Fish detail */}
      <Stack.Screen 
        name="fridge_meat" 
        options={{ headerTitle: "Meat & Fish", presentation: "formSheet" }} 
      />

      {/* screen for Drinks detail */}
      <Stack.Screen 
        name="fridge_drinks" 
        options={{ headerTitle: "Drinks", presentation: "formSheet" }} 
      />

      {/* screen for Frozen Foods detail */}
      <Stack.Screen 
        name="fridge_frozen" 
        options={{ headerTitle: "Frozen Foods", presentation: "formSheet" }} 
      />

      {/* screen for Other Items detail */}
      <Stack.Screen 
        name="fridge_other" 
        options={{ headerTitle: "Other Items", presentation: "formSheet" }} 
      />

      {/* screen for adding new item */}
      <Stack.Screen 
        name="fridge_add" 
        options={{ headerTitle: "Add Item", presentation: "formSheet" }} 
      />
    </Stack>
  );
}
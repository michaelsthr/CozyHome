import { Stack } from "expo-router/stack";

export default function () {
  return (
      <Stack>
        <Stack.Screen name="(auth)/index" options={{ headerShown: false }} />
      </Stack>
  );
}
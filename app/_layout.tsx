import { Stack } from "expo-router";
import React from "react";
import { UserProvider } from "../components/UserContext";

export default function RootLayout() {
    return (
        <UserProvider>
            <Stack>
                <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
            </Stack>
        </UserProvider>
    );
}

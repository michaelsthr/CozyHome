import { Stack } from "expo-router";
import React from "react";

const SCREEN_OPTIONS = {
    headerShown: false,
    presentation: "formSheet" as const,
};

const CalendarLayout = () => {
    return (
        <Stack>
            <Stack.Screen name='index' options={{ headerShown: false }} />
            <Stack.Screen name='category_view' options={SCREEN_OPTIONS} />
            <Stack.Screen name='category_form' options={SCREEN_OPTIONS} />
            <Stack.Screen name='event_view' options={SCREEN_OPTIONS} />
            <Stack.Screen name='event_form' options={SCREEN_OPTIONS} />
        </Stack>
    );
};

export default CalendarLayout;

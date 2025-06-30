import { Stack } from "expo-router";
import React from "react";

const CalendarLayout = () => {
    return (
        <Stack>
            <Stack.Screen
                name='index'
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name='category_view'
                options={{
                    headerShown: false,
                    presentation: "formSheet",
                }}
            />
            <Stack.Screen
                name='category_form'
                options={{
                    headerShown: false,
                    presentation: "formSheet",
                }}
            />

            <Stack.Screen
                name='event_view'
                options={{
                    headerShown: false,
                    presentation: "formSheet",
                }}
            />
            <Stack.Screen
                name='event_form'
                options={{
                    headerShown: false,
                    presentation: "formSheet",
                }}
            />
        </Stack>
    );
};

export default CalendarLayout;

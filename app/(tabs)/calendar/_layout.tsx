import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const CalendarLayout = () => {
    return (
        <Stack>
            <Stack.Screen
                name='index'
                options={{
                    headerShown: false,
                    contentStyle: { backgroundColor: "white" },
                }}
            />
            <Stack.Screen
                name='add_event'
                options={{
                    headerShown: false,
                    presentation: "formSheet",
                }}
            />
            <Stack.Screen
                name='category'
                options={{
                    headerShown: false,
                    presentation: "formSheet",
                }}
            />
            <Stack.Screen
                name='add_category'
                options={{
                    headerShown: false,
                    presentation: "formSheet",
                }}
            />
        </Stack>
    );
};

export default CalendarLayout;

const styles = StyleSheet.create({});

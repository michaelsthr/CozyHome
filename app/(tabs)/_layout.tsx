import { Tabs } from "expo-router";
import React from "react";
import { Image } from "react-native";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: "#7749f8",
                animation: "shift",
                tabBarStyle: {
                    paddingTop: 5,
                },
                tabBarIcon: ({ focused }) => {
                    let iconSource;
                    const iconStyle = { width: 24, height: 24 };

                    if (route.name === "index") {
                        iconSource = focused
                            ? require("@/assets/images/icons/home_full.png")
                            : require("@/assets/images/icons/home.png");
                    } else if (route.name === "calendar") {
                        iconSource = focused
                            ? require("@/assets/images/icons/calendar_full.png")
                            : require("@/assets/images/icons/calendar.png");
                    } else if (route.name === "fridge") {
                        iconSource = focused
                            ? require("@/assets/images/icons/fridge_full.png")
                            : require("@/assets/images/icons/fridge.png");
                    } else if (route.name === "todo") {
                        iconSource = focused
                            ? require("@/assets/images/icons/todo_full.png")
                            : require("@/assets/images/icons/todo.png");
                    }

                    return <Image source={iconSource} style={iconStyle} />;
                },
            })}>
            <Tabs.Screen
                name='index'
                options={{
                    title: "Home",
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name='calendar'
                options={{
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name='fridge'
                options={{
                    title: "Fridge",
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name='todo'
                options={{
                    title: "To Dos",
                    headerShown: false,
                }}
            />
        </Tabs>
    );
}

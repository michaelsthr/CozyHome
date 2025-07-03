import { Tabs } from "expo-router";
import React from "react";
import { Image } from "react-native";

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ animation: "shift" }}>
            <Tabs.Screen 
                name='index' 
                options={{ 
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: () => (
                        <Image
                            source={require("@/assets/images/fridge_icons/logo-2.png")}
                            style={{
                                width: 24,
                                height: 24,
                                marginRight: "auto",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        />
                    ),
                }} 
            />
            <Tabs.Screen
                name='calendar'
                options={{
                    headerShown: false,
                    tabBarIcon: () => (
                        <Image
                            source={require("@/assets/images/calendar.png")}
                            style={{
                                width: 24,
                                height: 24,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name='fridge'
                options={{
                    title: "Fridge",
                    headerShown: false,
                    tabBarIcon: () => (
                        <Image
                            source={require("../../assets/images/fridge_icons/fridge-black.png")}
                            style={{ width: 24, height: 24 }}
                        />
                    ),
                }}
            />
            <Tabs.Screen 
        name='todo'
        options={{
          title: "To Dos",
          headerShown: false,
          tabBarIcon: () => (
            <Image
              source={require("../../assets/todo.png")}
              style={{
                width: 28,
                height: 28,
                marginRight: "auto",
                alignItems: "center",
                justifyContent: "center",
              }} />
            ),
          }}
        />
        </Tabs>
    );
}

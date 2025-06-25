import Timetable from "@/components/timetable";
import { Link } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {containerStyles } from "@/styles/container_styles"
import { fontStyles } from "@/styles/font_styles";
import { iconStyles } from "@/styles/icon_styles";

const MONTH_NAMES = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
const CURRENT_MONTH = MONTH_NAMES[new Date().getMonth()];

export default function calendar() {
    return (
        <SafeAreaView style={{height: "100%"}}>
            <View style={containerStyles.container}>
                <View
                    style={containerStyles.container_header}>
                    <Image
                        source={require("../../../assets/calendar.png")}
                        style={iconStyles.icon1}
                    />
                    <Text
                        style={fontStyles.h1}>
                        {CURRENT_MONTH}
                    </Text>
                </View>
                <Link href='/(tabs)/calendar/category' push asChild>
                    <Pressable>
                        <Image
                            source={require("../../../assets/inbox.png")}
                            style={iconStyles.icon1}
                        />
                    </Pressable>
                </Link>
                <Link href='/(tabs)/calendar/add_event' push asChild>
                    <Pressable>
                        <Image
                            source={require("../../../assets/symbol-plus.png")}
                            style={iconStyles.icon2}
                        />
                    </Pressable>
                </Link>
            </View>
            <Timetable />
        </SafeAreaView>
    );
}
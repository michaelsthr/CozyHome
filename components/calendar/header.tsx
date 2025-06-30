import { MONTH_NAMES } from "@/lib/constants/calendar";
import { fontStyles } from "@/styles/font_styles";
import { iconStyles } from "@/styles/icon_styles";
import { Link } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const CURRENT_MONTH = MONTH_NAMES[new Date().getMonth()]; // fix to table monnth

export default function Header() {
    return (
        <View style={headerStyles.container}>
            <View style={headerStyles.leftContainer}>
                <Image source={require("@/assets/images/calendar.png")} style={iconStyles.icon1} />
                <Text style={fontStyles.h2}>{CURRENT_MONTH}</Text>
            </View>
            <View style={headerStyles.rightContainer}>
                <Link href='/(tabs)/calendar/category_view' push asChild>
                    <Pressable>
                        <Image
                            source={require("@/assets/images/inbox.png")}
                            style={iconStyles.icon1}
                        />
                    </Pressable>
                </Link>
                <Link href='/(tabs)/calendar/event_view' push asChild>
                    <Pressable>
                        <Image
                            source={require("@/assets/images/symbol-plus.png")}
                            style={iconStyles.icon1}
                        />
                    </Pressable>
                </Link>
            </View>
        </View>
    );
}

const headerStyles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        alignItems: "center",
        width: "100%",
    },
    leftContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    rightContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
    },
});

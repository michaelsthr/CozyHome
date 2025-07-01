import { fontStyles } from "@/styles/font_styles";
import { iconStyles } from "@/styles/icon_styles";
import { Link } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface HeaderProps {
    currentMonth: string;
    onCalendarPress?: () => void;
}

export default function Header({ currentMonth, onCalendarPress }: HeaderProps) {
    return (
        <View style={headerStyles.container}>
            <Pressable onPress={onCalendarPress} style={headerStyles.leftContainer} hitSlop={200}>
                <Image source={require("@/assets/images/calendar.png")} style={iconStyles.icon1} />
                <Text style={fontStyles.h3}>{currentMonth}</Text>
            </Pressable>
            <View style={headerStyles.rightContainer}>
                <Link href='/calendar/category_view' push asChild>
                    <Pressable hitSlop={50}>
                        <Image
                            source={require("@/assets/images/inbox.png")}
                            style={iconStyles.icon1}
                        />
                    </Pressable>
                </Link>
                <Link href='/calendar/event_view' push asChild>
                    <Pressable hitSlop={5}>
                        <Image
                            source={require("@/assets/images/symbol-plus.png")}
                            style={iconStyles.icon2}
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
        paddingHorizontal: 16,
        paddingVertical: 10,
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
        gap: 30,
    },
});

import { buttonStyles } from "@/styles/button_styles";
import { fontStyles } from "@/styles/font_styles";
import { headerStyles } from "@/styles/header_styles";
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
                <Image source={require("@/assets/images/icons/calendar.png")} style={iconStyles.icon1} />
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
                    <Pressable hitSlop={5} style={buttonStyles.plusButton}>
                        <Image
                            source={require("@/assets/images/symbol-plus.png")}
                            style={iconStyles.plusIcon}
                        />
                    </Pressable>
                </Link>
            </View>
        </View>
    );
}
import Timetable from "@/components/timetable";
import { Link } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
        <SafeAreaView
            style={{
                flex: 1,
                height: "100%",
                backgroundColor: "white",
                marginBottom: 10,
            }}>
            <View style={styles.container}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-around",
                        gap: 5,
                        marginRight: "auto",
                    }}>
                    <Image
                        source={require("../../../assets/calendar.png")}
                        style={{ width: 24, height: 24, marginRight: "auto" }}
                    />
                    <Text
                        style={{
                            fontSize: 30,
                            fontWeight: "bold",
                            textAlign: "center",
                            marginRight: "auto",
                        }}>
                        {CURRENT_MONTH}
                    </Text>
                </View>
                <Link href='/(tabs)/calendar/category' push asChild>
                    <Pressable>
                        <Image
                            source={require("../../../assets/inbox.png")}
                            style={{ width: 24, height: 24 }}
                        />
                    </Pressable>
                </Link>
                <Link href='/(tabs)/calendar/add_event' push asChild>
                    <Pressable>
                        <Image
                            source={require("../../../assets/symbol-plus.png")}
                            style={{ width: 17, height: 17 }}
                        />
                    </Pressable>
                </Link>
            </View>
            <Timetable />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 20,
        alignItems: "center",
        paddingHorizontal: 30,
        backgroundColor: "white",
    },
});

import Header from "@/components/calendar/header";
import Timetable from "@/components/calendar/timetable/timetable";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Calendar() {
    return (
        <SafeAreaView style={{ height: "100%" }}>
            <Header />
            <Timetable />
        </SafeAreaView>
    );
}

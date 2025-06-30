import Header from "@/components/calendar/header";
import Timetable from "@/components/calendar/timetable/timetable";
import { MONTH_NAMES } from "@/lib/constants/calendar";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Calendar() {
    const [currentMonth, setCurrentMonth] = useState(MONTH_NAMES[new Date().getMonth()]);

    return (
        <SafeAreaView style={{ height: "100%" }}>
            <Header currentMonth={currentMonth} />
            <Timetable onMonthChange={setCurrentMonth} />
        </SafeAreaView>
    );
}

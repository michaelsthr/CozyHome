import Header from "@/components/calendar/header";
import TimePickerModal from "@/components/calendar/time_picker_modal";
import Timetable from "@/components/calendar/timetable/timetable";
import { MONTH_NAMES } from "@/lib/constants/calendar";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Calendar() {
    const [currentMonth, setCurrentMonth] = useState(MONTH_NAMES[new Date().getMonth()]);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const timetableRef = useRef<any>(null);

    const handleCalendarPress = () => setShowDatePicker(true);

    const handleDateChange = (event: any, date?: Date) => {
        setShowDatePicker(false);
        if (date) {
            setSelectedDate(date);
            timetableRef.current?.jumpToDate(date);
        }
    };

    return (
        <SafeAreaView style={{ height: "100%" }}>
            <Header currentMonth={currentMonth} onCalendarPress={handleCalendarPress} />
            <Timetable ref={timetableRef} onMonthChange={setCurrentMonth} />
            <TimePickerModal
                showStartDatePicker={showDatePicker}
                value={selectedDate}
                onDateChanges={handleDateChange}
                title='Select a date'
                onDismiss={() => setShowDatePicker(false)}
            />
        </SafeAreaView>
    );
}

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomDateTimePicker from "./custom_date_time_picker";

interface TimeRangePickerProps {
    startTime: Date;
    endTime: Date;
    onStartTimeChange: (event: any, selectedDate?: Date) => void;
    onEndTimeChange: (event: any, selectedDate?: Date) => void;
    display: "default" | "compact" | "inline" | "spinner" | "clock" | "calendar";
}

const TimeRangePicker: React.FC<TimeRangePickerProps> = ({
    startTime,
    endTime,
    onStartTimeChange,
    onEndTimeChange,
    display,
}) => {
    return (
        <View style={styles.timeRangeContainer}>
            <View style={styles.timePickerWrapper}>
                <CustomDateTimePicker
                    value={startTime}
                    mode='time'
                    onChange={onStartTimeChange}
                    display={display}
                />
            </View>
            <View style={{ marginHorizontal: 10 }}>
                <Text style={styles.arrow}>→</Text>
            </View>
            <View style={styles.timePickerWrapper}>
                <CustomDateTimePicker
                    value={endTime}
                    mode='time'
                    onChange={onEndTimeChange}
                    display={display}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    timeRangeContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    timePickerWrapper: {
        flex: 1,
    },
    arrow: {
        fontSize: 24,
        color: "#6b7280",
        fontWeight: "bold",
    },
});

export default TimeRangePicker;

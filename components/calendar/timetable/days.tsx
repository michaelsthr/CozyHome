import { CELL_WIDTH, DAY_WIDTH, WEEKDAYS } from "@/lib/constants/calendar";
import { StyleSheet, Text, View } from "react-native";

export function Days({ startOfWeek }: { startOfWeek: Date }) {
    const today = new Date();
    const headerCells = [];
    for (let i = 0; i < 7; i++) {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);

        const isToday = day.toDateString() === today.toDateString();

        headerCells.push(
            <View style={styles.headerCell} key={i}>
                <Text style={styles.weekday}>{WEEKDAYS[i]}</Text>
                <View style={[styles.dateContainer, isToday && styles.todayCircle]}>
                    <Text style={[styles.weekday, isToday && styles.todayText]}>
                        {day.getDate()}
                    </Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.headerRow}>
            <View style={{ width: CELL_WIDTH }} />
            {headerCells}
        </View>
    );
}

const styles = StyleSheet.create({
    headerRow: {
        flexDirection: "row",
        marginVertical: 10,
    },
    weekday: {
        textAlign: "center",
        fontSize: 15,
    },
    headerCell: {
        height: 51,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: DAY_WIDTH - 16,
        marginHorizontal: 8,
        gap: 5,
    },
    dateContainer: {
        width: 28,
        height: 28,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 14,
    },
    todayCircle: {
        backgroundColor: "#7749f8",
        borderWidth: 2,
        borderColor: "#7749f8",
    },
    todayText: {
        color: "white",
        fontWeight: "bold",
    },
});

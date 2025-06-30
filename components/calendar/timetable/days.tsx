import { CELL_WIDTH, DAY_WIDTH, WEEKDAYS } from "@/lib/constants/calendar";
import { StyleSheet, Text, View } from "react-native";

export function Days({ startOfWeek }: { startOfWeek: Date }) {
    const headerCells = [];
    for (let i = 0; i < 7; i++) {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);
        headerCells.push(
            <View style={styles.headerCell} key={i}>
                <Text style={styles.weekday}>{WEEKDAYS[i]}</Text>
                <Text style={styles.weekday}>{day.getDate()}</Text>
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
});

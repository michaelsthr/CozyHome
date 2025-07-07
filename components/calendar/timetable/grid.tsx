import { CELL_HEIGHT, DAY_WIDTH, HOURS, WEEKDAYS } from "@/lib/constants/calendar";
import { StyleSheet, View } from "react-native";

export function Grid() {
    return (
        <View style={styles.gridWrapper}>
            {HOURS.map((_, rowIndex) => (
                <View style={styles.row} key={rowIndex}>
                    {WEEKDAYS.map((_, colIndex) => (
                        <View style={styles.cell} key={colIndex} />
                    ))}
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    gridWrapper: {},
    row: {
        flexDirection: "row",
    },
    cell: {
        width: DAY_WIDTH,
        height: CELL_HEIGHT,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderColor: "#eee",
    },
});

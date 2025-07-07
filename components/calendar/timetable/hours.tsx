import { CELL_HEIGHT, CELL_WIDTH, HOURS } from "@/lib/constants/calendar";
import { fontStyles } from "@/styles/font_styles";
import { StyleSheet, Text, View } from "react-native";

export function Hours() {
    return (
        <>
            {HOURS.map((hour, index) => (
                <View style={styles.timecell} key={index}>
                    <Text style={fontStyles.light}>{hour}</Text>
                </View>
            ))}
        </>
    );
}

const styles = StyleSheet.create({
    timecell: {
        height: CELL_HEIGHT,
        width: CELL_WIDTH,
        color: "gray",
        alignItems: "center",
        justifyContent: "center",
    },
});

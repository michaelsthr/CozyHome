import { CELL_HEIGHT, DAY_WIDTH } from "@/lib/constants/calendar";
import { EventInterface } from "@/lib/types/calendar";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export function EventBlock({ event, startOfWeek }: { event: EventInterface; startOfWeek: Date }) {
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);

    const eventDay = new Date(startDate);
    eventDay.setHours(0, 0, 0, 0);

    const startOfWeekDay = new Date(startOfWeek);
    startOfWeekDay.setHours(0, 0, 0, 0);

    const diffTime = eventDay.getTime() - startOfWeekDay.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0 || diffDays >= 7) {
        return null;
    }

    const startHour = startDate.getHours() + startDate.getMinutes() / 60;
    const endHour = endDate.getHours() + endDate.getMinutes() / 60;

    const top = startHour * CELL_HEIGHT;
    const height = (endHour - startHour) * CELL_HEIGHT;
    const left = diffDays * DAY_WIDTH;
    const width = DAY_WIDTH;

    return (
        <Pressable
            onPress={() =>
                router.push({
                    pathname: "/calendar/event_view",
                    params: {
                        id: event.id,
                        name: event.name,
                        startDate: event.startDate,
                        endDate: event.endDate,
                        repeat: String(event.repeat),
                        creator: event.creator,
                        description: event.description,
                        color: event.color,
                        borderColor: event.borderColor,
                    },
                })
            }
            style={[
                styles.eventBlock,
                {
                    top: top,
                    left: left,
                    height: height,
                    width: width,
                    backgroundColor: event.color,
                    borderColor: event.borderColor,
                },
            ]}>
            <View>
                <Text style={styles.eventText} numberOfLines={5} ellipsizeMode="clip">
                    {event.name}
                </Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    eventBlock: {
        position: "absolute",
        opacity: 0.8,
        borderRadius: 10,
        padding: 5,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        flex: 1,
        flexWrap: "wrap",
        textAlign: "center"
    },
    eventText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 10,
    },
});

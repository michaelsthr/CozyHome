import { EventInterface } from "@/lib/types/calendar";
import React from "react";
import { ScrollView, View } from "react-native";
import { Days } from "./days";
import { EventBlock } from "./event_block";
import { Grid } from "./grid";
import { Hours } from "./hours";

interface WeekViewProps {
    dateForWeek: Date;
    events: EventInterface[];
    viewWidth: number;
}

const getStartOfWeek = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    d.setDate(diff);
    d.setHours(0, 0, 0, 0);
    return d;
};

export const WeekView: React.FC<WeekViewProps> = ({ dateForWeek, events, viewWidth }) => {
    const startOfWeek = getStartOfWeek(dateForWeek);
    const weekEnd = new Date(startOfWeek);
    weekEnd.setDate(startOfWeek.getDate() + 7);

    const weekEvents = events.filter((event) => {
        const eventDate = new Date(event.startDate);
        return eventDate >= startOfWeek && eventDate < weekEnd;
    });

    return (
        <View style={{ width: viewWidth, height: "100%" }}>
            <Days startOfWeek={startOfWeek} />
            <ScrollView style={{ flex: 1 }}>
                <View style={{ flexDirection: "row" }}>
                    <View>
                        <Hours />
                    </View>
                    <View style={{ position: "relative", flex: 1 }}>
                        <Grid />
                        {weekEvents.map((event, index) => (
                            <EventBlock key={index} event={event} startOfWeek={startOfWeek} />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

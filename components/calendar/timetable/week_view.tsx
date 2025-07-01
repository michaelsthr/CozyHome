import { getCategory } from "@/lib/appwrite/dbKalender";
import { EventWithId } from "@/lib/types/calendar";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Models } from "react-native-appwrite";
import { Days } from "./days";
import { EventBlock } from "./event_block";
import { Grid } from "./grid";
import { Hours } from "./hours";

interface WeekViewProps {
    dateForWeek: Date;
    events: EventWithId[];
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

    const [categories, setCategories] = useState<Models.Document[]>([]);

    useEffect(() => {
        getCategory()
            .then((res) => setCategories(res.documents))
            .catch(() => {});
    }, []);

    const categoryColorMap = new Map<string, string>();
    categories.forEach((cat) => {
        if (cat.color) {
            categoryColorMap.set(cat.$id, cat.color);
        }
    });

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
                        {weekEvents.map((event, index) => {
                            const color = categoryColorMap.get(event.category) || "tomato";
                            return (
                                <EventBlock
                                    key={index}
                                    event={event}
                                    startOfWeek={startOfWeek}
                                    categoryColor={color}
                                />
                            );
                        })}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

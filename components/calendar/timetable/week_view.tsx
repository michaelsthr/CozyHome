import { getAllCategory } from "@/lib/appwrite/dbKalender";
import { CELL_HEIGHT } from "@/lib/constants/calendar";
import { EventWithId } from "@/lib/types/calendar";
import React, { useEffect, useRef, useState } from "react";
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
    const scrollViewRef = useRef<ScrollView>(null);

    useEffect(() => {
        getAllCategory()
            .then((res) => setCategories(res.documents))
            .catch(() => {});
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            scrollViewRef.current?.scrollTo({
                y: 6 * CELL_HEIGHT,
                animated: false,
            });
        }, 100);

        return () => clearTimeout(timer);
    }, [dateForWeek]);

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
            <ScrollView ref={scrollViewRef} style={{ flex: 1 }}>
                <View style={{ flexDirection: "row" }}>
                    <View>
                        <Hours />
                    </View>
                    <View style={{ position: "relative", flex: 1 }}>
                        <Grid />
                        {weekEvents.map((event, index) => {
                            const categoryColor = (event.category as any)?.color || "#000000";
                            return (
                                <EventBlock
                                    key={index}
                                    event={event}
                                    startOfWeek={startOfWeek}
                                    categoryColor={categoryColor}
                                />
                            );
                        })}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

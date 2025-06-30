import { getCalender } from "@/lib/appwrite/dbKalender";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { EventInterface } from "../../../lib/types/calendar";
import { WeekView } from "./week_view";

export default function Timetable() {
    const [events, setEvents] = useState<EventInterface[]>([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const scrollViewRef = useRef<ScrollView>(null);
    const [viewWidth, setViewWidth] = useState(Dimensions.get("window").width);

    const fetchEvents = async () => {
        try {
            const response = await getCalender();

            if (response) {
                const mappedEvents = response.documents.map((document) => ({
                    id: document.$id,
                    name: document.name,
                    startDate: document.startDate,
                    endDate: document.endDate,
                    repeat: Boolean(document.repeat),
                    creator: document.creator,
                    description: document.description,
                    color: document.color || "#1E88E5",
                    borderColor: document.borderColor || "#0D47A1",
                }));

                setEvents(mappedEvents as EventInterface[]);
            }
        } catch (error) {
            console.error("Failed to fetch events:", error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchEvents();
        }, [])
    );

    const handleMomentumScrollEnd = (e: any) => {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const newPage = Math.round(contentOffsetX / viewWidth);

        if (newPage === 1) {
            return;
        }

        const dateModifier = newPage === 2 ? 7 : -7;
        setCurrentDate((current) => {
            const newDate = new Date(current);
            newDate.setDate(current.getDate() + dateModifier);
            return newDate;
        });

        scrollViewRef.current?.scrollTo({ x: viewWidth, animated: false });
    };

    const prevWeekDate = new Date(currentDate);
    prevWeekDate.setDate(currentDate.getDate() - 7);
    const nextWeekDate = new Date(currentDate);
    nextWeekDate.setDate(currentDate.getDate() + 7);

    return (
        <View
            style={{ flex: 1 }}
            onLayout={(event) => {
                setViewWidth(event.nativeEvent.layout.width);
            }}>
            {viewWidth > 0 ?
                <ScrollView
                    ref={scrollViewRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={handleMomentumScrollEnd}
                    contentContainerStyle={{ height: "100%" }}
                    contentOffset={{ x: viewWidth, y: 0 }}>
                    <WeekView dateForWeek={prevWeekDate} events={events} viewWidth={viewWidth} />
                    <WeekView dateForWeek={currentDate} events={events} viewWidth={viewWidth} />
                    <WeekView dateForWeek={nextWeekDate} events={events} viewWidth={viewWidth} />
                </ScrollView>
            :   null}
        </View>
    );
}

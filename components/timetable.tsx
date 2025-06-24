import { getCalender } from "@/lib/appwrite/dbKalender";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

// Hours from 0:00 to 23:00
const HOURS = Array.from({ length: 24 }, (_, i) => `${i}:00`);
const CELL_HEIGHT = 50;
const CELL_WIDTH = 40;

const WEEKDAYS = ["M", "D", "M", "D", "F", "S", "S"];
const DAY_WIDTH = 50;

interface EventInterface {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    repeat: boolean;
    creator: string;
    description: string;
    color: string;
    borderColor: string;
}

const styles = StyleSheet.create({
    headerRow: {
        flexDirection: "row",
        marginVertical: 10,
    },
    timecell: {
        height: CELL_HEIGHT,
        width: CELL_WIDTH,
        color: "gray",
        alignItems: "center",
        justifyContent: "center",
    },
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
    weekday: {
        textAlign: "center",
        fontSize: 15,
    },
    lightText: {
        color: "gray",
        fontSize: 11,
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

    eventBlock: {
        position: "absolute",
        opacity: 0.9,
        borderRadius: 10,
        padding: 5,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        flex: 1,
        flexWrap: "wrap",
    },
    eventText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 10,
    },
});

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
                    pathname: "/calendar/add_event",
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
                <Text style={styles.eventText} numberOfLines={1} ellipsizeMode='tail'>
                    {event.name}
                </Text>
            </View>
        </Pressable>
    );
}

function HeaderRow({ startOfWeek }: { startOfWeek: Date }) {
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

function DayGrid() {
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

function SideTimes() {
    return (
        <>
            {HOURS.map((hour, index) => (
                <View style={styles.timecell} key={index}>
                    <Text style={styles.lightText}>{hour}</Text>
                </View>
            ))}
        </>
    );
}

export default function Timetable() {
    const [events, setEvents] = useState<EventInterface[]>([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const scrollViewRef = useRef<ScrollView>(null);
    const [viewWidth, setViewWidth] = useState(Dimensions.get("window").width);

    const getStartOfWeek = (date: Date) => {
        const d = new Date(date);
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1);
        d.setDate(diff);
        d.setHours(0, 0, 0, 0);
        return d;
    };

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

    const renderWeekView = (dateForWeek: Date) => {
        const startOfWeek = getStartOfWeek(dateForWeek);
        const weekEnd = new Date(startOfWeek);
        weekEnd.setDate(startOfWeek.getDate() + 7);

        const weekEvents = events.filter((event) => {
            const eventDate = new Date(event.startDate);
            return eventDate >= startOfWeek && eventDate < weekEnd;
        });

        return (
            <View style={{ width: viewWidth, height: "100%" }}>
                <HeaderRow startOfWeek={startOfWeek} />
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row" }}>
                        <View>
                            <SideTimes />
                        </View>
                        <View style={{ position: "relative", flex: 1 }}>
                            <DayGrid />
                            {weekEvents.map((event, index) => (
                                <EventBlock key={index} event={event} startOfWeek={startOfWeek} />
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
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
            {viewWidth > 0 ? (
                <ScrollView
                    ref={scrollViewRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={handleMomentumScrollEnd}
                    contentContainerStyle={{ height: "100%" }}
                    contentOffset={{ x: viewWidth, y: 0 }}>
                    {renderWeekView(prevWeekDate)}
                    {renderWeekView(currentDate)}
                    {renderWeekView(nextWeekDate)}
                </ScrollView>
            ) : null}
        </View>
    );
}

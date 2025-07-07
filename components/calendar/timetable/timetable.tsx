import { getCalender } from "@/lib/appwrite/dbKalender";
import { MONTH_NAMES } from "@/lib/constants/calendar";
import { useFocusEffect } from "expo-router";
import React, {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { EventWithId } from "../../../lib/types/calendar";
import { WeekView } from "./week_view";

interface TimetableProps {
    onMonthChange: (month: string) => void;
}

interface TimetableRef {
    jumpToDate: (date: Date) => void;
}

const Timetable = forwardRef<TimetableRef, TimetableProps>(({ onMonthChange }, ref) => {
    const [events, setEvents] = useState<EventWithId[]>([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const scrollViewRef = useRef<ScrollView>(null);
    const [viewWidth, setViewWidth] = useState(Dimensions.get("window").width);
    const [pendingMonthChange, setPendingMonthChange] = useState<string | null>(null);

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
                    category: document.category
                }));

                setEvents(mappedEvents as EventWithId[]);
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

    useEffect(() => {
        if (pendingMonthChange) {
            onMonthChange(pendingMonthChange);
            setPendingMonthChange(null);
        }
    }, [pendingMonthChange, onMonthChange]);

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
            setPendingMonthChange(MONTH_NAMES[newDate.getMonth()]);
            return newDate;
        });

        scrollViewRef.current?.scrollTo({ x: viewWidth, animated: false });
    };

    const prevWeekDate = new Date(currentDate);
    prevWeekDate.setDate(currentDate.getDate() - 7);
    const nextWeekDate = new Date(currentDate);
    nextWeekDate.setDate(currentDate.getDate() + 7);

    // Expose methods to parent component
    useImperativeHandle(ref, () => ({
        jumpToDate: (date: Date) => {
            setCurrentDate(date);
            setPendingMonthChange(MONTH_NAMES[date.getMonth()]);
        },
    }));

    return (
        <View
            style={{height: "100%"}}
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
});

Timetable.displayName = "Timetable";

export default Timetable;

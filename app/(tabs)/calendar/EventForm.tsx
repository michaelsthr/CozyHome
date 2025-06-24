import CozyInput from "@/components/cozy_input";
import { useUser } from "@/components/UserContext";
import { Event } from "@/lib/appwrite/dbKalender";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Button, StyleSheet, Switch, Text, TextInput, View } from "react-native";

interface EventFormProps {
    event?: Event;
    onSubmit: (event: Event) => void;
    isEditMode: boolean;
}

const EventForm: React.FC<EventFormProps> = ({ event, onSubmit, isEditMode }) => {
    const { userId } = useUser();
    const creator: string = userId || "";

    const [name, setName] = useState(event?.name || "");
    const [description, setDescription] = useState(event?.description || "");
    const [category, setCategory] = useState(event?.category || "");

    const [wholeday, setWholeDay] = useState(event?.wholeday || false);
    const [repeat, setRepeat] = useState(event?.repeat || false);
    const toggleWholeDay = () => setWholeDay((previousState) => !previousState);
    const toggleRepeat = () => setRepeat((previousState) => !previousState);

    const [date, setDate] = useState(event ? new Date(event.startDate) : new Date());
    const [startTime, setStartTime] = useState(event ? new Date(event.startDate) : new Date());
    const [endTime, setEndTime] = useState(event ? new Date(event.endDate) : new Date());

    const onDateChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };

    const onStartTimeChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || startTime;
        setStartTime(currentDate);
    };

    const onEndTimeChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || endTime;
        setEndTime(currentDate);
    };

    const handleSubmit = () => {
        const startDateTime = new Date(date);
        startDateTime.setHours(
            startTime.getHours(),
            startTime.getMinutes(),
            startTime.getSeconds()
        );

        const endDateTime = new Date(date);
        endDateTime.setHours(endTime.getHours(), endTime.getMinutes(), endTime.getSeconds());

        const eventData: Event = {
            name: name || "new Event",
            startDate: startDateTime.toISOString(),
            endDate: endDateTime.toISOString(),
            description: description,
            category: category,
            creator: creator,
            repeat: repeat,
            wholeday: wholeday,
        };
        onSubmit(eventData);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={{
                    fontSize: 25,
                    fontWeight: "bold",
                    textAlign: "left",
                }}
                placeholder='Titel'
                placeholderTextColor={"grey"}
                onChangeText={(text) => setName(text)}
                value={name}
            />
            <View
                style={{
                    borderBottomColor: "grey",
                    borderBottomWidth: 1,
                    width: "100%",
                    marginVertical: 10,
                }}
            />
            <View style={{}}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        marginVertical: 20,
                        alignContent: "center",
                    }}>
                    <DateTimePicker
                        value={startTime}
                        mode={"time"}
                        is24Hour={true}
                        onChange={onStartTimeChange}
                        themeVariant='light'
                    />
                    <Text style={{ alignSelf: "center", marginHorizontal: 20 }}>→</Text>
                    <DateTimePicker
                        value={endTime}
                        mode={"time"}
                        is24Hour={true}
                        onChange={onEndTimeChange}
                        themeVariant='light'
                    />
                </View>
                <DateTimePicker
                    value={date}
                    mode={"date"}
                    is24Hour={true}
                    onChange={onDateChange}
                    themeVariant='light'
                />
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginVertical: 10,
                        justifyContent: "space-between",
                    }}>
                    <Text>Wholeday</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={wholeday ? "#f4f3f4" : "#f4f3f4"}
                        onValueChange={toggleWholeDay}
                        value={wholeday}
                    />
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginVertical: 10,
                        justifyContent: "space-between",
                    }}>
                    <Text>Repeat</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={repeat ? "#f4f3f4" : "#f4f3f4"}
                        onValueChange={toggleRepeat}
                        value={repeat}
                    />
                </View>
                <View
                    style={{
                        borderBottomColor: "grey",
                        borderBottomWidth: 1,
                        width: "100%",
                        marginVertical: 10,
                    }}
                />
                <CozyInput
                    placeholder='Category'
                    placeholderTextColor={"black"}
                    onChangeText={setCategory}
                    value={category}
                />
                <View
                    style={{
                        borderBottomColor: "grey",
                        borderBottomWidth: 1,
                        width: "100%",
                        marginVertical: 10,
                    }}
                />
                <CozyInput
                    placeholder='Description'
                    placeholderTextColor={"black"}
                    onChangeText={setDescription}
                    value={description}
                />
                <Button title={isEditMode ? "Update Event" : "Add Event"} onPress={handleSubmit} />
            </View>
        </View>
    );
};

export default EventForm;

const styles = StyleSheet.create({
    container: {
        alignContent: "center",
        height: "30%",
        flexGrow: 1,
        justifyContent: "center",
        marginHorizontal: 30,
    },

    button: {
        borderRadius: 10,
    },
});

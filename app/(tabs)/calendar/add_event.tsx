import { createNewEvent, Event } from "@/lib/appwrite/dbKalender";
import { useNavigation } from "expo-router";
import React from "react";
import { Button, View } from "react-native";
import EventForm from "./EventForm";

const AddEvent = () => {
    const navigation = useNavigation();

    const handleAddEvent = async (event: Event) => {
        await createNewEvent(event);
        console.log("Event created");
        navigation.goBack();
    };

    return (
        <View style={{ flex: 1, justifyContent: "center" }}>
            <Button onPress={() => navigation.goBack()} title='Back' />
            <EventForm onSubmit={handleAddEvent} isEditMode={false} />
        </View>
    );
};

export default AddEvent;

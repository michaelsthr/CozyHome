import DeleteModal from "@/components/DeleteModal";
import { createNewEvent, deleteEvent, updateEvent } from "@/lib/appwrite/dbKalender";
import { Event } from "@/lib/types/calendar";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useState } from "react";
import { Button, View } from "react-native";
import EventForm from "./event_form";

const AddEvent = () => {
    const navigation = useNavigation();
    const params = useLocalSearchParams();
    const isEdit = !!params.id;
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    
    const eventFromParams: Event | undefined =
        isEdit ?
            {
                name: typeof params.name === "string" ? params.name : "",
                startDate:
                    typeof params.startDate === "string" ?
                        params.startDate
                    :   new Date().toISOString(),
                endDate:
                    typeof params.endDate === "string" ? params.endDate : new Date().toISOString(),
                description: typeof params.description === "string" ? params.description : "",
                category: typeof params.category === "string" ? params.category : "",
                creator: typeof params.creator === "string" ? params.creator : "",
                repeat: params.repeat === "true",
                wholeday: params.wholeday === "true",
            }
        :   undefined;

    const handleAddOrUpdateEvent = async (event: Event) => {
        if (isEdit && params.id) {
            await updateEvent(params.id as string, event);
            console.log("Event updated");
        } else {
            await createNewEvent(event);
            console.log("Event created");
        }
        navigation.goBack();
    };

    const handleDeleteEvent = async () => {
        if (isEdit && params.id) {
            await deleteEvent(params.id as string);
            navigation.goBack();
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: "center" }}>
            <EventForm
                event={eventFromParams}
                onSubmit={handleAddOrUpdateEvent}
                isEditMode={isEdit}
            />
            {isEdit && (
                <>
                    <Button
                        title='Delete Event'
                        color='red'
                        onPress={() => setShowDeleteModal(true)}
                    />
                    <DeleteModal
                        visible={showDeleteModal}
                        onClose={() => setShowDeleteModal(false)}
                        onDelete={handleDeleteEvent}
                        title='Delete Event?'
                    />
                </>
            )}
        </View>
    );
};

export default AddEvent;


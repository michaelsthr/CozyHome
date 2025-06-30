import { createNewEvent, deleteEvent, Event, updateEvent } from "@/lib/appwrite/dbKalender";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useState } from "react";
import { Button, Modal as RNModal, View } from "react-native";
import EventForm from "./EventForm";

const AddEvent = () => {
    const navigation = useNavigation();
    const params = useLocalSearchParams();
    const isEdit = !!params.id;
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const eventFromParams: Event | undefined = isEdit
        ? {
              name: typeof params.name === "string" ? params.name : "",
              startDate:
                  typeof params.startDate === "string"
                      ? params.startDate
                      : new Date().toISOString(),
              endDate:
                  typeof params.endDate === "string" ? params.endDate : new Date().toISOString(),
              description: typeof params.description === "string" ? params.description : "",
              category: typeof params.category === "string" ? params.category : "",
              creator: typeof params.creator === "string" ? params.creator : "",
              repeat: params.repeat === "true",
              wholeday: params.wholeday === "true",
          }
        : undefined;

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
            <Button onPress={() => navigation.goBack()} title='Back' />
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
                    <RNModal
                        visible={showDeleteModal}
                        animationType='fade'
                        transparent={true}
                        onRequestClose={() => setShowDeleteModal(false)}>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: "flex-end",
                                backgroundColor: "rgba(0,0,0,0.2)",
                            }}>
                            <View
                                style={{
                                    backgroundColor: "white",
                                    padding: 24,
                                    borderTopLeftRadius: 16,
                                    borderTopRightRadius: 16,
                                    marginBottom: 0,
                                }}>
                                <Button title='Cancel' onPress={() => setShowDeleteModal(false)} />
                                <Button
                                    title='Delete'
                                    color='red'
                                    onPress={async () => {
                                        await handleDeleteEvent();
                                        setShowDeleteModal(false);
                                    }}
                                />
                            </View>
                        </View>
                    </RNModal>
                </>
            )}
        </View>
    );
};

export default AddEvent;

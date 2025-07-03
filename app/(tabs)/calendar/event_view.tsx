import DeleteModal from "@/components/DeleteModal";
import { createNewEvent, deleteEvent, updateEvent } from "@/lib/appwrite/dbKalender";
import { Event } from "@/lib/types/calendar";
import { ContainerStyles } from "@/styles/container_styles";
import { fontStyles } from "@/styles/font_styles";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useState } from "react";
import { Button, KeyboardAvoidingView, Platform, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EventForm from "./event_form";

const EventView = () => {
    const navigation = useNavigation();
    const params = useLocalSearchParams();
    const isEdit = !!params.id;
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const getStringParam = (param: string | string[] | undefined): string => {
        if (typeof param === "string") return param;
        if (Array.isArray(param)) return param[0] || "";
        return "";
    };

    const getBooleanParam = (param: string | string[] | undefined): boolean => {
        return getStringParam(param) === "true";
    };

    const eventFromParams: Event | undefined = isEdit
        ? {
              name: getStringParam(params.name),
              startDate: getStringParam(params.startDate) || new Date().toISOString(),
              endDate: getStringParam(params.endDate) || new Date().toISOString(),
              description: getStringParam(params.description),
              category: getStringParam(params.category),
              creator: getStringParam(params.creator),
              repeat: getBooleanParam(params.repeat),
              wholeday: getBooleanParam(params.wholeday),
          }
        : undefined;

    const handleAddOrUpdateEvent = async (event: Event) => {
        try {
            if (isEdit && params.id) {
                await updateEvent(params.id as string, event);
                console.log("Event updated");
            } else {
                await createNewEvent(event);
                console.log("Event created");
            }
            navigation.goBack();
        } catch (error) {
            console.error("Error saving event:", error);
        }
    };

    const handleDeleteEvent = async () => {
        try {
            if (isEdit && params.id) {
                await deleteEvent(params.id as string);
                navigation.goBack();
            }
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    };

    return (
        <SafeAreaView style={ContainerStyles.ModalContainer}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}>
                <View style={ContainerStyles.titleSection}>
                    <Text style={fontStyles.title}>{isEdit ? "Update Event" : "New Event"}</Text>
                </View>
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
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default EventView;

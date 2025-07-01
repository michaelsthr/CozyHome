import CategoryModal from "@/components/calendar/category_modal";
import { getAllCategory } from "@/lib/appwrite/dbKalender";
import { useSession } from "@/lib/context/SessionContext";
import { Event } from "@/lib/types/calendar";
import { ContainerStyles } from "@/styles/container_styles";
import { globalStyles } from "@/styles/global_styles";
import { inputStyles } from "@/styles/input_styles";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import { Button, Pressable, Text, TextInput, View } from "react-native";
import { Models } from "react-native-appwrite";

interface EventFormProps {
    event?: Event;
    onSubmit: (event: Event) => void;
    isEditMode: boolean;
}

const EventForm: React.FC<EventFormProps> = ({ event, onSubmit, isEditMode }) => {
    const { user } = useSession();
    const creator = user?.userId || "";

    const [name, setName] = useState(event?.name || "");
    const [description, setDescription] = useState(event?.description || "");
    const [categoryId, setCategoryId] = useState(event?.category);
    const [wholeday] = useState(event?.wholeday || false);
    const [repeat] = useState(event?.repeat || false);
    const [date, setDate] = useState(event ? new Date(event.startDate) : new Date());
    const [startTime, setStartTime] = useState(event ? new Date(event.startDate) : new Date());
    const [endTime, setEndTime] = useState(event ? new Date(event.endDate) : new Date());
    const [categoryModalVisible, setCategoryModalVisible] = useState(false);
    const [categories, setCategories] = useState<Models.Document[]>([]);

    useEffect(() => {
        getAllCategory()
            .then((res) => {
                const fetchedCategories = res.documents;
                setCategories(fetchedCategories);
                if (event?.category) {
                    setCategoryId(event.category);
                } else if (fetchedCategories.length > 0) {
                    setCategoryId(fetchedCategories[0].$id);
                }
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
            });
    }, [event?.category]);

    const handleDateTimeChange = (type: 'date' | 'startTime' | 'endTime') => 
        (event: any, selectedDate?: Date) => {
            if (!selectedDate) return;
            
            switch (type) {
                case 'date':
                    setDate(selectedDate);
                    break;
                case 'startTime':
                    setStartTime(selectedDate);
                    break;
                case 'endTime':
                    setEndTime(selectedDate);
                    break;
            }
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

        if (!categoryId) {
            console.error("No category selected");
            return;
        }

        const eventData: Event = {
            name: name || "new Event",
            startDate: startDateTime.toISOString(),
            endDate: endDateTime.toISOString(),
            description: description,
            category: categoryId,
            creator: creator,
            repeat: repeat,
            wholeday: wholeday,
        };

        onSubmit(eventData);
    };

    const handleCategorySelect = (category: Models.Document) => {
        setCategoryId(category.$id);
        setCategoryModalVisible(false);
    };

    const selectedCategory = categories.find((c) => c.$id === categoryId);

    return (
        <View style={ContainerStyles.ModalContainer}>
            <TextInput
                style={inputStyles.input}
                placeholder='Titel'
                placeholderTextColor={"grey"}
                onChangeText={(text) => setName(text)}
                value={name}
            />
            <View style={{}}>
                <View style={ContainerStyles.timePickerContainer}>
                    <DateTimePicker
                        value={startTime}
                        mode={"time"}
                        is24Hour={true}
                        onChange={handleDateTimeChange('startTime')}
                        themeVariant='light'
                    />
                    <Text style={globalStyles.timePickerArrow}>→</Text>
                    <DateTimePicker
                        value={endTime}
                        mode={"time"}
                        is24Hour={true}
                        onChange={handleDateTimeChange('endTime')}
                        themeVariant='light'
                    />
                </View>
                <DateTimePicker
                    value={date}
                    mode={"date"}
                    is24Hour={true}
                    onChange={handleDateTimeChange('date')}
                    themeVariant='light'
                />
                <View style={globalStyles.separator} />
                <Pressable
                    onPress={() => setCategoryModalVisible(true)}
                    style={ContainerStyles.categoryPicker}>
                    <Text style={ContainerStyles.categoryPickerText}>Category:</Text>
                    {selectedCategory ?
                        <View style={ContainerStyles.categoryPickerValueContainer}>
                            <View
                                style={[
                                    globalStyles.categoryPickerColorSwatch,
                                    {
                                        backgroundColor: selectedCategory.color || "#ccc",
                                    },
                                ]}
                            />
                            <Text style={ContainerStyles.categoryPickerValueText}>
                                {selectedCategory.name}
                            </Text>
                        </View>
                    :   <Text style={ContainerStyles.categoryPickerPlaceholder}>
                            No categories available
                        </Text>
                    }
                </Pressable>
                <CategoryModal
                    visible={categoryModalVisible}
                    categories={categories}
                    onClose={() => setCategoryModalVisible(false)}
                    onSelectCategory={handleCategorySelect}
                />
                <View style={globalStyles.separator} />
                <TextInput
                    placeholder='Description'
                    placeholderTextColor={"black"}
                    onChangeText={setDescription}
                    value={description}
                    style={inputStyles.descriptionInput}
                />
                <Button title={isEditMode ? "Update Event" : "Add Event"} onPress={handleSubmit} />
            </View>
        </View>
    );
};

export default EventForm;

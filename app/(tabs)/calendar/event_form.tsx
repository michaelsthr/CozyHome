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
    const { user } = useSession()
    const userId = user?.userId
    const creator: string = userId || "";

    const [name, setName] = useState(event?.name || "");
    const [description, setDescription] = useState(event?.description || "");
    const [categoryId, setCategoryId] = useState(event?.category);

    const [wholeday, setWholeDay] = useState(event?.wholeday || false);
    const [repeat, setRepeat] = useState(event?.repeat || false);
    const toggleWholeDay = () => setWholeDay((previousState) => !previousState);
    const toggleRepeat = () => setRepeat((previousState) => !previousState);

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
            .catch(() => {});
    }, [event?.category]);

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

        console.log(eventData);
        onSubmit(eventData);
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
                        onChange={onStartTimeChange}
                        themeVariant='light'
                    />
                    <Text style={globalStyles.timePickerArrow}>→</Text>
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
                    onSelectCategory={(category) => {
                        const newCategory = categories.find((c) => c.name === category.name);
                        if (newCategory) {
                            setCategoryId(newCategory.$id);
                            console.log("set new cat");
                        }
                        setCategoryModalVisible(false);
                    }}
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

import CategoryModal from "@/components/calendar/category_modal";
import { useUser } from "@/components/UserContext";
import { Event, getCategory } from "@/lib/appwrite/dbKalender";
import { ContainerStyles } from "@/styles/container_styles";
import { globalStyles } from "@/styles/global_styles";
import { inputStyles } from "@/styles/input_styles";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import { Button, Pressable, Switch, Text, TextInput, View } from "react-native";
import { Models } from "react-native-appwrite";

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

    const [categoryModalVisible, setCategoryModalVisible] = useState(false);
    const [categories, setCategories] = useState<Models.Document[]>([]);

    useEffect(() => {
        getCategory()
            .then((res) => {
                setCategories(res.documents);
                if (!category && res.documents.length > 0) {
                    setCategory(res.documents[0].name);
                }
            })
            .catch(() => {});
    }, []);

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
                <View style={ContainerStyles.switchContainer}>
                    <Text>Wholeday</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={wholeday ? "#f4f3f4" : "#f4f3f4"}
                        onValueChange={toggleWholeDay}
                        value={wholeday}
                    />
                </View>
                <View style={ContainerStyles.switchContainer}>
                    <Text>Repeat</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={repeat ? "#f4f3f4" : "#f4f3f4"}
                        onValueChange={toggleRepeat}
                        value={repeat}
                    />
                </View>
                <View style={globalStyles.separator} />
                <Pressable
                    onPress={() => setCategoryModalVisible(true)}
                    style={ContainerStyles.categoryPicker}>
                    <Text style={ContainerStyles.categoryPickerText}>Category:</Text>
                    {category ?
                        <View style={ContainerStyles.categoryPickerValueContainer}>
                            {categories.find((c) => c.name === category) && (
                                <View
                                    style={[
                                        globalStyles.categoryPickerColorSwatch,
                                        {
                                            backgroundColor:
                                                categories.find((c) => c.name === category)
                                                    ?.color || "#ccc",
                                        },
                                    ]}
                                />
                            )}
                            <Text style={ContainerStyles.categoryPickerValueText}>{category}</Text>
                        </View>
                    : categories.length > 0 ?
                        <View style={ContainerStyles.categoryPickerValueContainer}>
                            <View
                                style={[
                                    globalStyles.categoryPickerColorSwatch,
                                    { backgroundColor: categories[0].color },
                                ]}
                            />
                            <Text style={{ fontSize: 18 }}>{categories[0].name}</Text>
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
                    onSelectCategory={(categoryName) => {
                        setCategory(categoryName);
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

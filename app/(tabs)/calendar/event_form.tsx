import CategoryModal from "@/components/calendar/category_modal";
import CustomDateTimePicker from "@/components/calendar/custom_date_time_picker";
import TimeRangePicker from "@/components/calendar/time_range_picker";
import { getAllCategory } from "@/lib/appwrite/dbKalender";
import { getUserById } from "@/lib/appwrite/dbUser";
import { useSession } from "@/lib/context/SessionContext";
import { Event } from "@/lib/types/calendar";
import { buttonStyles } from "@/styles/button_styles";
import { cardStyles } from "@/styles/card_styles";
import { ContainerStyles } from "@/styles/container_styles";
import { fontStyles } from "@/styles/font_styles";
import { globalStyles } from "@/styles/global_styles";
import { inputStyles } from "@/styles/input_styles";
import React, { useEffect, useState } from "react";
import { Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";
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
    const [endTime, setEndTime] = useState(() => {
        if (event) return new Date(event.endDate);
        const date = new Date();
        date.setHours(date.getHours() + 1);
        return date;
    });
    const [categoryModalVisible, setCategoryModalVisible] = useState(false);
    const [categories, setCategories] = useState<Models.Document[]>([]);
    const [creatorName, setCreatorName] = useState<string>("");

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

        if (event?.creator) {
            getUserById(event.creator)
                .then((creatorUser) => {
                    if (creatorUser) {
                        setCreatorName(creatorUser.username);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching creator:", error);
                });
        } else {
            setCreatorName(user?.username || "");
        }
    }, [event?.category, event?.creator, user?.username]);

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
        <>
            <TextInput
                style={inputStyles.input}
                placeholder='Titel'
                placeholderTextColor={"grey"}
                onChangeText={(text) => setName(text)}
                value={name}
            />
            
            <View style={{marginVertical: 10}}>
                <CustomDateTimePicker
                    value={date}
                    mode="date"
                    onChange={handleDateTimeChange('date')}
                    display="inline"
                    />
            </View>
            
            <TimeRangePicker
                startTime={startTime}
                endTime={endTime}
                onStartTimeChange={handleDateTimeChange('startTime')}
                onEndTimeChange={handleDateTimeChange('endTime')}
                display="spinner"
            />
            
            <View style={cardStyles.BasicCard}>
                <Pressable
                    onPress={() => setCategoryModalVisible(true)}
                    style={{ flexDirection: "row", alignItems: "center" }}>
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
            </View>
                <CategoryModal
                    visible={categoryModalVisible}
                    categories={categories}
                    onClose={() => setCategoryModalVisible(false)}
                    onSelectCategory={handleCategorySelect}
                />
                <TextInput
                    placeholder='Description'
                    placeholderTextColor={"black"}
                    onChangeText={setDescription}
                    value={description}
                    style={[inputStyles.input, {
                        height: 80,
                        textAlignVertical: 'top',
                        paddingTop: 10,
                    }]}
                    multiline={true}
                    numberOfLines={4}
                />
                <Text
                    style={[
                        fontStyles.subtitle,
                        { textAlign: "left", marginTop: 10, marginBottom: 40},
                    ]}>
                    {"The Creator of this Event is: " + creatorName || "Unknown"}
                </Text>
                <TouchableOpacity style={buttonStyles.button} onPress={handleSubmit}>
                    <Text style={fontStyles.buttonText}>
                        {isEditMode ?  "Update Event" : "Add Event"}
                    </Text>
            </TouchableOpacity>
        </>
    );
};

export default EventForm;

import CozyInput from "@/components/cozy_input";
import { useUser } from "@/components/UserContext";
import { Event, getCategory } from "@/lib/appwrite/dbKalender";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import {
    Button,
    FlatList,
    Modal,
    Pressable,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    View,
} from "react-native";
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
                <Pressable
                    onPress={() => setCategoryModalVisible(true)}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 12,
                        borderWidth: 1,
                        borderColor: "#eee",
                        borderRadius: 8,
                        marginBottom: 10,
                    }}>
                    <Text style={{ fontSize: 16, marginRight: 8 }}>Category:</Text>
                    {category ? (
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginLeft: "auto",
                            }}>
                            {categories.find((c) => c.name === category) && (
                                <View
                                    style={{
                                        width: 20,
                                        height: 20,
                                        marginRight: 10,
                                        borderRadius: 4,
                                        backgroundColor:
                                            categories.find((c) => c.name === category)?.color ||
                                            "#ccc",
                                    }}
                                />
                            )}
                            <Text style={{ fontSize: 16 }}>{category}</Text>
                        </View>
                    ) : categories.length > 0 ? (
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginLeft: "auto",
                            }}>
                            <View
                                style={{
                                    width: 20,
                                    height: 20,
                                    marginRight: 15,
                                    borderRadius: 4,
                                    backgroundColor: categories[0].color,
                                }}
                            />
                            <Text style={{ fontSize: 18 }}>{categories[0].name}</Text>
                        </View>
                    ) : (
                        <Text style={{ color: "#888", marginLeft: "auto" }}>
                            No categories available
                        </Text>
                    )}
                </Pressable>
                <Modal
                    visible={categoryModalVisible}
                    animationType='fade'
                    transparent={true}
                    onRequestClose={() => setCategoryModalVisible(false)}>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: "rgba(0,0,0,0.2)",
                            justifyContent: "center",
                        }}>
                        <View
                            style={{
                                backgroundColor: "white",
                                margin: 30,
                                borderRadius: 12,
                                padding: 20,
                                maxHeight: 400,
                            }}>
                            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
                                Choose category
                            </Text>
                            <FlatList
                                data={categories}
                                keyExtractor={(item) => item.$id}
                                renderItem={({ item }) => (
                                    <Pressable
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            padding: 12,
                                            borderBottomWidth: 1,
                                            borderBottomColor: "#eee",
                                        }}
                                        onPress={() => {
                                            setCategory(item.name);
                                            setCategoryModalVisible(false);
                                        }}>
                                        <View
                                            style={{
                                                width: 20,
                                                height: 20,
                                                marginRight: 15,
                                                borderRadius: 4,
                                                backgroundColor: item.color,
                                            }}
                                        />
                                        <Text style={{ fontSize: 18 }}>{item.name}</Text>
                                    </Pressable>
                                )}
                            />
                            <Button title='Cancel' onPress={() => setCategoryModalVisible(false)} />
                        </View>
                    </View>
                </Modal>
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

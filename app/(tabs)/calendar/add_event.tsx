import CozyInput from "@/components/cozy_input";
import { useUser } from "@/components/UserContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import { Button, StyleSheet, Switch, Text, TextInput, View } from "react-native";

const AddEvent = () => {
    const { userId } = useUser();
    const navigation = useNavigation();
    const [name, setName] = useState("");
    const creator: string = userId || "";
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [wholeday, setWholeDay] = useState(false);
    const [repeat, setRepeat] = useState("");
    const toggleSwitch = () => setWholeDay((previousState) => !previousState);

    const [date, setDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());

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

    return (
        <View style={styles.container}>
            <Button onPress={() => navigation.goBack()} title='Back' />
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
            <View style={{ }}>
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
                    {/* <Image
                    source={require("../../../assets/images/")}
                    /> */}
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
                    <Text>Whole Day</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={wholeday ? "#f4f3f4" : "#f4f3f4"}
                        onValueChange={toggleSwitch}
                        value={wholeday}
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
                <CozyInput placeholder='Category' placeholderTextColor={"black"} />
                <View
                    style={{
                        borderBottomColor: "grey",
                        borderBottomWidth: 1,
                        width: "100%",
                        marginVertical: 10,
                    }}
                />
                <CozyInput placeholder='Description' placeholderTextColor={"black"} />
                <Button
                    title='Add Event'
                    onPress={async () => {
                        console.log("Event created");
                    }}
                />
            </View>
        </View>
    );
};

export default AddEvent;

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

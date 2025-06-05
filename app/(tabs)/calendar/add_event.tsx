import CozyInput from "@/components/cozy_input";
import { useNavigation } from "expo-router";
import React, {useState} from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { getCalender, getCategory, createNewEvent, createNewCategory, deleteEvent} from "../../../lib/appwrite/dbKalender";
import {placeholder} from "@babel/types"; //für db

const AddEvent = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [creator, setCreator] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [wholeday, setWholeDay] = useState(false);
  const [repeat, setRepeat] = useState('');
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 20,
        }}>
        Add new Event
      </Text>
      {/* <Button onPress={() => navigation.goBack()} title='Dismiss' /> */}
      <CozyInput placeholder='Name'
                 placeholderTextColor={"black"}
                 value={name}
                 onChangeText={(text) => setName(text)}
      />
      <CozyInput placeholder='Creator'
                 placeholderTextColor={"black"}
                 value={creator}
                 onChangeText={(text) => setCreator(text)}
      />
      <CozyInput placeholder='Category'
                 placeholderTextColor={"black"}
                 value={category}
                 onChangeText={(text) => setCategory(text)}
      />
      <CozyInput placeholder='Startdate'
                 placeholderTextColor={"black"}
                 value={startDate}
                 onChangeText={(text) => setStartDate(text)}
      />
      <CozyInput placeholder='Enddate'
                 placeholderTextColor={"black"}
                 value={endDate}
                 onChangeText={(text) => setEndDate(text)}
      />
      <CozyInput placeholder='Description'
                 placeholderTextColor={"black"}
                 value={description}
                 onChangeText={(text) => setDescription(text)}
      />
      <CozyInput placeholder='Whole Day'
                 placeholderTextColor={"black"}
                 value={wholeday}
                 onChangeText={(boolean) => setDescription(boolean)}
      />
      <Button
        title='Create'
         onPress={async () => {
          await createNewEvent({
              name: name,
              startDate: startDate,
              endDate: endDate,
              description: description,
              category: category,
              creator: creator,
              repeat: false,
              wholeday: wholeday,
          })
        }}
      />
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

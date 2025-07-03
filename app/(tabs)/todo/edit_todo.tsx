import { Box, HStack, VStack } from "@gluestack-ui/themed";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router, useLocalSearchParams } from "expo-router";
import { CalendarDays } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Button, Alert, Dimensions, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { getTodos, updateTodo } from "../../../lib/appwrite/dbTodo"; //für db
import styles from "./styles";
import {
  DropDownResponsible,
  DropDownLabel,
  DropDownRepeat,
  DatePickerField,
} from "@/components/todo/pickers";
import { getUsersByGroupId } from "@/lib/appwrite/dbUser";
import { useSession } from "@/lib/context/SessionContext";
import { buttonStyles } from "@/styles/button_styles";
import { fontStyles } from "@/styles/font_styles";


const screenWidth = Dimensions.get("screen").width;
const containerWidth = Math.min(screenWidth * 0.9, 400);  // max 400px, sonst 90% Breite
const screenHeight = Dimensions.get("screen").height;

export default function edit_ToDo() {
  const { id } = useLocalSearchParams();
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState('');
  const [selectedRepeat, setSelectedRepeat] = useState('');
  const [selectedLabel, setSelectedLabel] = useState('');
  const [todoName, setTodoName] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  type GroupMember = { $id: string; username: string; groupID: string };
  const [groupMembers, setGroupMembers] = useState<GroupMember[]>([]);
  const { user, group } = useSession();


  useEffect(() => {
    const fetchGroupMembers = async () => {
      if (!user?.groupID) {
        return;
      }
      try {
        const membersData = await getUsersByGroupId(user.groupID.$id);
        setGroupMembers(membersData.documents.map(doc => ({
          $id: doc.$id,
          username: doc.username,
          groupID: doc.groupID.$id
        })));
        console.log(groupMembers);

      } catch (error) {
        console.error("Error fetching group data:", error);
        Alert.alert("Error", "Failed to load group information");
      }
    };

    fetchGroupMembers();
  }, [user?.groupID]);

  const getTodo = async () => {
    try {
      const todos = await getTodos();
      const todo = todos?.documents?.find(todo => todo.$id === id);
      if (!todo) {
        router.back();
        return;
      }
      setSelectedTodo(todo);

      console.log(todo);

      if (todo) {
        setTodoName(todo.name || '');
        setSelectedPerson(todo.responsible || '');
        setSelectedRepeat(todo.regularity || '');
        setSelectedLabel(todo.tag || '');
        setDate(todo.date ? new Date(todo.date) : null);
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching todo contents:", err);
      setLoading(false);
    }
  }

  useEffect(() => {
    getTodo();
  }, []);

  const onChange = (event, selectedDate) => {
    if (Platform.OS !== 'ios') setShow(false);
    if (selectedDate) setDate(selectedDate);
  };

  const showDatepicker = () => setShow(true);
  const cancel = () => { console.log("Cancel"); router.back(); };
  const edit_todo = async (
    title: string,
    responsible: string,
    date: Date | null,
    regularity: string,
    tag: string
  ) => {
    if (!title) {
      setErrorMessage("Please fill in the title")
      return;
    }
    setErrorMessage("");

    const updatedTodo = {
      $id: selectedTodo?.$id,
      name: title,
      responsible: responsible || null,
      date: (date ? date.toISOString() : null),
      regularity: regularity || null,
      tag: tag || null,
    }
    try {
      await updateTodo(updatedTodo);
      console.log("Saved succesfully");
      router.back();
    } catch (error) {
      console.error("Error while Saving");
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container_box,
        { backgroundColor: "#fff" },
      ]}>
      <Text style={styles.heading}>Edit To Do</Text>
      <View style={styles.box}>
        <VStack>
          <Text> Title </Text>
          <TextInput
            value={todoName}
            onChangeText={setTodoName}
            style={styles.textInput}
            placeholderTextColor="#000"
          />
          <View style={{ marginBottom: "10%", zIndex: 4000 }}>
            <Text style={{ marginBottom: "2%" }}>Assignee</Text>
            <DropDownResponsible selectedPerson={selectedPerson} setSelectedPerson={setSelectedPerson} members={groupMembers} />
          </View>
          <View style={{ marginBottom: "10%", zIndex: 3000, position: "relative" }}>
            <Text style={{ marginBottom: "2%" }}>Repeat</Text>
            <DropDownRepeat selectedRepeat={selectedRepeat} setSelectedRepeat={setSelectedRepeat} />
          </View>
          <View style={{ marginBottom: "10%", zIndex: 2000 }}>
            <Text style={{ marginBottom: "2%" }}>Label</Text>
            <DropDownLabel selectedLabel={selectedLabel} setSelectedLabel={setSelectedLabel} />
          </View>
          <DatePickerField date={date} setDate={setDate} />
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-between",
              width: "100%",
              alignContent: "center",
            }}>
            <TouchableOpacity
              style={[buttonStyles.button, { width: "100%", paddingHorizontal: 50 }]}
              onPress={() =>
                edit_todo(
                  todoName,
                  selectedPerson,
                  date,
                  selectedRepeat,
                  selectedLabel)}>
              <Text style={fontStyles.buttonText}>Save</Text>
            </TouchableOpacity>
            <Button title='cancel' onPress={cancel} color={"#7749f8"} />
          </View>
        </VStack>
      </View>
    </SafeAreaView >
  );
}
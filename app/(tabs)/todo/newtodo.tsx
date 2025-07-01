import { Badge, BadgeText, Box, Button, HStack, VStack } from "@gluestack-ui/themed";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import { CalendarDays } from "lucide-react-native"; // oder deine Icon-Bibliothek
import React, { useEffect, useState } from "react";
import { Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { addTodo } from "../../../lib/appwrite/dbTodo"; //für db
import styles, { containerWidth } from "./styles";
import { Group, useSession } from "@/lib/context/SessionContext";
import { getUsersByGroupId } from "@/lib/appwrite/dbUser";
import {
  DropDownResponsible,
  DropDownLabel,
  DropDownRepeat,
  DatePickerField,
}  from "@/components/todo/pickers";

const isWeb = Platform.OS === 'web';

interface ToDoItemProps {
  key: string;
  id: string;
  name: string;
  date?: string;
  done: boolean;
  regularity?: string;
  responsible?: string;
}

export default function NewToDo() {
  const [selectedPerson, setSelectedPerson] = useState('');
  const [selectedRepeat, setSelectedRepeat] = useState('');
  const [selectedLabel, setSelectedLabel] = useState('');
  const [successMessage, setSuccessMessage] = useState("");
  const [todoName, setTodoName] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [show, setShow] = useState(false);
  type GroupMember = { $id: string; username: string; groupID: string };
  const [groupMembers, setGroupMembers] = useState<GroupMember[]>([]);
  const { user, group } = useSession();

  const onChange = (event, selectedDate) => {
    if (Platform.OS !== 'ios') setShow(false);
    if (selectedDate) setDate(selectedDate);
  };

  const insets = useSafeAreaInsets();

  const showDatepicker = () => setShow(true);
  const cancel = () => { console.log("Cancel"); router.back(); };
  const [errorMessage, setErrorMessage] = useState("");

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

  const saveNewTodo = (
    title: string,
    responsible: string,
    date: string,
    regularity: string,
    tag: string
  ) => {
    if (!title) {
      setErrorMessage("Please fill in the title")
      return;
    }
    setErrorMessage("");

    const newTodo = {
      name: title,
      responsible: (responsible ? responsible : null),
      date: (date ? date.toISOString() : null),
      regularity: regularity || null,
      tag: tag || null,
      done: false,
    }
    addTodo(newTodo)
    setSuccessMessage("New To-Do added")
    console.log("Speichern");
    router.back();

  }

  return (
    <SafeAreaView style={[styles.container_box, { paddingBottom: insets.bottom + 32 }]}>      <Text style={styles.heading}>Add new To Do</Text>
      {errorMessage !== "" && (
        <View style={{ position: "absolute", alignItems: "center", zIndex: 2000, marginTop: "20%", width: containerWidth }}>
          <Badge style={styles.badgeErrorMessage}><BadgeText style={styles.badgeErrorMessageText}>{errorMessage}</BadgeText></Badge>
        </View>
      )}
      <Box style={styles.box}>
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
            <DropDownResponsible
              selectedPerson={selectedPerson}
              setSelectedPerson={setSelectedPerson}
              members={groupMembers} />
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
        </VStack>
      </Box>
      <HStack style={[styles.buttonsContainer, { marginBottom: insets.bottom + 16 }]}>
        <Button style={[styles.buttons, { backgroundColor: "grey" }]} onPress={cancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </Button>
        <Button style={[styles.buttons, { backgroundColor: "blue" }]} onPress={() => saveNewTodo(todoName, selectedPerson, date, selectedRepeat, selectedLabel)}>
          <Text style={styles.buttonText}>Add</Text>
        </Button>
      </HStack>
    </SafeAreaView>
  );
}
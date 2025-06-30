import { Box, Button, HStack, VStack } from "@gluestack-ui/themed";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router, useLocalSearchParams } from "expo-router";
import { CalendarDays } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Dimensions, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { getTodos, updateTodo } from "../../../lib/appwrite/dbTodo"; //für db
import styles from "./styles";


const screenWidth = Dimensions.get("screen").width;
const containerWidth = Math.min(screenWidth * 0.9, 400);  // max 400px, sonst 90% Breite
const screenHeight = Dimensions.get("screen").height;


const DropDownAssignee = ({ selectedPerson, setSelectedPerson }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(selectedPerson || null);
  const [items, setItems] = useState([
    { label: 'None', value: 'None' },
    { label: 'Bewohner 1', value: 'Bewohner 1' },
    { label: 'Bewohner 2', value: 'Bewohner 2' },
    { label: 'Bewohner 3', value: 'Bewohner 3' },
  ]);

  useEffect(() => {
    setSelectedPerson(value);
  }, [value]);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      zIndex={4000}
      zIndexInverse={1000}
      placeholder="None"
      style={{
        borderColor: '#ccc',
        borderRadius: 8,
      }}
      textStyle={{
        fontSize: 14,
        color: '#000',
      }}
      dropDownContainerStyle={{
        borderColor: '#ccc',
        backgroundColor: "white",
      }}
    />
  );
};

const DropDownRepeat = ({ selectedRepeat, setSelectedRepeat }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(selectedRepeat || null);
  const [items, setItems] = useState([
    { label: 'None', value: 'None' },
    { label: 'daily', value: 'daily' },
    { label: 'weekly', value: 'weekly' },
    { label: 'monthly', value: 'monthly' },
    { label: 'yearly', value: 'yearly' },
  ]);

  useEffect(() => {
    setSelectedRepeat(value);
  }, [value]);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      zIndex={3000}
      zIndexInverse={1000}
      placeholder="None"
      style={{
        borderColor: '#ccc',
        borderRadius: 8,
      }}
      textStyle={{
        fontSize: 14,
        color: '#000',
      }}
      dropDownContainerStyle={{
        borderColor: '#ccc',
        backgroundColor: "white"
      }}
    />
  );
};
const DropDownLabel = ({ selectedLabel, setSelectedLabel }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(selectedLabel || null);
  const [items, setItems] = useState([
    { label: 'None', value: 'None' },
    { label: 'Tasks', value: 'Tasks' },
    { label: 'Shopping', value: 'Shopping' },
  ]);

  useEffect(() => {
    setSelectedLabel(value);
  }, [value]);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      zIndex={4000}
      zIndexInverse={1000}
      placeholder="None"
      style={{
        borderColor: '#ccc',
        borderRadius: 8,
      }}
      textStyle={{
        fontSize: 14,
        color: '#000',
      }}
      dropDownContainerStyle={{
        borderColor: '#ccc',
        elevation: 10,
        zIndex: 2000,
        position: "absolute",
        top: "100%"
      }}
    />
  );
};

const DatePickerField = ({ date, setDate }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [hasSelected, setHasSelected] = useState(false);
  const isWeb = Platform.OS == "web";

  useEffect(() => {
    if (date) {
      setHasSelected(true);
    }
  }, [date]);

  const handleChange = (event, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
      setHasSelected(true);
    }
    setShowPicker(false);
  };

  const handleWebChange = (e) => {
    const selectedDate = new Date(e.target.value);
    setDate(selectedDate);
    setHasSelected(true);
  };

  return (
    <View style={{ width: '100%', marginBottom: '10%' }}>
      <Text style={{ marginBottom: 6 }}>Date</Text>
      <View
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          paddingVertical: 12,
          paddingHorizontal: 16,
          justifyContent: 'space-between',
          height: 44,
          flexDirection: "row",

        }}
      >
        {isWeb ? (
          <TextInput
            style={{ flex: 1, color: '#000', fontSize: 14 }}
            type="date"
            value={date ? date.toISOString().split('T')[0] : ''}
            onChange={handleWebChange}
          />
        ) : (
          <>
            <Text style={{ color: hasSelected ? '#000' : '#999' }}>
              {hasSelected && date ? date.toLocaleDateString() : ''}
            </Text>
            <TouchableOpacity onPress={() => setShowPicker(prev => !prev)}>
              <CalendarDays size={20} color="black" />
            </TouchableOpacity>
          </>
        )}
      </View>
      {!isWeb && showPicker && (
        <View style={{ alignItems: "center", bottom: -43, left: 6, right: 12, position: "absolute" }}>
          <DateTimePicker
            mode="date"
            display="default"
            value={date || new Date()}
            onChange={handleChange}
          />
        </View>
      )}
    </View>
  );
};

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

  const getTodo = async () => {
    try {
      const todos = await getTodos();
      const todo = todos?.documents?.find(todo => todo.$id === id);
      if (!todo){
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
      //responsible: responsible || null, 
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
    <SafeAreaView style={styles.container_box}>
      <Text style={styles.heading}>Edit To Do</Text>
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
            <DropDownAssignee selectedPerson={selectedPerson} setSelectedPerson={setSelectedPerson} />
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
      <HStack style={styles.buttonsContainer}>
        <Button style={[styles.buttons, { backgroundColor: "grey" }]} onPress={cancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </Button>
        <Button style={[styles.buttons, { backgroundColor: "blue" }]} onPress={() => edit_todo(todoName, selectedPerson, date, selectedRepeat, selectedLabel)}>
          <Text style={styles.buttonText}>Save</Text>
        </Button>
      </HStack>
    </SafeAreaView>
  );
}
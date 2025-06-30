import { Badge, BadgeText, Box, Button, HStack, VStack } from "@gluestack-ui/themed";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import { Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { addTodo } from "../../../lib/appwrite/dbTodo"; //für db
import styles, { containerWidth } from "./styles";
import { router } from "expo-router";
import { CalendarDays } from "lucide-react-native"; // oder deine Icon-Bibliothek
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

const dataWH = [
  { key: "1", value: "täglich" },
  { key: "2", value: "wöchentlich" },
  { key: "3", value: "monatlich" },
  { key: "4", value: "jährlich" }
];

const DropDownResponsible = ({ selectedPerson, setSelectedPerson }) => {
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
      style={{ borderColor: '#ccc', borderRadius: 8 }}
      textStyle={{ fontSize: 14, color: '#000' }}
      dropDownContainerStyle={{ borderColor: '#ccc' }}
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
        elevation: 10,

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

  const handleChange = (event, date) => {
    if (date) {
      setDate(date);
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

export default function NewToDo() {
  const [selectedPerson, setSelectedPerson] = useState('');
  const [selectedRepeat, setSelectedRepeat] = useState('');
  const [selectedLabel, setSelectedLabel] = useState('');
  const [successMessage, setSuccessMessage] = useState("");
  const [todoName, setTodoName] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    if (Platform.OS !== 'ios') setShow(false);
    if (selectedDate) setDate(selectedDate);
  };

  const showDatepicker = () => setShow(true);
  const cancel = () => { console.log("Cancel"); router.back(); };
  const [errorMessage, setErrorMessage] = useState("");
  const saveNewTodo = (
    tile: string,
    responsible: string,
    date: string,
    regularity: string,
    tag: string
  ) => {
    if (!tile) {
      setErrorMessage("Please fill in the title")
      return;
    }
    setErrorMessage("");

    const newTodo = {
      name: tile,
      // Todo: responsible: (responsible ? responsible : null),
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
    <SafeAreaView style={styles.container_box}>
      <Text style={styles.heading}>Add new ToDo</Text>
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
            <DropDownResponsible selectedPerson={selectedPerson} setSelectedPerson={setSelectedPerson} />
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
      <HStack style={styles.buttonContainer}>
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
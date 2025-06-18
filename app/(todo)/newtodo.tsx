import { Box, Button, HStack, VStack } from "@gluestack-ui/themed";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import { CalendarDays } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import styles from "../(todo)/styles";
import { addTodo } from "../../lib/appwrite/dbTodo"; //für db
  
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


  const DropDownAssignee= ({ selectedPerson, setSelectedPerson }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(selectedPerson || null);
  const [items, setItems] = useState([
    { label: 'Keiner', value: 'Keiner' },
    { label: 'Bewohner 1', value: 'Bewohner 1' },
    { label: 'Bewohner 2', value: 'Bewohner 2' },
    { label: 'Bewohner 3', value: 'Bewohner 3' },
  ]);

  useEffect(() => {
    setSelectedPerson(value);
  }, [value]);

  return(
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
        backgroundColor:"white",
      }}
    />
  );
};

  const DropDownLabel= ({ selectedLabel, setSelectedLabel }) => {
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

  return(
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
        zIndex:2000,
        position:"absolute",
        top:"100%"
      }}
    />
  );
};
  const DropDownRepeat= ({ selectedRepeat, setSelectedRepeat }) => {
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

  return(
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
  const isWeb= Platform.OS =="web";

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
          flexDirection:"row",
          
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
        <View style={{alignItems:"center", bottom:-43, left:6, right: 12, position:"absolute"}}>
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
    const [todoName, setTodoName] = useState('');
    const [date, setDate] = useState<Date | null> (null);
    const [show, setShow] = useState(false);
  
    const onChange = (event, selectedDate) => {
      if (Platform.OS !== 'ios') setShow(false);
      if (selectedDate) setDate(selectedDate);
    };
  
    const showDatepicker = () => setShow(true);
    const cancel = () => {console.log("Abbrechen"); router.back();};
    const saveNewTodo = (
      tile: string,
      responsible: string, 
      date: string, 
      regularity: string
    ) => {
      if (!tile) {
        console.log("Please fill in the name of the ToDo"); // ToDo: Implement error handling
        return;
      }

      const newTodo = {
        name: tile,
        // Todo: responsible: (responsible ? responsible : null),
        date: (date ? date.toISOString() : null),
        regularity: (regularity ? regularity : null),
        done: false,
      }

      addTodo(newTodo)
      console.log("Speichern");
      router.back();
  
    }
    
    return (
      <SafeAreaView style={styles.container_box}>
        <Text style={styles.heading}>Add new ToDo</Text>
        <Box style={styles.box}>
          <VStack>
            <Text> Title </Text>
            <TextInput
              value={todoName}
              onChangeText={setTodoName}
              style={styles.textInput}
              placeholderTextColor="#000"
            />
            <View style={{marginBottom: "10%", zIndex:4000}}>
              <Text style={{marginBottom: "2%"}}>Assignee</Text>
              <DropDownAssignee selectedPerson={selectedPerson} setSelectedPerson={setSelectedPerson}/>
            </View> 
            <View style={{marginBottom: "10%", zIndex:3000, position:"relative"}}>
              <Text style={{marginBottom: "2%"}}>Repeat</Text>
              <DropDownRepeat selectedRepeat={selectedRepeat} setSelectedRepeat={setSelectedRepeat}/>
            </View>
            <View style={{marginBottom: "10%", zIndex:2000}}>
              <Text style={{marginBottom: "2%"}}>Label</Text>
              <DropDownLabel selectedLabel={selectedLabel} setSelectedLabel={setSelectedLabel}/>
            </View> 
            <DatePickerField date={date} setDate={setDate}/>
          </VStack>
        </Box>
        <HStack style={styles.buttonContainer}>
          <Button style={[styles.buttons, {backgroundColor: "grey"}]} onPress={cancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </Button>
          <Button style={[styles.buttons, {backgroundColor: "blue"}]} onPress={() => saveNewTodo(todoName, selectedPerson, date, selectedRepeat)}>
            <Text style={styles.buttonText}>Add</Text>
          </Button>
        </HStack>
      </SafeAreaView>
    );
  }
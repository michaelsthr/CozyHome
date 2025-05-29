import { Box, Button, HStack, VStack } from "@gluestack-ui/themed";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import { Dimensions, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { addTodo } from "../../lib/appwrite/dbTodo"; //für db

  
  const screenWidth = Dimensions.get("screen").width;
  const containerWidth = Math.min(screenWidth * 0.9, 400);  // max 400px, sonst 90% Breite
  
  const dataWH = [
    { key: "1", value: "täglich" },
    { key: "2", value: "wöchentlich" },
    { key: "3", value: "monatlich" },
    { key: "4", value: "jährlich" }
  ];

  const DropDownResponsible= ({ selected, setSelected }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(selected || null);
  const [items, setItems] = useState([
    { label: 'Bewohner 1', value: 'Bewohner 1' },
    { label: 'Bewohner 2', value: 'Bewohner 2' },
    { label: 'Bewohner 3', value: 'Bewohner 3' },
  ]);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  return(
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      placeholder="Verantwortlichen auswählen"
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
      }}
    />
  );
};

  const DropDownRoutine= ({ selected, setSelected }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(selected || null);
  const [items, setItems] = useState([
    { label: 'täglich', value: 'täglich' },
    { label: 'wöchentlich', value: 'wöchentlich' },
    { label: 'monatlich', value: 'monatlich' },
    { label: 'jährlich', value: 'jährlich' },
  ]);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  return(
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      placeholder="Wiederholung"
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
      }}
    />
  );
};

const DatePickerField = ({ date, setDate }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [hasSelected, setHasSelected] = useState(false);

  const handleChange = (event, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
      setHasSelected(true);
    }
    setShowPicker(false);
  };

  return (
    <View style={{ width: '100%', marginBottom: '15%' }}>
      <Text style={{ marginBottom: 6 }}>Datum</Text>
      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          paddingVertical: 12,
          paddingHorizontal: 16,
          justifyContent: 'center',
          height: 44
        }}
      >
        <Text style={{ color: hasSelected ? '#000' : '#999' }}>
          {hasSelected ? date.toLocaleDateString() : ''}
          {/* <Icon as ={CalendarDaysIcon}/> */}
        </Text>
      </TouchableOpacity>
        {showPicker && (
          <View style={{alignItems:"center"}}>
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
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
  
    const onChange = (event, selectedDate) => {
      if (Platform.OS !== 'ios') setShow(false);
      if (selectedDate) setDate(selectedDate);
    };
  
    const showDatepicker = () => setShow(true);
    const cancel = () => console.log("Abbrechen");
    const save = () => console.log("Speichern");
    
    return (
      <SafeAreaView style={styles.container}>
          <Text style={styles.heading}>Neues To Do erstellen</Text>
        <Box style={styles.box}>
          <VStack>
            <Text> Name des ToDos </Text>
          <TextInput
            style={styles.textInput}
            placeholderTextColor="#000"
          />
          <View style={{marginBottom: "15%"}}>
          <DropDownResponsible selected={selectedPerson} setSelected={setSelectedPerson}/>
          </View> 
          <DatePickerField date={date} setDate={setDate}/>
           <View style={{marginBottom: "15%"}}>
          <DropDownRoutine selected={selectedPerson} setSelected={setSelectedPerson}/>
          </View> 
          </VStack>
        </Box>
        <HStack style={styles.buttonContainer}>
                 <Button style={styles.buttons} onPress={cancel}>
                   <Text style={styles.buttonText}>Abbrechen</Text>
                 </Button>
                 <Button style={styles.buttons} onPress={save}>
                   <Text style={styles.buttonText}>Speichern</Text>
                 </Button>
               </HStack>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      alignItems: "center",
      paddingVertical: 20,
    },
    box: {
      width: containerWidth,
      backgroundColor: "#fff",
      borderRadius: 12,
      padding: 16,
      marginBottom: "15%",
      
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 3 },
      elevation: 3, 
      marginTop:"10%"
    },
    heading: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 12,
      textAlign: "center",
    },
    textInput: {
      width: "100%",
      height: 44,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      paddingHorizontal: 12,
      marginBottom: "15%",
      marginTop: "2%",
      fontSize: 14,
      color: "#000",
    },
    selectBox: {
      width: "100%",
      borderRadius: 8,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: "#ccc",
    },
    dropdown: {
      maxHeight: "45%",
    },
    dateArea: {
      height: 50,
      width: "100%",
      paddingHorizontal: 10,
      justifyContent: "center",
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 12,
      marginBottom: "15%"
    },
    dateText: {
      color:"#000",
      fontSize:14
    },
    datePicker: {
      width: "100%",
    },
    buttonRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
    },
    button: {
      flex: 1,
      maxWidth: 160,
      marginHorizontal: 8,
      borderRadius: 8,
      paddingVertical: 12,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginBottom: "10%",
      marginTop:"auto",
      paddingHorizontal: 16,
      width: containerWidth
    },
    buttons: {                    
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginBottom: "3%",
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "center", 
    backgroundColor: "blue"
    },
    buttonText: {
      color: "white",
      fontSize: 14,
      fontWeight: "bold"
    },
  });
  
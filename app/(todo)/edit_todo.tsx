import { Box, Button, HStack, VStack } from "@gluestack-ui/themed";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import { CalendarDays } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Dimensions, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const screenWidth = Dimensions.get("screen").width;
const containerWidth = Math.min(screenWidth * 0.9, 400);  // max 400px, sonst 90% Breite
 

const DropDownResponsible= ({ selected, setSelected }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(selected || null);
  const [items, setItems] = useState([
    { label: 'None', value: 'None' },
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
        backgroundColor:"white",
      }}
    />
  );
};

  const DropDownRoutine= ({ selected, setSelected }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(selected || null);
  const [items, setItems] = useState([
    { label: 'None', value: 'None' },
    { label: 'daily', value: 'daily' },
    { label: 'weekly', value: 'weekly' },
    { label: 'monthly', value: 'monthly' },
    { label: 'yearly', value: 'yearly' },
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
        backgroundColor:"white"
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
    <View style={{ width: '100%', marginBottom: '15%' }}>
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

  export default function edit_ToDo() {
    const [selectedPerson, setSelectedPerson] = useState('');
    const [selectedRepeat, setSelectedRepeat] = useState('');
    const [todoName, setTodoName] = useState('');
    const [date, setDate] = useState<Date | null> (null);
    const [show, setShow] = useState(false);
  
    const onChange = (event, selectedDate) => {
      if (Platform.OS !== 'ios') setShow(false);
      if (selectedDate) setDate(selectedDate);
    };
  
    const showDatepicker = () => setShow(true);
    const cancel = () => {console.log("Abbrechen"); router.back();};
    const edit_todo= () => console.log("Todo bearbeitet");
  
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.heading}>Edit ToDo</Text>
        <Box style={styles.box}>
          <VStack>
            <Text> Title </Text>
            <TextInput
              value={todoName}
              onChangeText={setTodoName}
              style={styles.textInput}
              placeholderTextColor="#000"
            />
            <View style={{marginBottom: "15%", zIndex:3000}}>
              <Text style={{marginBottom: "2%"}}>Assignee</Text>
              <DropDownResponsible selected={selectedPerson} setSelected={setSelectedPerson}/>
            </View> 
            <DatePickerField date={date} setDate={setDate}/>
            <View style={{marginBottom: "15%"}}>
              <Text style={{marginBottom: "2%"}}>Repeat</Text>
              <DropDownRoutine selected={selectedPerson} setSelected={setSelectedPerson}/>
            </View> 
          </VStack>
        </Box>
        <HStack style={styles.buttonContainer}>
          <Button style={[styles.buttons, {backgroundColor: "grey"}]} onPress={cancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </Button>
          <Button style={[styles.buttons, {backgroundColor:"blue"}]} onPress={edit_todo}>
            <Text style={styles.buttonText}>Save</Text>
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
      marginTop:"10%",
      zIndex: 1000,
      position: "relative"
    },
    heading: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: "5%",
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
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: "10%",
      marginTop:"auto",
      width: containerWidth,
      gap: "25%"
    },
    buttons: {   
      flex: 1,                 
      paddingVertical: "1%",
      paddingHorizontal: "8%",
      marginBottom: "3%",
      borderRadius: 10,
      alignItems: "center", 
    },
    buttonText: {
      color: "white",
      fontSize: 14,
      fontWeight: "bold"
    },
  });
  


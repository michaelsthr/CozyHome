import { CalendarDays } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Platform, TextInput, TouchableOpacity, View, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from '@react-native-community/datetimepicker';

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

const DropDownResponsible = ({ selectedPerson, setSelectedPerson, members }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(selectedPerson || null);
  const [items, setItems] = useState([
    { label: 'None', value: 'None' },
  ]);

  useEffect(() => {
    if (members && members.length > 0) {
      const newItems = members.map(member => ({
        label: member.username,
        value: member.username,
      }));
      setItems([{ label: 'None', value: 'None' }, ...newItems]);
    }
  }, [members]);

  useEffect(() => {
    setSelectedPerson(value);
  }, [value]);

  return (
    <DropDownPicker
      open={open}
      value={selectedPerson}
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
      value={selectedLabel}
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
      value={selectedRepeat}
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

export {
  DropDownResponsible,
  DropDownLabel,
  DropDownRepeat,
  DatePickerField,
};
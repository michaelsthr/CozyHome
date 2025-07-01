import { config } from "@gluestack-ui/config";
import { Button, GluestackUIProvider, HStack } from "@gluestack-ui/themed";
import { useIsFocused } from '@react-navigation/native';
import { useRouter } from "expo-router";
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Checkbox, Menu } from 'react-native-paper';

interface ToDoItemProps {
  title: string;
  date: string;
  responsible: string;
  isChecked: boolean;
  routine?: string;
}

const ToDoItem = ({ title, date, responsible, isChecked, routine }: ToDoItemProps) => (
  <Box style={styles.todoItem}>
    <VStack space="sm">
      <HStack style={styles.titleRow}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.titleText}>{title}</Text>
        <Badge style={styles.badge}>
          <Text style={styles.badgeText}>{responsible}</Text>
        </Badge>
      </HStack>
      <HStack style={styles.checkboxRow}>
        <Checkbox status={isChecked ? "checked" : "unchecked"}>
        </Checkbox>
      </HStack>
      <HStack style={styles.dateRow}>
        <Text style={styles.dateText}>{date}</Text>
        {routine ? (
          <HStack style={styles.routineContainer}>
            <RepeatIcon style={styles.icon} />
            <Text style={styles.routineText}>{routine}</Text>
          </HStack>
        ) : null}
      </HStack>
    </VStack>
  </Box>
);

interface DropDownProps {
  selected: string;
  setSelected: (value: string) => void;
}

const DropDown = ({ selected, setSelected }: DropDownProps) => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleSelect = (value: string) => {
    setSelected(value);
    closeMenu();
  };
  return(
    <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Button onPress={openMenu} style={{ width: "70%" }}>  
            {selected || 'Auswählen'}
            {visible ? (
              <View style={{ justifyContent: 'center', marginTop:20 }}>
              <ChevronUpIcon size="md"/> 
              </View>) :
              (
              <View style={{ justifyContent: 'center', marginTop:20 }}>
              <ChevronDownIcon size="md"/> 
              </View> )
            }
          </Button>

          }
        >
          <Menu.Item onPress={() => handleSelect('Bewohner 1')} title="Bewohner 1" />
          <Menu.Item onPress={() => handleSelect('Bewohner 2')} title="Bewohner 2" />
          <Menu.Item onPress={() => handleSelect('Bewohner 3')} title="Bewohner 3" />
        </Menu>
  )
}



export default function Todo() {
  const router = useRouter();
  const newToDo = () => router.push("/(todo)/newtodo");
  const edit = () => router.push("/(todo)/edit");
  return (
    <GluestackUIProvider config={config}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.heading}>To Do Liste</Text>
        <HStack style={styles.buttonContainer}>
          <Button style={styles.button} onPress={newToDo}>
            <Text style={styles.buttonText}>Neues ToDo</Text>
          </Button>
          <Button style={styles.button} onPress={edit}>
            <Text style={styles.buttonText}>Bearbeiten</Text>
          </Button>
        </HStack>
        <View style={{ marginBottom: 5, width: screenWidth }}>
          <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        </View>
        <View style={{ height: screenHeight / 1.5 }}>
          <ScrollView contentContainerStyle={{ paddingBottom: 120 }} >
            {filteredTodos?.map((item, index) => (
              <ToDoItem
                key={index}
                id={item.$id}
                title={item.name}
                date={item.date ? formatDate(item.date) : null}
                routine={item.regularity ? item.regularity : null}
                isChecked={item.done}
                changeToDoStatus={changeToDoStatus}
                tag={item.tag ? item.tag : null}
              />
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </GluestackUIProvider>
  );
}


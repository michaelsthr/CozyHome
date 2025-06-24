import { config } from "@gluestack-ui/config";
import { Badge, Box, Button, ChevronDownIcon, ChevronUpIcon, GluestackUIProvider, HStack, RepeatIcon, VStack } from "@gluestack-ui/themed";
import { useIsFocused } from '@react-navigation/native';
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Checkbox, Menu } from 'react-native-paper';
import { getTodos, updateTodo } from "../../lib/appwrite/dbTodo"; //für db

const screenHeight = Dimensions.get('window').height;

interface ToDoItemProps {
  key: string;
  id: string;
  title: string;
  date?: string;
  isChecked: boolean;
  routine?: string;
  responsible?: string;
  changeToDoStatus: (id: string, currentStatus: boolean) => void;
}

const ToDoItem = ({
  id,
  title,
  date,
  isChecked,
  routine,
  responsible,
  changeToDoStatus,
}: ToDoItemProps) => 
  <Box style={styles.todoItem}>
    <VStack space="xs">
      <HStack style={styles.titleRow}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.titleText}>{title}</Text>
        {responsible ? (
          <Badge style={styles.badge}>
            <Text style={styles.badgeText}>{responsible}</Text>
          </Badge>
        ) : null} 
      </HStack>
      <HStack style={styles.checkboxRow}>
        <VStack alignItems="center">
          <View style={{borderWidth: 2, borderColor:'#ccc',borderRadius: 1, marginRight: "8%", transform:[{ scale: 0.7 }]}}>
            <Checkbox status={isChecked ? 'checked' : 'unchecked'}
                onPress={() => changeToDoStatus(id, isChecked)}
                color="blue">
            </Checkbox>
          </View>
          {isChecked && (
            <Text style={{ opacity: isChecked ? 1 : 0 }}>Bewohner1</Text>
          )}
        </VStack>
      </HStack>
      <HStack style={styles.dateRow}>
        {date ? (
          <Text style={styles.dateText}>{date}</Text>
        ) : null}
        {routine ? (
          <HStack style={styles.routineContainer}>
            <RepeatIcon style={styles.icon} />
            <Text style={styles.routineText}>{routine}</Text>
          </HStack>
        ) : null}
      </HStack>
    </VStack>
  </Box>
;

const DropDown= ({ selected, setSelected }) => {
  const [visible, setVisible] = useState(false);
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
        <Button mode="outlined" onPress={openMenu}  contentStyle={{ flexDirection: 'row', justifyContent: 'space-between',  alignItems: 'center'}} style={{ width: "70%" }}>  
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
  const [todos, setTodos] = useState<{ total: number; documents: any[] }>({
    total: 0,
    documents: [],
  });
  const [loading, setLoading] = useState(true);
  const newToDo = () => router.push("../(todo)/newtodo");
  const edit = () => router.push("../(todo)/edit")

  const fetchTodos = async () => {
    try {
      const todos = await getTodos();
      console.log("Todos:", todos);
      setTodos(todos);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching todo contents:", err);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchTodos();
      console.log("Screen is focused – Daten neu geladen");
    }
  }, [isFocused]);

  const changeToDoStatus = (id: string, done: boolean) => {
    if (!todos) return; // Ensure todos is not null

    const updatedTodos = todos?.documents?.map((todo: ToDoItemProps) => {
      if (todo.id == id || todo.$id == id) {
        return { ...todo, done: !done };  
      }
      return todo;
    });
    setTodos({ ...todos, documents: updatedTodos});

    updateTodo(
      {
        $id: id,
        done: !done
      }
    )
  };

  return (
    <GluestackUIProvider config={config}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.heading}>To Do List</Text>
        <HStack style={styles.buttonContainer}>
          <Button style={styles.button} onPress={newToDo}>
            <Text style={styles.buttonText}>New ToDo</Text>
          </Button>
          <Button style={styles.button} onPress={edit}>
            <Text style={styles.buttonText}>Edit ToDo</Text>
          </Button>
        </HStack>
        <View style={{ height: screenHeight / 1.5}}>
          <ScrollView>
            {todos?.documents?.map((item, index) => (
              <ToDoItem
                key={index}
                id={item.$id}
                title={item.name}
                date={item.date ? item.date : null}
                routine={item.regularity ? item.regularity : null}
                isChecked={item.done}
                changeToDoStatus={changeToDoStatus}
              />
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom:"5%"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: "5%",
    marginTop:"10%",
    paddingHorizontal: 16,
    gap:"25%"
  },
  button: {     
    flex:1,               
    paddingVertical: "1%",
    paddingHorizontal: "5%",
    marginBottom: "3%",
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "blue"
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold"
  },
  todoItem: {
    width: "100%",
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    backgroundColor: "#f9f9f9"
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    flexShrink: 1,
    marginRight: 8
  },
  badge: {
    backgroundColor: "#eee",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: "10%"
  },
  badgeText: {
    fontSize: 12
  },
  checkboxRow: {
    justifyContent: "flex-end",
    marginTop: 10,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10
  },
  dateText: {
    fontSize: 14,
    color: "#555"
  },
  routineContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "10%"
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 6
  },
  routineText: {
    fontSize: 12,
    color: "#555"
  }
});

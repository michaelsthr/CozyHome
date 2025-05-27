import { config } from "@gluestack-ui/config";
import { Badge, Box, Button, Checkbox, CheckboxIcon, CheckboxIndicator, GluestackUIProvider, HStack, RepeatIcon, VStack } from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import { use, useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import { Client, Databases, ID, Account } from "react-native-appwrite";
import { getTodos, updateTodo, addTodo } from "../../lib/appwrite/dbTodo"; //für db
import { Models } from 'appwrite';


const ToDoItem = ({ title, date, routine, done, changeToDoStatus }) => (
  <Box style={styles.todoItem}>
    <VStack space={2}>
      <HStack style={styles.titleRow}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.titleText}>{title}</Text>
      </HStack>
      <HStack style={styles.checkboxRow}>
        <Checkbox isChecked={done} onChange={() => changeToDoStatus(ID, done)} accessibilityLabel="Checkbox">
          <CheckboxIndicator mr="$2">
            <CheckboxIcon as={CheckboxIcon} />
          </CheckboxIndicator>
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



export default function Todo() {
  const router = useRouter();
  const [todos, setTodos] = useState<Models.DocumentList<any> | null>(null);
  const [loading, setLoading] = useState(true);
  const newToDo = () => router.push("/todo/newtodo");
  const edit = () => console.log("Bearbeiten");

  useEffect(() => {
    async function fetchTodos() {
      try {
        const todos = await getTodos();
        console.log("Todos:", todos);
        setTodos(todos);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching refrigerator contents:", err);
        setLoading(false);
      }
    }
    
    fetchContents();
  }, []);

  const changeToDoStatus = (id, done) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.$id === id) {
        return { ...todo, done: !done };  
      }
      return todo;
    });
    setTodos(updatedTodos);
    databases.updateDocument(
      '681cc676001b5505b333',
      '681cc690001e33dabf95',
      id,
      {
        done: !done
      },
      ['read("any")', 'write("any")']
    ).then((response) => {
      console.log("ToDo updated:", response);
    }).catch((error) => {
      console.log("Error updating ToDo:", error);
    });
  };

  /* databases.createDocument(
    '681cc676001b5505b333',
    '681cc690001e33dabf95',
  
    ID.unique(),
    // the follogwing blog hard codes values for the new todo
    {
      name: 'Test',
      date: new Date().toISOString(),
      done: false,
    },
    ['read("any")', 'write("any")'],
  ).then((response) => {
    console.log(response);
  }).catch((error) => {
    console.log(error);
  }
  ); */
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
        {todos.map((item) => (
          <ToDoItem
            key={item.$id}
            title={item.name}
            date={item.date ? item.date : null}
            routine={item.regularity ? item.regularity : null}
            done={item.done}
            changeToDoStatus={changeToDoStatus}
          />
        ))}
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
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: "5%",
    marginTop:"10%",
    paddingHorizontal: 16
  },
  button: {                    
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
  todoList: {
    paddingBottom: 100
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
    marginTop: 10
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

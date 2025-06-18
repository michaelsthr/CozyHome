import { config } from "@gluestack-ui/config";
import { Button, GluestackUIProvider, HStack } from "@gluestack-ui/themed";
import { useIsFocused } from '@react-navigation/native';
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles, { screenHeight, screenWidth } from "../(todo)/styles";
import ToDoItem, { ToDoItemProps } from "../../components/todo_item";
import { getTodos, updateTodo } from "../../lib/appwrite/dbTodo"; //für db


const tabs = ['All', 'Tasks', 'Shopping'];
const Tabs = () => {
  const [selectedTab, setSelectedTab] = useState('All');

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.tabsContainer}
    >
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          onPress={() => {
            console.log(`${tab} selected`);
            setSelectedTab(tab);
          } }
          style={[
            styles.tabItem,
            selectedTab === tab && styles.tabItemSelected,
          ]}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === tab && styles.tabTextSelected,
            ]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};





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
        <View style={{marginBottom:5, width: screenWidth}}>
          <Tabs/>
        </View>
        <View style={{ height: screenHeight / 1.5}}>
          <ScrollView contentContainerStyle={{ paddingBottom: 120 }} >
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


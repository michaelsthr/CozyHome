import { config } from "@gluestack-ui/config";
import { Badge, Box, Button, GluestackUIProvider, HStack, RepeatIcon, VStack } from "@gluestack-ui/themed";
import { useIsFocused } from '@react-navigation/native';
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Checkbox } from 'react-native-paper';
import styles from "../(todo)/styles";
import { getTodos, updateTodo } from "../../lib/appwrite/dbTodo"; //für db
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const containerWidth = Math.min(screenWidth * 0.95, 400);

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
                color="blue"
                uncheckedColor="#f9f9f9">
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


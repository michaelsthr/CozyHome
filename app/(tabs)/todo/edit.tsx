import { config } from "@gluestack-ui/config";
import { Badge, BadgeText, GluestackUIProvider } from "@gluestack-ui/themed";
import { useIsFocused } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Platform, SafeAreaView, ScrollView, Text, View } from "react-native";
import { EditToDoItem } from "../../../components/todo/todo_item";
import { deleteTodo, getTodos } from "../../../lib/appwrite/dbTodo"; //für db
import styles, { containerWidth, screenHeight } from "./styles";

const formatDate = (isoString: string) => {
  if (!isoString) return null;
  const date = new Date(isoString);
  return date.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export default function EditTodos() {
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();
  const [todos, setTodos] = useState<{ total: number; documents: any[] }>({
    total: 0,
    documents: [],
  });
  const [loading, setLoading] = useState(true);
  const [selectedTodoId, setSelectedTodoId] = useState<string | null>(null);
  const [selectedTodoTitle, setSelectedTodoTitle] = useState<string | null>(null);

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

  const handleDeletePress = (id: string, title: string) => {
    setSelectedTodoId(id);
    setSelectedTodoTitle(title);
    handleDeleteRequest(id, title);
  };
  const [successMessage, setSuccessMessage] = useState("");
  const handleDeleteRequest =(id: string, title:string) => {
    const confirmAndDelete = async () => {
      try {
        await deleteTodo(id);
        setSuccessMessage("To-Do deleted");
        await fetchTodos(); // Liste aktualisieren
        } catch (err) {
          console.error("Fehler beim Löschen:", err);
          setSuccessMessage("Fehler beim Löschen");
        } finally {
          setTimeout(() => setSuccessMessage(""), 9000);
        }
    };
    if (Platform.OS === 'web') {
            const confirmed = window.confirm(`Are you sure you want to delete "${title}"?`);
            if (confirmed) {
              confirmAndDelete();
            } 
          }else {
              Alert.alert (
                "Delete To Do",
                `Are you sure you want to delete "${title}" ?`,
                [
                  {
                    text: "Cancel",
                    style: "cancel"
                  },
                  {
                    text:"Delete",
                    style: "destructive",
                    onPress: () => confirmAndDelete()
                  }
                ],
              {cancelable:true}
            );
          }
  };
  return (
    <GluestackUIProvider config={config}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.heading}>Edit To Do</Text>
        {successMessage !== "" && (
          <View style={{ position: "absolute", alignItems: "center", zIndex: 2000, marginTop: "20%", width: containerWidth, alignSelf: "center" }}>
            <Badge style={styles.badgeSuccessMessage}><BadgeText style={styles.badgeSuccessMessageText}>{successMessage}</BadgeText></Badge>
          </View>
        )}
        <View style={{ flex: 1, marginTop: "10%" , height: screenHeight}}>
          <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
            {todos && todos.documents.length > 0 ? (
            todos?.documents?.slice().reverse().map((item, index) => (
              <EditToDoItem
                key={index}
                id={item.$id}
                title={item.name}
                date={formatDate(item.date) || null}
                routine={item.regularity || null}
                isChecked={item.done}
                onTrashPress={() => handleDeletePress(item.$id, item.name)}
                tag={item.tag || null}
                responsible={item.responsible || null}
              />
            ))
          ) : (
            <View style= {{flex: 1, justifyContent:"center", alignItems:"center", height: screenHeight}}>
              <Text style= {{textAlign:"center", fontSize:20, marginBottom: 320}}> No To Do's yet</Text>
            </View>
            )}
          </ScrollView>
        </View>
       
      </SafeAreaView>
    </GluestackUIProvider>
  );
}
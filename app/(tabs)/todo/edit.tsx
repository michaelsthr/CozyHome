import { config } from "@gluestack-ui/config";
import { Badge, BadgeText, Button, GluestackUIProvider, HStack } from "@gluestack-ui/themed";
import { useIsFocused } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Modal, SafeAreaView, ScrollView, Text, View } from "react-native";
import { EditToDoItem } from "../../../components/todo/todo_item";
import { deleteTodo, getTodos } from "../../../lib/appwrite/dbTodo"; //für db
import styles, { containerWidth } from "./styles";

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
    setModalVisible(true);
  };
  const [successMessage, setSuccessMessage] = useState("");

  return (
    <GluestackUIProvider config={config}>
      <SafeAreaView style={[styles.container, { backgroundColor: "white", flex: 1 }]}>
        <Text style={styles.heading}>Edit To Do</Text>
        {successMessage !== "" && (
          <View style={{ position: "absolute", alignItems: "center", zIndex: 2000, marginTop: "20%", width: containerWidth, alignSelf: "center" }}>
            <Badge style={styles.badgeSuccessMessage}><BadgeText style={styles.badgeSuccessMessageText}>{successMessage}</BadgeText></Badge>
          </View>
        )}
        <View style={{ flex: 1, marginTop: "10%" }}>
          <ScrollView>
            {todos && todos.documents.length > 0 ? (
              todos?.documents?.map((item, index) => (
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
              <Text style={{ textAlign: "center", fontSize: 20, marginTop: 300 }}> No To Dos yet</Text>
            )}
          </ScrollView>
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <SafeAreaView style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Delete this To Do?:</Text>
              <Text style={styles.modalText}>{selectedTodoTitle}</Text>
              <HStack style={styles.buttonContainer_edit}>
                <Button style={[styles.buttons, { backgroundColor: "grey" }]} onPress={() => setModalVisible(false)}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </Button>
                <Button
                  style={[styles.buttons, { backgroundColor: "blue" }]}
                  onPress={async () => {
                    if (selectedTodoId) {
                      try {
                        await deleteTodo(selectedTodoId); // DB löschen
                        setSuccessMessage("To-Do deleted");
                        await fetchTodos(); // Liste aktualisieren
                      } catch (err) {
                        console.error("Fehler beim Löschen:", err);
                        setSuccessMessage("Fehler beim Löschen");
                      }
                    }
                    setModalVisible(false);
                    setTimeout(() => setSuccessMessage(""), 9000);
                  }}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </Button>
              </HStack>
            </View>
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    </GluestackUIProvider>
  );
}
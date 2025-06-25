import { config } from "@gluestack-ui/config";
import { Badge, BadgeText, Box, Button, GluestackUIProvider, HStack, RepeatIcon, TrashIcon, VStack } from "@gluestack-ui/themed";
import { router, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Modal, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles, { containerWidth } from "../(todo)/styles";
import { getTodos, updateTodo, deleteTodo } from "../../lib/appwrite/dbTodo"; //für db
import { EditToDoItem, ToDoItemProps } from "../../components/todo_item";

const ToDoItem = ({ title, date, responsible, isChecked, routine, onTrashPress }) => (
  <Box style={styles.todoItem}>
    <VStack space="xs">
      <TouchableOpacity onPress={() => router.push("../(todo)/edit_todo")}>
        <HStack style={styles.titleRow}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.titleText}>{title}</Text>
          <Badge style={styles.badge}>
            <Text style={styles.badgeText}>{responsible}</Text>
          </Badge>
        </HStack>
        <HStack style={styles.IconRow}>
          <TouchableOpacity onPress={onTrashPress} style={{ marginRight: "8%" }}>
            <TrashIcon size="lg" />
          </TouchableOpacity>
        </HStack>
        <HStack style={styles.dateRow}>
          <Text style={styles.dateText}>{date}</Text>
          {routine ? (
            <HStack style={styles.routineContainer}>
              <RepeatIcon />
              <Text style={styles.routineText}>{routine}</Text>
            </HStack>
          ) : null}
        </HStack>
      </TouchableOpacity>
    </VStack>
  </Box>
);

export default function Edit() {
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();
  const [todos, setTodos] = useState<{ total: number; documents: any[] }>({
    total: 0,
    documents: [],
  });
  const [loading, setLoading] = useState(true);
  const [selectedTodoId, setSelectedTodoId] = useState<string | null>(null);

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

  const handleDeletePress = (id: string) => {
    setSelectedTodoId(id);
    setModalVisible(true);
  };
  const [successMessage, setSuccessMessage] = useState("");

  return (
    <GluestackUIProvider config={config}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.heading}>Edit ToDo</Text>
        {successMessage !== "" && (
          <View style={{ position: "absolute", alignItems: "center", zIndex: 2000, marginTop: "20%", width: containerWidth, alignSelf: "center" }}>
            <Badge style={styles.badgeSuccessMessage}><BadgeText style={styles.badgeSuccessMessageText}>{successMessage}</BadgeText></Badge>
          </View>
        )}
        <View style={{ flex: 1, marginTop: "10%" }}>
          <ScrollView>
            {todos?.documents?.map((item, index) => (
              <EditToDoItem
                key={index}
                id={item.$id}
                title={item.name}
                date={item.date ? item.date : null}
                routine={item.regularity ? item.regularity : null}
                isChecked={item.done}
                onTrashPress={() => handleDeletePress(item.$id)}
              />
            ))}
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
              <Text style={styles.modalText}>Delete this ToDo?:</Text>
              <Text style={styles.modalText}>title</Text>
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
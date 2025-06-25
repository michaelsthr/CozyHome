import { config } from "@gluestack-ui/config";
import { Badge, Box, Button, GluestackUIProvider, HStack, RepeatIcon, TrashIcon, VStack } from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ToDoItem = ({ title, date, responsible, isChecked, routine, onTrashPress }) => (
  <Box style={styles.todoItem}>
    <VStack space={2}>
      <HStack style={styles.titleRow}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.titleText}>{title}</Text>
        <Badge style={styles.badge}>
          <Text style={styles.badgeText}>{responsible}</Text>
        </Badge>
      </HStack>
      <HStack style={styles.IconRow}>
        <TouchableOpacity onPress={onTrashPress}>
          <TrashIcon size="md" />
        </TouchableOpacity>
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

export default function EditTodo() {
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const handleDeletePress = () => {
    setModalVisible(true);
  };

  return (
    <GluestackUIProvider config={config}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.heading}>Bearbeiten</Text>

        <ScrollView contentContainerStyle={styles.todoList}>
          <ToDoItem
            title="ToDo1"
            date="21.05.2025"
            responsible="Bewohner1"
            isChecked={true}
            routine="täglich"
            onTrashPress={handleDeletePress}
          />
          <ToDoItem
            title="ToDo2"
            date="21.05.2025"
            responsible="Bewohner2"
            isChecked={false}
            routine=""
            onTrashPress={handleDeletePress}
          />
        </ScrollView>

        {/* Popup Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <SafeAreaView style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Wollen Sie dieses To Do löschen?: title </Text>
              <HStack style={styles.buttonContainer}>
              <Button onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Abbrechen</Text>
              </Button>
              <Button onPress={() => {
                console.log("ToDo gelöscht");
                setModalVisible(false);
              }}>
                <Text style={styles.buttonText}>Löschen</Text>
              </Button>
              </HStack>
            </View>
          </SafeAreaView>
        </Modal>
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
    marginBottom:"8%"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: "5%",
    marginTop:"10%",
    paddingHorizontal: "2%"
  },
  button: {                    
    paddingVertical: "1%",
    paddingHorizontal: "5%",
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
  IconRow: {
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
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center"
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center"
  }
});
import { config } from "@gluestack-ui/config";
import { Badge, Box, Button, GluestackUIProvider, HStack, RepeatIcon, TrashIcon, VStack } from "@gluestack-ui/themed";
import { router, useRouter } from "expo-router";
import React, { useState } from "react";
import { Dimensions, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const screenWidth = Dimensions.get("screen").width;


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
          <TouchableOpacity onPress={onTrashPress} style={{marginRight:"8%"}}>
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

  const handleDeletePress = () => {
    setModalVisible(true);
  };

  return (
    <GluestackUIProvider config={config}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.heading}>Edit ToDo</Text>
        <View style={{ flex: 1}}>
          <ScrollView>
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
        </View>

        {/* Popup Modal */}
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
              <HStack style={styles.buttonContainer}>
                <Button style={[styles.buttons,{backgroundColor: "grey"}]} onPress={() => setModalVisible(false)}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </Button>
                <Button style={[styles.buttons,{backgroundColor: "blue"}]} onPress={() => {
                  console.log("ToDo gelöscht");
                  setModalVisible(false);
                }}>
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
    marginBottom:"15%"
  },
  buttonContainer: {
    flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: "3%",
      marginTop:"10%",
      gap:"25%",
  },
  buttons: {      
      flex:1,            
      paddingVertical: "1%",
      paddingHorizontal: "8%",
      marginBottom: "3%",
      borderRadius: 10,
      alignItems: "center", 
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
    marginBottom: "2%",
    textAlign: "center"
  }
});
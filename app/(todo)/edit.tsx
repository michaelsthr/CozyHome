import { config } from "@gluestack-ui/config";
import { Badge, BadgeText, Box, Button, GluestackUIProvider, HStack, RepeatIcon, TrashIcon, VStack } from "@gluestack-ui/themed";
import { router, useRouter } from "expo-router";
import React, { useState } from "react";
import { Modal, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles, { containerWidth } from "../(todo)/styles";

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
  const [successMessage, setSuccessMessage] = useState("");

  return (
    <GluestackUIProvider config={config}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.heading}>Edit ToDo</Text>
        {successMessage !== "" && (
          <View style={{position:"absolute", alignItems:"center", zIndex: 2000, marginTop:"20%", width: containerWidth, alignSelf:"center"}}>
          <Badge style={styles.badgeSuccessMessage}><BadgeText style={styles.badgeSuccessMessageText}>{successMessage}</BadgeText></Badge>
          </View>
        )}
        <View style={{ flex: 1, marginTop:"10%"}}>
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
                <Button style={[styles.buttons,{backgroundColor: "grey"}]} onPress={() => setModalVisible(false)}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </Button>
                <Button style={[styles.buttons,{backgroundColor: "blue"}]} onPress={() => {
                  {setModalVisible(false); setSuccessMessage("To-Do deleted"); setTimeout(() => setSuccessMessage(""), 9000);}}
                }>
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
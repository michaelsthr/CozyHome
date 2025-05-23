import { config } from "@gluestack-ui/config";
import { Badge, Box, Button, Checkbox, CheckboxIcon, CheckboxIndicator, GluestackUIProvider, HStack, RepeatIcon, VStack } from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";

const ToDoItem = ({ title, date, responsible, isChecked, routine }) => (
  <Box style={styles.todoItem}>
    <VStack space={2}>
      <HStack style={styles.titleRow}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.titleText}>{title}</Text>
        <Badge style={styles.badge}>
          <Text style={styles.badgeText}>{responsible}</Text>
        </Badge>
      </HStack>
      <HStack style={styles.checkboxRow}>
        <Checkbox value="title" isChecked={isChecked}>
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
  const newToDo = () => router.push("todo/newtodo");
  const edit = () => console.log("Bearbeiten");
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
        <ScrollView contentContainerStyle={styles.todoList}>
          <ToDoItem title="ToDo1" date="21.05.2025" responsible="Bewohner1" isChecked={true} routine="täglich" />
          <ToDoItem title="ToDo2" date="21.05.2025" responsible="Bewohner2" isChecked={false} routine="" />
        </ScrollView>
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

import { Badge, Box, HStack, RepeatIcon, VStack } from "@gluestack-ui/themed";
import React from "react";
import { Text, View } from "react-native";
import { Checkbox } from 'react-native-paper';
import styles from "../app/(todo)/styles";

export interface ToDoItemProps {
  key: string;
  id: string;
  title: string;
  date?: string;
  isChecked: boolean;
  routine?: string;
  responsible?: string;
  changeToDoStatus: (id: string, currentStatus: boolean) => void;
}

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
export default ToDoItem;
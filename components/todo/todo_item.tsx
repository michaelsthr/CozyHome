import { Badge, BadgeText, Box, HStack, RepeatIcon, TrashIcon, VStack } from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Checkbox } from 'react-native-paper';
import styles from "../../app/(tabs)/todo/styles";

export interface ToDoItemProps {
  key: string;
  id: string;
  title: string;
  date?: string;
  isChecked: boolean;
  routine?: string;
  responsible?: string;
  tag?: string;
  doneBy?: string
  changeToDoStatus: (id: string, currentStatus: boolean) => void;
  onTrashPress: () => void;
}

export const ToDoItem = ({
  id,
  title,
  date,
  isChecked,
  routine,
  responsible,
  changeToDoStatus,
  tag = null,
  doneBy = null,
}: ToDoItemProps) =>
  <Box style={styles.todoItem}>
    <VStack space="xs">
      <HStack style={styles.titleRow}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.titleText}>{title}</Text>
        {responsible ? (
          <Badge style={styles.badge}>
            <BadgeText style={styles.badgeText}>{responsible}</BadgeText>
          </Badge>
        ) : null}
        {tag ? (
          <Badge style={styles.badge}>
            <BadgeText style={styles.badgeText}>{tag}</BadgeText>
          </Badge>
        ) : null}
      </HStack>
      <HStack style={styles.checkboxRow}>
        <VStack alignItems="center">
          <View style={{ borderWidth: 2, borderColor: '#ccc', borderRadius: 1, marginRight: "8%", transform: [{ scale: 0.7 }] }}>
            <Checkbox
              status={isChecked ? 'checked' : 'unchecked'}
              onPress={() => changeToDoStatus(id, isChecked)}
              color="blue"
              uncheckedColor="#f9f9f9"
            />
          </View>
          {isChecked && (
            <Text style={{ opacity: isChecked ? 1 : 0 }}>{doneBy}</Text>
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

export const EditToDoItem = ({
  id,
  title,
  date,
  responsible,
  isChecked,
  routine,
  onTrashPress,
  tag = null
}: ToDoItemProps) => {
  const router = useRouter();
  return (
    <Box style={styles.todoItem}>
      <VStack space="xs">
        <TouchableOpacity onPress={() => router.push(`/todo/edit_todo?id=${id}`)}>
          <HStack style={styles.titleRow}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.titleText}>{title}</Text>
            {responsible ? (
              <Badge style={styles.badge}>
                <Text style={styles.badgeText}>{responsible}</Text>
              </Badge>
            ) : null}
            {tag ? (
              <Badge style={styles.badge}>
                <Text style={styles.badgeText}>{tag}</Text>
              </Badge>
            ) : null}
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
  )
};
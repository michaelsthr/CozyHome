import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { router, useNavigation } from 'expo-router';
import { getGroups } from "../../lib/appwrite/dbGroup";
import { Group, useSession } from '@/lib/context/SessionContext';
import { updateUser } from '@/lib/appwrite/dbUser';


interface GroupProps {
  name: string;
  groupKey: string;
  type: string;
}

export default function EnterGroupKey() {
  const navigation = useNavigation();
  const [groupKey, setGroupKey] = useState('');
  const { user, setUser, group, setGroup } = useSession();


  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Enter Group Key',
    });
  }, [navigation]);

 const handleSubmit = async () => {
  const existingGroups = await getGroups();
  const foundGroup = (existingGroups.documents ?? []).find(
    (group: GroupProps) => group.groupKey.toUpperCase() === groupKey.trim().toUpperCase()
  );

  if (!foundGroup) {
    Alert.alert('Please enter a valid Group Key');
    return;
  }
  
  if (!user) {
    Alert.alert("No logged-in user found.");
    return;
  }

  setGroup(foundGroup);
  
  try {
    const updatedUser = await updateUser(user, foundGroup.$id);
    setUser(updatedUser);
    router.replace('/(tabs)');
  } catch {
    Alert.alert('Failed to update user group.');
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Please put in an existing Group Key:</Text>
      <TextInput
        style={styles.input}
        placeholder="Key"
        value={groupKey}
        onChangeText={setGroupKey}
        autoCapitalize="characters"
        autoCorrect={false}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Join</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
  },
  titleText: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    width: '90%',
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 20,
    fontSize: 18,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  button: {
    backgroundColor: '#007bff',
    width: '90%',
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Button } from 'react-native';
import { useNavigation, router } from 'expo-router';
import { addGroup, getGroups } from "../../lib/appwrite/dbGroup";
import { Group, useSession } from '@/lib/context/SessionContext';
import { updateUser } from '@/lib/appwrite/dbUser';

interface GroupProps {
    name: string;
    groupKey: string;
    type: string;
}

const generateUniqueGroupKey = async (): Promise<string> => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const generateKey = (): string => {
        let result = '';
        for (let i = 0; i < 4; i++) {
            result += letters.charAt(Math.floor(Math.random() * letters.length));
        }
        return result;
    };

    const existingGroups = await getGroups();
    const existingKeys = new Set((existingGroups.documents ?? []).map((group: GroupProps) => group.groupKey));

    let uniqueKey = generateKey();
    while (existingKeys.has(uniqueKey)) {
        uniqueKey = generateKey();
    }

    return uniqueKey;
};
export default function NewGroup() {
    const navigation = useNavigation();
    const [groupName, setGroupName] = useState('');
    const [groupType, setGroupType] = useState('');
    const [groupKey, setGroupKey] = useState('');
    const { user, setUser, group, setGroup } = useSession();

    useEffect(() => {
        const loadKey = async () => {
            const key = await generateUniqueGroupKey();
            setGroupKey(key);
        };
        loadKey();
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Create New Group',
        });
    }, [navigation]);

    const handleCreate = async () => {
        if (!groupName.trim() || !groupType.trim()) {
            Alert.alert('Please put in Name and Type.');
            return;
        }

        if (!user) {
            Alert.alert("No logged-in user found.");
            return;
        }

        const newGroup: GroupProps = {
            name: groupName,
            groupKey: groupKey,
            type: groupType,
        };

        try {
            const createdGroup = await addGroup(newGroup);

            const groupForContext: Group = {
                $id: createdGroup.$id,
                name: createdGroup.name,
                groupKey: createdGroup.groupKey,
                type: createdGroup.type,
            };
            setGroup(groupForContext);

            const updatedUser = await updateUser(user, createdGroup.$id);
            setUser(updatedUser);

            router.replace('/(tabs)');
        } catch (error) {
            console.error('Error while creating group or updating user:', error);
            Alert.alert('Failed to create group. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Button
                    title="← Back"
                    color="blue"
                    onPress={() => router.back()}
                  />
            <Text style={styles.titleText}>Create new group</Text>

            <TextInput
                style={styles.input}
                placeholder="Name"
                value={groupName}
                onChangeText={setGroupName}
                autoCapitalize="words"
            />

            <TextInput
                style={styles.input}
                placeholder="Type e.g.: Shared Appartment"
                value={groupType}
                onChangeText={setGroupType}
            />

            <Text style={styles.text}>
                Generated Key:    {groupKey}
            </Text>

            <TouchableOpacity style={styles.button} onPress={handleCreate}>
                <Text style={styles.buttonText}>Create</Text>
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
        marginBottom: 20,
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
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    text: {
        fontSize: 18,
        fontWeight: '600',
        margin: 15,
    }
});
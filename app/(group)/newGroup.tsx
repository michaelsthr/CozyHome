import { updateUserGroup } from "@/lib/appwrite/dbUser";
import { Group, useSession } from "@/lib/context/SessionContext";
import { buttonStyles } from "@/styles/button_styles";
import { fontStyles } from "@/styles/font_styles";
import { inputStyles } from "@/styles/input_styles";
import { router, useNavigation } from "expo-router";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
    Alert,
    Button,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { addGroup, getGroups } from "../../lib/appwrite/dbGroup";

interface GroupProps {
    name: string;
    groupKey: string;
    type: string;
}

const generateUniqueGroupKey = async (): Promise<string> => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const generateKey = (): string => {
        let result = "";
        for (let i = 0; i < 4; i++) {
            result += letters.charAt(Math.floor(Math.random() * letters.length));
        }
        return result;
    };

    const existingGroups = await getGroups();
    const existingKeys = new Set(
        (existingGroups.documents ?? []).map((group: GroupProps) => group.groupKey)
    );

    let uniqueKey = generateKey();
    while (existingKeys.has(uniqueKey)) {
        uniqueKey = generateKey();
    }

    return uniqueKey;
};
export default function NewGroup() {
    const navigation = useNavigation();
    const [groupName, setGroupName] = useState("");
    const [groupType, setGroupType] = useState("");
    const [groupKey, setGroupKey] = useState("");
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
            title: "Create New Group",
        });
    }, [navigation]);

    const handleCreate = async () => {
        if (!groupName.trim() || !groupType.trim()) {
            Alert.alert("Please put in Name and Type.");
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

            const updatedUser = await updateUserGroup(user.$id, createdGroup.$id);
            setUser(updatedUser);

            router.replace("/(tabs)");
        } catch (error) {
            console.error("Error while creating group or updating user:", error);
            Alert.alert("Failed to create group. Please try again.");
        }
    };

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1, paddingTop: 50}}>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps='handled'>
                    {/* Header */}
                    <View style={{ alignItems: "center" }}>
                        <Text
                            style={{
                                fontSize: 40,
                                fontWeight: "800",
                                color: "#7749f8",
                                letterSpacing: -1,
                                lineHeight: 40,
                                paddingTop: 10,
                            }}>
                            Create new group
                        </Text>
                        <Image
                            source={require("@/assets/images/new_group_page.png")}
                            style={{
                                width: 320,
                                height: 320,
                            }}
                            resizeMode='contain'
                        />
                    </View>
                    <View
                        style={{
                            width: "100%",
                            paddingHorizontal: 32,
                            flexDirection: "column",
                            gap: 15,
                            alignContent: "center",
                        }}>
                        <Text style={{ textAlign: "center" }}>Generated Key: {groupKey}</Text>
                        <TextInput
                            style={inputStyles.input}
                            placeholder='Name'
                            value={groupName}
                            onChangeText={setGroupName}
                            autoCapitalize='words'
                        />

                        <TextInput
                            style={inputStyles.input}
                            placeholder='Type e.g.: Shared Appartment'
                            value={groupType}
                            onChangeText={setGroupType}
                        />
                        <TouchableOpacity style={buttonStyles.button} onPress={handleCreate}>
                            <Text style={fontStyles.buttonText}>Create</Text>
                        </TouchableOpacity>
                        <Button title='Go Back' color='#7749f8' onPress={router.back} />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
        backgroundColor: "white",
    },
});

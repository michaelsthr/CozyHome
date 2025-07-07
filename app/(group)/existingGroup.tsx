import { updateUserGroup } from "@/lib/appwrite/dbUser";
import { User, useSession } from "@/lib/context/SessionContext";
import { buttonStyles } from "@/styles/button_styles";
import { fontStyles } from "@/styles/font_styles";
import { inputStyles } from "@/styles/input_styles";
import { KeyboardAvoidingView } from "@gluestack-ui/themed";
import { router, useNavigation } from "expo-router";
import React, { useLayoutEffect, useState } from "react";
import { Alert, Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getGroups } from "../../lib/appwrite/dbGroup";

interface GroupProps {
    name: string;
    groupKey: string;
    type: string;
}

export default function EnterGroupKey() {
    const navigation = useNavigation();
    const [groupKey, setGroupKey] = useState("");
    const { user, setUser, setGroup } = useSession();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Enter Group Key",
        });
    }, [navigation]);

    const handleSubmit = async () => {
        const existingGroups = await getGroups();
        const foundGroup = (existingGroups.documents ?? []).find(
            (group: GroupProps) => group.groupKey.toUpperCase() === groupKey.trim().toUpperCase()
        );

        if (!foundGroup) {
            Alert.alert("Please enter a valid Group Key");
            return;
        }

        if (!user) {
            Alert.alert("No logged-in user found.");
            return;
        }
        console.log(user);

        setGroup(foundGroup);

        try {
            const updatedUserDoc = await updateUserGroup(user.$id, foundGroup.$id);
            const updatedUser: User = {
                ...user,
                groupID: foundGroup.$id,
                ...updatedUserDoc,
            };
            setUser(updatedUser);
            router.replace("/(tabs)");
        } catch {
            Alert.alert("Failed to update user group.");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps='handled'>
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
                            Join your friends
                        </Text>
                        <Image
                            source={require("@/assets/images/existing_group_page.png")}
                            style={{
                                width: 320,
                                height: 320,
                            }}
                            resizeMode='contain'
                        />
                    </View>
                    <View style={{ width: "100%", paddingHorizontal: 32 }}>
                        <Text
                            style={[
                                fontStyles.lighter,
                                { paddingVertical: 20, textAlign: "center" },
                            ]}>
                            Please put in an existing Group Key:
                        </Text>
                        <TextInput
                            style={[
                                inputStyles.input,
                                {
                                    height: 56,
                                    fontSize: 16,
                                    shadowColor: "#000",
                                    shadowOffset: { width: 0, height: 1 },
                                    shadowOpacity: 0.05,
                                    shadowRadius: 3,
                                    elevation: 2,
                                    width: "100%",
                                    marginBottom: 32,
                                },
                            ]}
                            placeholder='Key'
                            value={groupKey}
                            onChangeText={setGroupKey}
                            autoCapitalize='characters'
                            autoCorrect={false}
                        />
                        <TouchableOpacity
                            style={[
                                buttonStyles.button,
                                {
                                    height: 56,
                                    width: "100%",
                                },
                            ]}
                            onPress={handleSubmit}>
                            <Text
                                style={[
                                    fontStyles.buttonText,
                                    { fontSize: 18, fontWeight: "600" },
                                ]}>
                                Join
                            </Text>
                        </TouchableOpacity>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "100%",
                                paddingTop: 20,
                            }}>
                            <TouchableOpacity onPress={() => router.back()}>
                                <Text style={{ color: "#7749f8", fontSize: 18 }}>Go Back</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
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

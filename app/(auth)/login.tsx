import { useSession } from "@/lib/context/SessionContext";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
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

import { checkUserValid, createNewUser, User } from "@/lib/appwrite/dbUser";
import { buttonStyles } from "@/styles/button_styles";
import { fontStyles } from "@/styles/font_styles";
import { inputStyles } from "@/styles/input_styles";
import * as Crypto from "expo-crypto";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Auth() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const { group, user, setUser, setGroup } = useSession();
    const router = useRouter();

    async function login(username: string, password: string) {
        try {
            const userDoc = await checkUserValid(username);

            const hashedInput = await Crypto.digestStringAsync(
                Crypto.CryptoDigestAlgorithm.SHA256,
                password
            );
            if (userDoc && hashedInput === userDoc.password) {
                const currentUser: User = {
                    username: userDoc.username,
                    password: userDoc.password,
                    groupID: userDoc.groupID,
                    $id: userDoc.$id,
                    $collectionId: userDoc.$collectionId,
                    $databaseId: userDoc.$databaseId,
                    $createdAt: userDoc.$createdAt,
                    $updatedAt: userDoc.$updatedAt,
                    $permissions: [],
                };
                setLoggedInUser(currentUser);
                setIsAuthenticated(true);

                const sessionUser = {
                    username: userDoc.username,
                    password: userDoc.password,
                    groupID: userDoc.groupID,
                    $id: userDoc.$id,
                };
                setUser(sessionUser);
                if (currentUser.groupID === null) {
                    router.push("/(group)");
                    return;
                }

                setGroup(currentUser.groupID);

                router.push("/(tabs)");
                console.log("LoggedInUser: ", currentUser);
            } else {
                alert("Username or password is incorrect. Please try again.");
            }
        } catch (error) {
            console.error("Login failed:", error);
            alert("Login failed.");
        }
    }

    async function register(username: string, password: string) {
        try {
            await createNewUser(username, password);
            await login(username, password);
        } catch (error) {
            console.error("Registration failed:", error);
            alert("Username already exists. Please choose another one.");
        }
    }

    async function logout() {
        setLoggedInUser(null);
        setIsAuthenticated(false);
        router.push("/(auth)/login");
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}>
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
                            }}>
                            Cozy Home
                        </Text>
                        <Image
                            source={require("@/assets/images/login_page.png")}
                            style={{
                                width: 320,
                                height: 320,
                            }}
                            resizeMode='contain'
                        />
                    </View>

                    {/* Inputs */}
                    <View
                        style={{
                            width: "100%",
                            paddingHorizontal: 32,
                            marginBottom: 20,
                        }}>
                        <View style={{ marginBottom: 10 }}>
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: "600",
                                    color: "#374151",
                                    marginBottom: 8,
                                    marginLeft: 4,
                                }}>
                                Username
                            </Text>
                            <TextInput
                                placeholder='Enter your username'
                                placeholderTextColor='#9ca3af'
                                autoCapitalize='none'
                                returnKeyType='done'
                                value={username}
                                onChangeText={setUsername}
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
                                    },
                                ]}
                            />
                        </View>

                        <View style={{ marginBottom: 32 }}>
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: "600",
                                    color: "#374151",
                                    marginBottom: 8,
                                    marginLeft: 4,
                                }}>
                                Password
                            </Text>
                            <TextInput
                                placeholder='Enter your password'
                                placeholderTextColor='#9ca3af'
                                autoCapitalize='none'
                                returnKeyType='done'
                                secureTextEntry={true}
                                value={password}
                                onChangeText={setPassword}
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
                                    },
                                ]}
                            />
                        </View>
                    </View>

                    {/* Buttons */}
                    <View style={{ width: "100%", paddingHorizontal: 32 }}>
                        <TouchableOpacity
                            style={[
                                buttonStyles.button,
                                {
                                    height: 56,
                                    marginBottom: 10,
                                },
                            ]}
                            onPress={() => login(username, password)}>
                            <Text
                                style={[
                                    fontStyles.buttonText,
                                    {
                                        fontSize: 18,
                                        fontWeight: "600",
                                    },
                                ]}>
                                Log in
                            </Text>
                        </TouchableOpacity>

                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: 8,
                            }}>
                            <Text style={fontStyles.lighter}>Don't have an account?</Text>
                            <TouchableOpacity
                                onPress={() => register(username, password)}
                                style={{
                                    paddingVertical: 8,
                                    paddingHorizontal: 12,
                                }}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: "#7749f8",
                                        fontWeight: "600",
                                    }}>
                                    Register
                                </Text>
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

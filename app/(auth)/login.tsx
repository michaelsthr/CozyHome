import React, { useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

import CozyInput from '@/components/cozy_input';
import { createNewUser, checkUserValid, User } from '@/lib/appwrite/dbUser';
import {any} from "zod";
import * as Crypto from "expo-crypto";

export default function Auth() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const router = useRouter();

  async function login(username: string, password: string) {
    try {
      const userDoc = await checkUserValid(username);

      const hashedInput = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );
      if (userDoc && (hashedInput === userDoc.password)) {
        const user: User = {
          username: userDoc.username,
          password: userDoc.password,
          groupID: "",
        };
        setLoggedInUser(user);
        setIsAuthenticated(true);
        router.push("/(tabs)");
      } else {
        alert("Benutzername oder Passwort ist falsch.");
      }
    } catch (error) {
      console.error("Login fehlgeschlagen:", error);
      alert("Login fehlgeschlagen.");
    }
  }

  async function register(username: string, password: string) {
    try {
      await createNewUser(username, password);
      alert("Registrierung erfolgreich");
      await login(username, password);
    } catch (error) {
      console.error("Registrierung fehlgeschlagen:", error);
      alert("Registrierung fehlgeschlagen.");
    }
  }

  async function logout() {
    setLoggedInUser(null);
    setIsAuthenticated(false);
    router.push("/(auth)/login");
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <CozyInput
        placeholder="Username"
        placeholderTextColor="black"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
      />

      <CozyInput
        placeholder="Passwort"
        placeholderTextColor="black"
        autoCapitalize="none"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <Button
        title="Login"
        onPress={() => login(username, password)}
      />

      <Button
        title="Registrieren"
        onPress={() => register(username, password)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
});

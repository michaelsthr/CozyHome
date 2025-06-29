import React, { useState } from 'react';
import {Client, Account, ID, Models, Query} from 'react-native-appwrite';
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, Button} from 'react-native';
import {Redirect, router, useRouter} from "expo-router";
import CozyInput from "@/components/cozy_input";
import {createNewUser, checkUserValid, User} from "@/lib/appwrite/dbUser";
import bcrypt from "bcryptjs";

const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('681cc5b8000a49689753')
    .setPlatform('com.rubberduck.cozyhome');


const account = new Account(client);


export default function Auth() {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [password, setPassword] = useState('');
    const [username, setName] = useState('');
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const router = useRouter();

    
    async function login(username: string, password: string) {
      try {
        const user = await checkUserValid(username);
        if (user && await bcrypt.compare(password, user.password)) {
            setLoggedInUser(loggedInUser);
            setIsAuthenticated(true);
            router.push("/(tabs)/calendar");
        }
        else {
            alert("Benutzername oder Passwort ist falsch.");
        }
      } catch (error) {
        console.error("Login fehlgeschlagen:", error);
        alert("Login fehlgeschlagen.");
      }
    }


    async function register(password: string, username: string) {
      try {
        await createNewUser({password, username});
        // Nach erfolgreicher Registrierung automatisch einloggen
        console.log("Registrierung erfolgreich");
        await login(username, password);
      } catch (error) {
        console.error("Registrierung fehlgeschlagen:", error);
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
            <CozyInput placeholder='Username'
                     placeholderTextColor={"black"}
                     value={username}
                     onChangeText={(text) => setName(text)}
          />
            <CozyInput
              placeholder='Passwort'
              placeholderTextColor="black"
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry={true}
    />
            <Button
                title='Login'
                onPress={async () => {
                    await login(username, password);
            }}
          />
            <Button
                title='Registrieren'
                onPress={async () => {
                    await register(password, username);
            }}
          />
          </View>
        );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
   borderRadius: 10,
  },
});
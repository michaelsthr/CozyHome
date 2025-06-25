import React, { useState } from 'react';
import { Client, Account, ID, Models } from 'react-native-appwrite';   
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, Button} from 'react-native';
import { Redirect } from "expo-router";
import CozyInput from "@/components/cozy_input";
import {createNewUser} from "@/lib/appwrite/dbUser";


const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('681cc5b8000a49689753')
    .setPlatform('com.rubberduck.cozyhome');


const account = new Account(client);


export default function Auth() {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [loggedInUser, setLoggedInUser] = useState<Models.User<Models.Preferences> | null>(null);
    const [password, setPassword] = useState('');
    const [username, setName] = useState('');

    
    async function login(name: string, password: string) {
      try {
        await account.createSession(name, password);
        setLoggedInUser(await account.get());
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Login fehlgeschlagen:", error);
      }
    }

  
    async function register(password: string, username: string) {
  try {
    await createNewUser({password, username});
    // Nach erfolgreicher Registrierung automatisch einloggen
    console.log("Registrierung erfolgreich");
  } catch (error) {
    console.error("Registrierung fehlgeschlagen:", error);
  }
}

  
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <CozyInput placeholder='Username'
                 placeholderTextColor={"black"}
                 value={username}
                 onChangeText={(text) => setName(text)}
      />
        <CozyInput placeholder='Passwort'
                 placeholderTextColor={"black"}
                 value={password}
                 onChangeText={(text) => setPassword(text)}
      />
        <Button
            title='Login'
            onPress={async () => {
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
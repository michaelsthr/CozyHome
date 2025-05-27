import React, { useState } from 'react';
import { Client, Account, ID, Models } from 'react-native-appwrite';   
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Redirect } from "expo-router";


const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('681cc5b8000a49689753')
    .setPlatform('com.rubberduck.cozyhome');


const account = new Account(client);


export default function Auth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState<Models.User<Models.Preferences> | null>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    
    async function login(email: string, password: string) {
      try {
        await account.createEmailPasswordSession(email, password);
        setLoggedInUser(await account.get());
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Login failed:", error);
      }
    }
  
    async function register(email: string, password: string, name: string) {
      await account.create(ID.unique(), email, password, name);
      await login(email, password);
    }

    if (isAuthenticated) {
      return <Redirect href="/(tabs)/calendar" />;
    }
  
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          placeholder="Name (for registration)"
          value={name}
          onChangeText={setName}
        />
        <TouchableOpacity onPress={() => login(email, password)}>
          <Text>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => register(email, password, name)}>
          <Text>Register</Text>
        </TouchableOpacity>
        {loggedInUser && <Text>Logged in as: {loggedInUser.name}</Text>}
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
import { useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Client, Databases, ID, Account } from "react-native-appwrite";

const client: Client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('681cc5b8000a49689753')
  .setPlatform('com.rubberduck.cozyhome');

const account = new Account(client);

// The followingtwo lines are only needed until the login works correctely
// it can be removed after the login works
account.deleteSessions();
account.createEmailPasswordSession("admin@diewg.com", "test-admin");
 

const databases: Databases = new Databases(client);

export default function Todo() {
const newToDo = () => {
  console.log("newToDo"); 
  databases.createDocument(
    '681cc676001b5505b333',
    '681cc690001e33dabf95',
  
    ID.unique(),
    // the follogwing blog hard codes values for the new todo
    {
      name: 'Test',
      date: new Date().toISOString(),
      done: false,
    },
    ['read("any")', 'write("any")'],
  ).then((response) => {
    console.log(response);
  }).catch((error) => {
    console.log(error);
  }
  );
}

  return (
    <View style={styles.container}>
      <Text>todo</Text>
      <Button title="Neues ToDo" onPress={newToDo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});


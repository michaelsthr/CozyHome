import {getDatabases } from './initializer'; //für db
import { Databases, Models, Query } from 'react-native-appwrite';
import * as Crypto from 'expo-crypto';


const databases = getDatabases();
const databaseId = '681cc676001b5505b333';
const userCollectionId = '685a80c70031828d1b20';


export interface User extends Models.Document{
    username: string;
    password: string;
    groupID: string;
}

export const createNewUser = async function (username: string, password: string): Promise<Models.Document> {
  try {
    // Prüfen, ob Benutzername bereits existiert
    const existingUsers = await databases.listDocuments(databaseId, userCollectionId, [
      Query.equal("username", username),
    ]);

    if (existingUsers.total > 0) {
      throw new Error("Benutzername existiert bereits.");
    }
    // Passwort hashen
    const hashedPassword = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );
    // Benutzer mit gehashtem Passwort anlegen
    return await databases.createDocument(databaseId, userCollectionId, 'unique()', {
      username: username,
      password: hashedPassword,
      groupID: "",
    });
  } catch (error) {
    console.error("Fehler beim Erstellen des Benutzers:", error);
    throw error;
  }
};

export const checkUserValid = async function (username: string): Promise<Models.Document | null> {
  try {
    const response = await databases.listDocuments(databaseId, userCollectionId, [
      Query.equal("username", username),
    ]);

    if (response.total > 0) {
      return response.documents[0];
    }

    return null; // Kein Benutzer gefunden
  } catch (error) {
    console.error("Fehler beim Benutzercheck:", error);
    return null;
  }
};


export async function updateUser(user: User, newGroupID: string) {
  try {
    const updatedUser = await databases.updateDocument(
      databaseId,
      userCollectionId,
      user.$id,
      {
        groupID: newGroupID,
      }
    );

    alert("Benutzergruppe erfolgreich aktualisiert.");
    return updatedUser;
  } catch (error) {
    console.error('Fehler beim Aktualisieren der Benutzergruppe:', error);
    throw error;
  }
}




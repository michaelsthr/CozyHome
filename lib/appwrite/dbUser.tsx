import {getDatabases } from './initializer'; //für db
import { Databases, Models, Query } from 'react-native-appwrite';
import bcrypt from "bcryptjs";


const databases = getDatabases();
const databaseId = '681cc676001b5505b333';
const userCollectionId = '685a80c70031828d1b20';


export interface User {
    username: string;
    password: string;
}

export const createNewUser = async function (userInfo: User): Promise<Models.Document> {
  try {
    // Prüfen, ob Benutzername bereits existiert
    const existingUsers = await databases.listDocuments(databaseId, userCollectionId, [
      Query.equal("username", userInfo.username),
    ]);

    if (existingUsers.total > 0) {
      throw new Error("Benutzername existiert bereits.");
    }

    // Passwort hashen
    const hashedPassword = await bcrypt.hash(userInfo.password, 10);

    // Benutzer mit gehashtem Passwort anlegen
    return await databases.createDocument(databaseId, userCollectionId, 'unique()', {
      username: userInfo.username,
      password: hashedPassword,
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


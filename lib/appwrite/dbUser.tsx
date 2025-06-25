import {getDatabases } from './initializer'; //für db
import { Databases, Models, Query } from 'react-native-appwrite';


const databases = getDatabases();
const databaseId = '681cc676001b5505b333';
const userCollectionId = '685a80c70031828d1b20';


interface User {
    username: string;
    password: string;
}

export const createNewUser = async function(userInfo: User): Promise<Models.Document> {
    try {
        const existingUsers = await databases.listDocuments(databaseId, userCollectionId, [
            Query.equal("username", userInfo.username),
            Query.equal("password", userInfo.password)
        ]);

        if (existingUsers.total > 0) {
            throw new Error("Benutzername und Passwort-Kombination existiert bereits.");
        }

        return await databases.createDocument(databaseId, userCollectionId, 'unique()', userInfo);
    } catch (error) {
        console.error("Error creating document:", error);
        throw error;
    }
}


import {getDatabases } from './initializer'; //für db
import { Databases, Models, Query } from 'react-native-appwrite';


const databases = getDatabases();
const databaseId = '681cc676001b5505b333';
const collectionId = '681cc690001e33dabf95';

const getTodos = async function(): Promise<Models.DocumentList<any>> {
    try {
        const result = await databases.listDocuments(databaseId, collectionId);
        return result;
    } catch (error) {
        console.error("Error fetching documents:", error);
        throw error;
    }
}

const addTodo = async function(todo: any): Promise<Models.Document> {
    try {
        const result = await databases.createDocument(databaseId, collectionId, 'unique()', todo);
        return result;
    } catch (error) {
        console.error("Error creating document:", error);
        throw error;
    }
}

const updateTodo = async function(todo: any): Promise<Models.Document> {
    try {
        const result = await databases.updateDocument(databaseId, collectionId, todo.$id, todo);
        return result;
    } catch (error) {
        console.error("Error updating document:", error);
        throw error;
    }
}

export { getTodos, addTodo, updateTodo };
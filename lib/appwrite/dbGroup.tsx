import {getDatabases } from './initializer'; //für db
import { Databases, Models, Query } from 'react-native-appwrite';


const databases = getDatabases();
const databaseId = '681cc676001b5505b333';
const collectionId = '68419b58000486b51ac9';

const getGroups = async function(): Promise<Models.DocumentList<any>> {
    try {
        const result = await databases.listDocuments(databaseId, collectionId);
        return result;
    } catch (error) {
        console.error("Error fetching documents:", error);
        throw error;
    }
}

const addGroup = async function(group: any): Promise<Models.Document> {
    try {
        const result = await databases.createDocument(databaseId, collectionId, 'unique()', group);
        return result;
    } catch (error) {
        console.error("Error creating document:", error);
        throw error;
    }
}

const getGroupById = async function getGroupById(groupId: string): Promise<Models.Document> {
  try {
    const response = await databases.getDocument(databaseId, collectionId, groupId);
    return response;
  } catch (error) {
    console.error("Error fetching group by ID:", error);
    throw error;
  }
}


export { getGroups, addGroup, getGroupById };
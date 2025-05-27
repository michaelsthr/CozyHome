import {getDatabases } from './initializer'; //für db
import { Databases, Models, Query } from 'react-native-appwrite';


const databases = getDatabases();
const databaseId = '681cc676001b5505b333';
const collectionId = '682c2e7c0000a5188c36';

const getKalender = async function(): Promise<Models.DocumentList<any>> {
    try {
        const result = await databases.listDocuments(databaseId, collectionId);
        return result;
    } catch (error) {
        console.error("Error fetching documents:", error);
        throw error;
    }
}
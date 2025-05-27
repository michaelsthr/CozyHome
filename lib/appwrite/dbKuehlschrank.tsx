import {getDatabases } from './initializer'; //für db
import { Databases, Models, Query } from 'react-native-appwrite';


const databases = getDatabases();
const databaseId = '681cc676001b5505b333';
const collectionId = '682c2e7c0000a5188c36';

const getKuehlschrankInhalt = async function(): Promise<Models.DocumentList<any>> {
    try {
        const result = await databases.listDocuments(databaseId, collectionId);
        return result;
    } catch (error) {
        console.error("Error fetching documents:", error);
        throw error;
    }
}

const setKuehlschrankInhalt = async function(kuehlschrankInhalt: any): Promise<Models.Document> {
    try {
        const result = await databases.createDocument(databaseId, collectionId, 'unique()', kuehlschrankInhalt);
        return result;
    } catch (error) {
        console.error("Error creating document:", error);
        throw error;
    }
}

const updateKuehlschrankInhalt = async function(kuehlschrankInhalt: any): Promise<Models.Document> {
    try {
        const result = await databases.updateDocument(databaseId, collectionId, kuehlschrankInhalt.$id, kuehlschrankInhalt);
        return result;
    } catch (error) {
        console.error("Error updating document:", error);
        throw error;
    }
}

const deleteKuehlschrankInhalt = async function(kuehlschrankInhalt: any): Promise<void> {
    try {
        await databases.deleteDocument(databaseId, collectionId, kuehlschrankInhalt.$id);
        return;
    } catch (error) {
        console.error("Error deleting document:", error);
        throw error;
    }
}

export { getKuehlschrankInhalt, setKuehlschrankInhalt, updateKuehlschrankInhalt, deleteKuehlschrankInhalt };
import { Models } from 'react-native-appwrite';
import { FridgeCategoryType } from '../constants/categories';
import { getDatabases } from './initializer'; //für db

// Interface for creating a new item (no document properties required)
export interface NewKuehlschrankItem {
  name: string;
  anzahl: number;
  kategorie?: FridgeCategoryType;
  mhd?: string; // ISO date string for expiration date
}

export type KuehlschrankItem = Models.Document & NewKuehlschrankItem;

const databases = getDatabases();
const databaseId = '681cc676001b5505b333';
const collectionId = '682c2e7c0000a5188c36';

const getKuehlschrankInhalt = async function(): Promise<Models.DocumentList<KuehlschrankItem>> {
    try {
        const result = await databases.listDocuments(databaseId, collectionId);
        return result as Models.DocumentList<KuehlschrankItem>;
    } catch (error) {
        console.error("Error fetching documents:", error);
        throw error;
    }
}

const setKuehlschrankInhalt = async function(kuehlschrankInhalt: NewKuehlschrankItem): Promise<Models.Document> {
    try {
        const result = await databases.createDocument(databaseId, collectionId, 'unique()', kuehlschrankInhalt);
        return result;
    } catch (error) {
        console.error("Error creating document:", error);
        throw error;
    }
}

const updateKuehlschrankInhalt = async function(kuehlschrankInhalt: KuehlschrankItem): Promise<Models.Document> {
    try {
        // Strip out any system properties that shouldn't be sent to Appwrite
        const { $id, $createdAt, $updatedAt, $permissions, $databaseId, $collectionId, ...updateData } = kuehlschrankInhalt;
        
        // Only send the actual data fields to avoid "unknown attribute" errors
        const result = await databases.updateDocument(databaseId, collectionId, $id, updateData);
        return result;
    } catch (error) {
        console.error("Error updating document:", error);
        throw error;
    }
}

const deleteKuehlschrankInhalt = async function(kuehlschrankInhalt: { $id: string }): Promise<void> {
    try {
        await databases.deleteDocument(databaseId, collectionId, kuehlschrankInhalt.$id);
        return;
    } catch (error) {
        console.error("Error deleting document:", error);
        throw error;
    }
}

export { deleteKuehlschrankInhalt, getKuehlschrankInhalt, setKuehlschrankInhalt, updateKuehlschrankInhalt };

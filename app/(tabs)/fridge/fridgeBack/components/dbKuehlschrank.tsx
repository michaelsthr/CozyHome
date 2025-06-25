import { Models } from 'react-native-appwrite';
import { getDatabases } from '../../../../../lib/appwrite/initializer'; //für db
import { FridgeCategoryType } from '../../../../../lib/constants/categories';

export interface NewKuehlschrankItem {
  name: string;
  anzahl: number;
  kategorie?: FridgeCategoryType;
  mhd?: string;
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
        const { $id, $createdAt, $updatedAt, $permissions, $databaseId, $collectionId, ...updateData } = kuehlschrankInhalt;
        
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


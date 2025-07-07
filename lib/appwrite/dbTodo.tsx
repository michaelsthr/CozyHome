import { Models, Query } from 'react-native-appwrite';
import { getDatabases } from './initializer'; //für db
import { useSession, getGlobalGroup } from '../context/SessionContext';

const databases = getDatabases();
const databaseId = '681cc676001b5505b333';
const collectionId = '681cc690001e33dabf95';

const getTodos = async function (): Promise<Models.DocumentList<any>> {
    try {
        const group = getGlobalGroup();
        if (group === null) {
            throw new Error("Group is not set.");
        }

        const result = await databases.listDocuments(
            databaseId,
            collectionId,
            [Query.equal("group", group.$id)]);
        return result;
    } catch (error) {
        console.error("Error fetching documents:", error);
        throw error;
    }
}

const addTodo = async function (todo: any): Promise<Models.Document> {
    try {
        const group = getGlobalGroup()
        if (!group || !group.$id) throw new Error("Group is not set.");

        const todoWithGroup = {
            ...todo,
            group: group.$id,
        }

        const result = await databases.createDocument(databaseId, collectionId, 'unique()', todoWithGroup);
        return result;
    } catch (error) {
        console.error("Error creating document:", error);
        throw error;
    }
}

const updateTodo = async function (todo: any): Promise<Models.Document> {
    try {
        const result = await databases.updateDocument(databaseId, collectionId, todo.$id, todo);
        return result;
    } catch (error) {
        console.error("Error updating document:", error);
        throw error;
    }
}

const deleteTodo = async function (id: string): Promise<void> {
    try {
        await databases.deleteDocument(databaseId, collectionId, id);
    } catch (error) {
        console.error("Error deleting todo:", error);
        throw error;
    }
};

export { addTodo, deleteTodo, getTodos, updateTodo };

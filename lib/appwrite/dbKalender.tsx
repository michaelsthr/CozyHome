import { Models } from "react-native-appwrite";
import { getDatabases } from "./initializer"; //für db

const databases = getDatabases();
const databaseId = "681cc676001b5505b333";
const calenderCollectionId = "682c2fbe0023f56307a2";
const categoryCollectionId = "682c34aa0009f5819539";

export const getCalender = async function (): Promise<Models.DocumentList<any>> {
    try {
        var test = await databases.listDocuments(databaseId, calenderCollectionId);
        return test;
    } catch (error) {
        console.error("Error fetching documents:", error);
        throw error;
    }
};

export const getCategory = async function (): Promise<Models.DocumentList<any>> {
    try {
        const result = await databases.listDocuments(databaseId, categoryCollectionId);
        return result;
    } catch (error) {
        console.error("Error fetching documents:", error);
        throw error;
    }
};

export interface Event {
    name: string;
    startDate: string;
    endDate: string;
    repeat: boolean;
    wholeday: boolean;
    creator: string;
    description: string;
    category: string;
}

export const createNewEvent = async function (eventInfo: Event): Promise<Models.Document> {
    try {
        const result = await databases.createDocument(
            databaseId,
            calenderCollectionId,
            "unique()",
            eventInfo
        );
        return result;
    } catch (error) {
        console.error("Error creating document:", error);
        throw error;
    }
};

export const updateEvent = async function (
    documentId: string,
    eventInfo: Partial<Event>
): Promise<Models.Document> {
    try {
        const result = await databases.updateDocument(
            databaseId,
            calenderCollectionId,
            documentId,
            eventInfo
        );
        return result;
    } catch (error) {
        console.error("Error updating document:", error);
        throw error;
    }
};

export const getEvent = async function (documentId: string): Promise<Models.Document> {
    try {
        const result = await databases.getDocument(databaseId, calenderCollectionId, documentId);
        return result;
    } catch (error) {
        console.error("Error fetching document:", error);
        throw error;
    }
};

export interface Category {
    name: string;
    color: string;
}

export const createNewCategory = async function (categoryInfo: Category): Promise<Models.Document> {
    try {
        const result = await databases.createDocument(
            databaseId,
            categoryCollectionId,
            "unique()",
            categoryInfo
        );
        return result;
    } catch (error) {
        console.error("Error creating document:", error);
        throw error;
    }
};

export const updateCategory = async function (
    categoryId: string,
    categoryInfo: Partial<Category>
): Promise<Models.Document> {
    try {
        const result = await databases.updateDocument(
            databaseId,
            categoryCollectionId,
            categoryId,
            categoryInfo
        );
        return result;
    } catch (error) {
        console.error("Error updating category:", error);
        throw error;
    }
};

export const deleteEvent = async function (documentId: string): Promise<void> {
    try {
        await databases.deleteDocument(databaseId, calenderCollectionId, documentId);
        return;
    } catch (error) {
        console.error("Error deleting document:", error);
        throw error;
    }
};

export const deleteCategory = async function (categoryInfo: any): Promise<void> {
    try {
        await databases.deleteDocument(databaseId, categoryCollectionId, categoryInfo.$id);
        return;
    } catch (error) {
        console.error("Error deleting document:", error);
        throw error;
    }
};

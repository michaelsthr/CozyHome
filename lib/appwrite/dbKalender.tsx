import { Category, Event } from "@/lib/types/calendar";
import { Models, Query } from "react-native-appwrite";
import { getGlobalGroup } from '../context/SessionContext';
import { getDatabases } from "./initializer"; //für db


const databases = getDatabases();
const databaseId = "681cc676001b5505b333";
const calenderCollectionId = "682c2fbe0023f56307a2";
const categoryCollectionId = "682c34aa0009f5819539";

export const getCalender = async function (): Promise<Models.DocumentList<any>> {
    try {
        const group = getGlobalGroup();
        if (group === null) {
            throw new Error("Group is not set.");
        }

        var test = await databases.listDocuments(databaseId, calenderCollectionId, [Query.equal("group", group.$id)]);
        return test;
    } catch (error) {
        console.error("Error fetching getCalender:", error);
        throw error;
    }
};

export const getAllCategory = async function (): Promise<Models.DocumentList<any>> {
    try {
        const group = getGlobalGroup();
        if (group === null) {
            throw new Error("Group is not set.");
        }
        const result = await databases.listDocuments(databaseId, categoryCollectionId, [Query.equal("group", group.$id)]);
        return result;
    } catch (error) {
        console.error("Error fetching getCategory:", error);
        throw error;
    }
};

export const getCategory = async function (documentId: string): Promise<Models.Document> {
    try {
        const result = await databases.getDocument(databaseId, categoryCollectionId, documentId);
        return result;
    } catch (error) {
        console.error("Error fetching getCategory:", error);
        throw error;
    }
};

export const createNewEvent = async function (eventInfo: Event): Promise<Models.Document> {
    try {
        const group = getGlobalGroup();
        if (group === null) {
            throw new Error("Group is not set.");
        }

        const eventWithGroup = {
            ...eventInfo,
            group: group.$id
        }

        const result = await databases.createDocument(
            databaseId,
            calenderCollectionId,
            "unique()",
            eventWithGroup
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

export const createNewCategory = async function (categoryInfo: Category): Promise<Models.Document | any> {
    try {
        const group = getGlobalGroup();
        if (group === null) {
            throw new Error("Group is not set.");
        }

        const CategoryWithGroup = {
            ...categoryInfo,
            group: group.$id
        }

        const result = await databases.createDocument(
            databaseId,
            categoryCollectionId,
            "unique()",
            CategoryWithGroup,
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

export const deleteCategory = async function (documentId: string): Promise<void> {
    try {
        await databases.deleteDocument(databaseId, categoryCollectionId, documentId);
        return;
    } catch (error) {
        console.error("Error deleting document:", error);
        throw error;
    }
};
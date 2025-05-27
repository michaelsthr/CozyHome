import {getDatabases } from './initializer'; //für db
import { Databases, Models, Query } from 'react-native-appwrite';


const databases = getDatabases();
const databaseId = '681cc676001b5505b333';
const calenderCollectionId = '682c2fbe0023f56307a2';
const categoryCollectionId = '682c34aa0009f5819539';

export const getCalender = async function(): Promise<Models.DocumentList<any>> {
    try {
        const result = await databases.listDocuments(databaseId, calenderCollectionId);
        return result;
    } catch (error) {
        console.error("Error fetching documents:", error);
        throw error;
    }
}

export const getCategory = async function(): Promise<Models.DocumentList<any>> {
    try {
        const result = await databases.listDocuments(databaseId, categoryCollectionId);
        return result;
    } catch (error) {
        console.error("Error fetching documents:", error);
        throw error;
    }
}

interface Event {
  name: string;
  startDate: string;
  endDate: string;
  repeat: boolean;
  wholeday: boolean;
  creator: string;
  description: string;
  category: string;
}

export const createNewEvent = async function(eventInfo: Event): Promise<Models.Document> {
    try {
        const result = await databases.createDocument(databaseId, calenderCollectionId, 'unique()', eventInfo);
        return result;
    } catch (error) {
        console.error("Error creating document:", error);
        throw error;
    }
}

interface Category {
    name: string,
    color: string
}

export const createNewCategory = async function(categoryInfo: Category): Promise<Models.Document> {
    try {
        const result = await databases.createDocument(databaseId, categoryCollectionId, 'unique()', categoryInfo);
        return result;
    } catch (error) {
        console.error("Error creating document:", error);
        throw error;
    }
}

export const deleteEvent = async function(documentId: string): Promise<void> {
    try {
        await databases.deleteDocument(databaseId, calenderCollectionId, documentId);
        return;
    } catch (error) {
        console.error("Error deleting document:", error);
        throw error;
    }
}

const deleteCategory = async function(categoryInfo: any): Promise<void> {
    try {
        await databases.deleteDocument(databaseId, categoryCollectionId, categoryInfo.$id);
        return;
    } catch (error) {
        console.error("Error deleting document:", error);
        throw error;
    }
}
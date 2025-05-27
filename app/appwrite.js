import { Client, Account, Databases } from 'react-native-appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('681cc5b8000a49689753')
  .setPlatform('com.rubberduck.cozyhome');

const account = new Account(client);
export const databases = new Databases(client);

export const listDocuments = async (databaseId, collectionId) => {
  try {
    const response = await databases.listDocuments(databaseId, collectionId);
    return response.documents;
  } catch (error) {
    console.error('Error listing documents:', error);
    throw error;
  }
};   
export const createDocument = async (databaseId, collectionId, documentId, data) => {
  try {
    const response = await databases.createDocument(databaseId, collectionId, documentId, data);
    return response;
  } catch (error) {
    console.error('Error creating document:', error);
    throw error;
  }
}

export const updateDocument = async (databaseId, collectionId, documentId, data) => {
  try {
    const response = await databases.updateDocument(databaseId, collectionId, documentId, data);
    return response;
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
}

export default { client, account, databases };
// zusätzlich:
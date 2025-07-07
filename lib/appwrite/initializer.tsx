import { Client, Databases } from "react-native-appwrite";

let _client: Client | null = null;

function getClient(): Client {
    if (!_client) {
        _client = new Client()
            .setEndpoint('https://fra.cloud.appwrite.io/v1')
            .setProject('681cc5b8000a49689753');
    }
    return _client;
}

let _databases: Databases | null = null;

function getDatabases(): Databases {
    if (!_databases) {
        _databases = new Databases(getClient());
    }
    return _databases;
}

export { getClient, getDatabases };


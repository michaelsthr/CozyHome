import React, {
    createContext,
    ReactNode,
    useContext,
    useState
} from 'react';

let currentGroup: Group | null = null;

export const setGlobalGroup = (group: Group | null) => {
    currentGroup = group;
};

export const getGlobalGroup = (): Group | null => {
    return currentGroup;
};

// Typen definieren
export interface User {
    username: string;
    password: string; // hashed
    groupID: string;
    userId: string;
}

export interface Group {
    $id: string;
    name: string;
    groupKey: string;
    type: string;
}
    

// Struktur des Kontexts
interface SessionContextType {
    user: User | null;
    group: Group | null;
    setUser: (user: User | null) => void;
    setGroup: (group: Group | null) => void;
}

// Kontext erstellen
const SessionContext = createContext<SessionContextType | undefined>(undefined);

// Provider-Komponente
export const SessionProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [group, _setGroup] = useState<Group | null>(null);

    const setGroup = (group: Group | null) => {
    _setGroup(group);
    setGlobalGroup(group); 
}

    return (
        <SessionContext.Provider value={{ user, group, setUser, setGroup }}>
            {children}
        </SessionContext.Provider>
    );
};

// Hook zum Zugriff auf den Kontext
export const useSession = (): SessionContextType => {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error('useSession muss innerhalb des SessionProviders verwendet werden');
    }
    return context;
};

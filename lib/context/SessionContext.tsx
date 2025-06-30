import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect
} from 'react';

// Typen definieren
export interface User {
  username: string;
  password: string; // hashed
  groupID: string;
}

export interface Group {
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
  const [group, setGroup] = useState<Group | null>(null);

  // Optional: Session laden/speichern (AsyncStorage etc.)

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
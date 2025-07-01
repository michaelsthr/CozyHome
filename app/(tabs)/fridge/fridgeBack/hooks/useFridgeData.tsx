import { useState, useEffect } from 'react';
import { Models } from 'appwrite';
import { getKuehlschrankInhalt, updateKuehlschrankInhalt, setKuehlschrankInhalt, deleteKuehlschrankInhalt } from "../../../../../lib/appwrite/dbKuehlschrank"; // Adjust the import path as necessary
import { KuehlschrankItem, NewKuehlschrankItem } from '../types/fridge';

export const useFridgeData = () => {
  const [contents, setContents] = useState<Models.DocumentList<any> | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const inhalt = await getKuehlschrankInhalt();
      setContents(inhalt);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (item: NewKuehlschrankItem) => {
    await setKuehlschrankInhalt(item as any);
    await fetchData();
  };

  const updateItem = async (item: KuehlschrankItem) => {
    await updateKuehlschrankInhalt(item as any);
    await fetchData();
  };

  const deleteItem = async (item: KuehlschrankItem) => {
    await deleteKuehlschrankInhalt(item);
    await fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    contents,
    loading,
    addItem,
    updateItem,
    deleteItem,
    refetch: fetchData
  };
};
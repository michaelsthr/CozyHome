import { Models } from 'appwrite';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { deleteKuehlschrankInhalt, getKuehlschrankInhalt, setKuehlschrankInhalt, updateKuehlschrankInhalt } from "../../lib/appwrite/dbKuehlschrank"; //für db

export default function Fridge() {
  const [contents, setContents] = useState<Models.DocumentList<any> | null>(null);
  const [loading, setLoading] = useState(true);
  const [itemName, setItemName] = useState('');
  const [itemAmount, setItemAmount] = useState('1');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingItem, setEditingItem] = useState<{$id: string, name: string, anzahl: number} | null>(null);

  useEffect(() => {
    async function fetchContents() {
      try {
        const inhalt = await getKuehlschrankInhalt();
        console.log("Kühlschrankinhalt:", inhalt);
        setContents(inhalt);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching refrigerator contents:", err);
        setLoading(false);
      }
    }
    
    fetchContents();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading refrigerator contents...</Text>
      </View>
    );
  }  const handleAddItem = async () => {
    if (!itemName.trim()) {
      alert("Bitte geben Sie einen Namen ein");
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      if (editingItem) {
        // Update existing item
        const updatedItem = {
          $id: editingItem.$id,
          name: itemName,
          anzahl: parseInt(itemAmount) || 1
        };
        
        // Update in database
        await updateKuehlschrankInhalt(updatedItem);
        setEditingItem(null);
      } else {
        // Create new item object
        const newItem = {
          name: itemName,
          anzahl: parseInt(itemAmount) || 1
        };
        
        // Add to database
        await setKuehlschrankInhalt(newItem);
      }
      
      // Clear inputs
      setItemName('');
      setItemAmount('1');
      
      // Refresh the list
      const updatedContents = await getKuehlschrankInhalt();
      setContents(updatedContents);
    } catch (error) {
      console.error("Error adding/updating item:", error);
      alert("Fehler beim Speichern des Artikels");
    } finally {
      setIsSubmitting(false);
    }
  };
    const handleEditItem = (item: any) => {
    setEditingItem(item);
    setItemName(item.name);
    setItemAmount(item.anzahl.toString());
  };
  
  const cancelEdit = () => {
    setEditingItem(null);
    setItemName('');
    setItemAmount('1');
  };
  
  const handleDeleteItem = async (item: any) => {
    try {
      // Confirm deletion with the user
      if (confirm("Möchten Sie diesen Artikel wirklich löschen?")) {
        await deleteKuehlschrankInhalt(item);
        
        // Refresh the list after deletion
        const updatedContents = await getKuehlschrankInhalt();
        setContents(updatedContents);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Fehler beim Löschen des Artikels");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kühlschrankinhalt</Text>
      
      {/* Input form for adding new items */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Artikelname"
          value={itemName}
          onChangeText={setItemName}
        />
        <TextInput
          style={styles.amountInput}
          placeholder="Anzahl"
          value={itemAmount}
          onChangeText={setItemAmount}
          keyboardType="numeric"
        />        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.addButton, isSubmitting && styles.disabledButton]} 
            onPress={handleAddItem} 
            disabled={isSubmitting}
          >
            <Text style={styles.buttonText}>
              {isSubmitting 
                ? "Speichern..." 
                : editingItem 
                  ? "Aktualisieren" 
                  : "Hinzufügen"
              }
            </Text>
          </TouchableOpacity>
          
          {editingItem && (
            <TouchableOpacity 
              style={styles.cancelButton} 
              onPress={cancelEdit}
            >
              <Text style={styles.buttonText}>Abbrechen</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      {contents && contents.documents && contents.documents.length > 0 ? (        <FlatList
          data={contents.documents}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (            <View style={styles.itemContainer}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text>Anzahl: {item.anzahl}</Text>
              </View>
              <View style={styles.itemActions}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => handleEditItem(item)}
                >
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteItem(item)}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          style={styles.list}
        />
      ) : (
        <Text>Keine Inhalte gefunden</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 16,
    width: '100%'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    flex: 3,
    marginRight: 8
  },
  amountInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    flex: 1,
    marginRight: 8
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 2
  },
  addButton: {
    backgroundColor: '#2196F3',
    borderRadius: 4,
    padding: 10,
    flex: 1
  },
  cancelButton: {
    backgroundColor: '#f44336',
    borderRadius: 4,
    padding: 10,
    marginLeft: 8,
    flex: 1
  },
  editButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 4,
    padding: 6,
    marginLeft: 8
  },
  deleteButton: {
    backgroundColor: '#f44336',
    borderRadius: 4,
    padding: 6,
    marginLeft: 8
  },
  itemActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  disabledButton: {
    backgroundColor: '#cccccc'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  itemContainer: {
    backgroundColor: "#f0f0f0",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  itemInfo: {
    flex: 1
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  errorText: {
    color: 'red',
    fontSize: 16
  },
  list: {
    width: '100%'
  }
});

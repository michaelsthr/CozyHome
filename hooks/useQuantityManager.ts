import { useState } from "react";
import { Alert } from "react-native";
import { deleteKuehlschrankInhalt, KuehlschrankItem, updateKuehlschrankInhalt } from "../lib/appwrite/dbKuehlschrank";

export function useQuantityManager() {
    const [isUpdating, setIsUpdating] = useState(false);
    const [editingItemId, setEditingItemId] = useState<string | null>(null);
    const [editingQuantity, setEditingQuantity] = useState<string>("");

    const handleQuantityChange = async (
        item: KuehlschrankItem,
        change: number,
        setItems: React.Dispatch<React.SetStateAction<KuehlschrankItem[]>>,
        items: KuehlschrankItem[]
    ) => {
        if (isUpdating) return;

        const newQuantity = item.anzahl + change;

        if (newQuantity <= 0) {
            Alert.alert(
                "Remove Item",
                `Are you sure you want to remove ${item.name}?`,
                [
                    { text: "Cancel", style: "cancel" },
                    {
                        text: "Remove",
                        onPress: async () => {
                            setIsUpdating(true);
                            try {
                                await deleteKuehlschrankInhalt(item);
                                const updatedItems = items.filter((i) => i.$id !== item.$id);
                                setItems(updatedItems);
                            } catch (error) {
                                console.error("Error deleting item:", error);
                            } finally {
                                setIsUpdating(false);
                            }
                        },
                        style: "destructive",
                    },
                ]
            );
            return;
        }

        setIsUpdating(true);
        try {
            const updatedItem = { ...item, anzahl: newQuantity };
            await updateKuehlschrankInhalt(updatedItem);

            const updatedItems = items.map((i) =>
                i.$id === item.$id ? updatedItem : i
            );
            setItems(updatedItems);
        } catch (error) {
            console.error("Error updating quantity:", error);
        } finally {
            setIsUpdating(false);
        }
    };

    const startEditing = (item: KuehlschrankItem) => {
        setEditingItemId(item.$id);
        setEditingQuantity(item.anzahl.toString());
    };

    const cancelEditing = () => {
        setEditingItemId(null);
        setEditingQuantity("");
    };

    const submitEditing = async (
        item: KuehlschrankItem,
        setItems: React.Dispatch<React.SetStateAction<KuehlschrankItem[]>>,
        items: KuehlschrankItem[]
    ) => {
        const newQuantity = parseInt(editingQuantity, 10);
        if (isNaN(newQuantity) || newQuantity < 0) {
            cancelEditing();
            return;
        }

        if (newQuantity === 0) {
            cancelEditing();
            handleQuantityChange(item, -item.anzahl, setItems, items); // Trigger delete confirmation
            return;
        }

        setIsUpdating(true);
        try {
            const updatedItem = { ...item, anzahl: newQuantity };
            await updateKuehlschrankInhalt(updatedItem);
            const updatedItems = items.map((i) => (i.$id === item.$id ? updatedItem : i));
            setItems(updatedItems);
        } catch (error) {
            console.error("Error updating quantity:", error);
        } finally {
            setIsUpdating(false);
            cancelEditing();
        }
    };

    return {
        handleQuantityChange,
        isUpdating,
        editingItemId,
        editingQuantity,
        setEditingQuantity,
        startEditing,
        cancelEditing,
        submitEditing,
    };
}

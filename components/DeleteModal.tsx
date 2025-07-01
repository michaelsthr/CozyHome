import React from "react";
import { Button, Modal, Text, View } from "react-native";

interface DeleteModalProps {
    visible: boolean;
    onClose: () => void;
    onDelete: () => Promise<void>;
    title: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ visible, onClose, onDelete, title }) => {
    return (
        <Modal visible={visible} animationType='fade' transparent={true} onRequestClose={onClose}>
            <View
                style={{
                    flex: 1,
                    justifyContent: "flex-end",
                    backgroundColor: "rgba(0,0,0,0.2)",
                }}>
                <View
                    style={{
                        backgroundColor: "white",
                        padding: 24,
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        marginBottom: 0,
                    }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 16 }}>
                        {title}
                    </Text>
                    <Button title='Cancel' onPress={onClose} />
                    <Button
                        title='Delete'
                        color='red'
                        onPress={async () => {
                            await onDelete();
                            onClose();
                        }}
                    />
                </View>
            </View>
        </Modal>
    );
};

export default DeleteModal;

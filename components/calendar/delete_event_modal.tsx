import { modalStyles } from "@/styles/modal_styles";
import React from "react";
import { Button, Modal as RNModal, View } from "react-native";

interface DeleteEventModalProps {
    visible: boolean;
    onClose: () => void;
    onDelete: () => void;
}

const DeleteEventModal: React.FC<DeleteEventModalProps> = ({ visible, onClose, onDelete }) => {
    return (
        <RNModal visible={visible} animationType='fade' transparent={true} onRequestClose={onClose}>
            <View style={modalStyles.bottomSheetContainer}>
                <View style={modalStyles.bottomSheetContent}>
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
        </RNModal>
    );
};

export default DeleteEventModal;
